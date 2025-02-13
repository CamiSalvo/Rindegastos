const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    //IDs css y xpath de los elementos
    this.driver = driver;
    this.url = 'https://app.rindegastos.com'; 
    this.usernameInput = By.id('signin_username'); 
    this.passwordInput = By.id('signin_password'); 
    this.loginButtonDisabled = By.css('button.rindeButton-b[disabled]'); 
    this.loginButtonEnabled = By.css('button.rindeButton-b:not([disabled])'); 
  }

  //Metodo para seleccionar el username
  async open() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(this.usernameInput), 10000); 
  }

  //Metodo para ingresar username
  async enterEmail(email) {
    const emailField = await this.driver.findElement(this.usernameInput);
    await emailField.clear();
    await emailField.sendKeys(email);

    await this.driver.wait(until.elementLocated(this.loginButtonEnabled), 10000);
  }

  //Metodo para seleccionar boton de login
  async clickLoginButton() {
    const loginButton = await this.driver.findElement(this.loginButtonEnabled);
    await loginButton.click();
  }
  //Metodo para ingresar contraseña
  async enterPassword(password) {
    const passwordField = await this.driver.findElement(this.passwordInput);
    await passwordField.clear();
    await passwordField.sendKeys(password);
  }
//Metodo para hacer click en el boton del login
  async submitLogin() {
    const loginButton = await this.driver.findElement(this.loginButtonEnabled);
    await loginButton.click();
  }
}

module.exports = LoginPage;