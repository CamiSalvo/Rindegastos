const { Builder, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const LoginPage = require('../pages/loginPage');
const ExpensePage = require('../pages/expensePage');

describe('Conjunto de pruebas', () => {
  let driver;
  let loginPage;
  let expensePage;

  beforeAll(async () => {
    jest.setTimeout(60000); 
    driver = await new Builder().forBrowser(config.browser).build();
    loginPage = new LoginPage(driver);
    expensePage = new ExpensePage(driver);
  });

  afterAll(async () => {
    await driver.quit();
  });

  // Función para tomar screenshots
  const takeScreenshot = async (filename) => {
    const image = await driver.takeScreenshot();
    const screenshotPath = path.join(__dirname, '../screenshots', filename);
    fs.writeFileSync(screenshotPath, image, 'base64');
    console.log(`📸 Screenshot guardado en: ${screenshotPath}`);
  };

  test(
    'Iniciar sesion y crear un gasto correctamente',
    //Campos que se le pasan al LoginPage para rellenar la automatizacion
    async () => {
      try {
        
        console.log('Abriendo la página de login...');
        await loginPage.open();

        
        console.log('Ingresando correo...');
        await loginPage.enterEmail('example@example.cl');

        
        console.log('Esperando que el botón de login esté habilitado...');
        await driver.wait(until.elementLocated(loginPage.loginButtonEnabled), 10000);

        
        console.log('Haciendo clic en el botón de login...');
        await loginPage.clickLoginButton();

        
        console.log('Esperando que el campo de contraseña aparezca...');
        await driver.wait(until.elementLocated(loginPage.passwordInput), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(loginPage.passwordInput)), 10000);

       
        console.log('Ingresando contraseña...');
        await loginPage.enterPassword('password');

        
        console.log('Haciendo clic en el botón de login nuevamente...');
        await loginPage.submitLogin();

        console.log('Esperando que la URL cambie después del login...');
        await driver.wait(until.urlIs('https://app.rindegastos.com/employee/expenses'), 10000);

        console.log('Verificando URL actual...');
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toBe('https://app.rindegastos.com/employee/expenses');
        console.log('✅ Prueba de login exitosa.');

        console.log('Haciendo clic en el botón "Crear gasto"...');
        await expensePage.clickCreateExpenseButton();

        await takeScreenshot('before_continue_button.png');

        console.log('Haciendo clic en el botón "Continuar"...');
        await expensePage.clickContinueButton();

        console.log('Rellenando el campo "Indica el proveedor"...');
        await expensePage.enterMerchant('Proveedor de prueba2312321');


        console.log('Rellenando el campo "Ej: 1 000"...');
        await expensePage.enterAmount('1000');

        console.log('Seleccionando una categoría...');
        await expensePage.selectCategory('Transporte');
        console.log('✅ Prueba de selección de categoría exitosa.');

        console.log('Rellenando RUT del proveedor...');
        await expensePage.fillRUTProveedor('209769734');
        console.log('✅ Prueba de RUT exitosa.');

        console.log('Seleccionando tipo de documento...');
        await expensePage.selectDocumentType('Factura Electrónica Exenta');
        console.log('✅ Prueba de tipo de documento exitosa.');

        console.log('Rellenando número de documento...');
        await expensePage.enterDocumentNumber('123456');
        console.log('✅ Número de documento rellenado.');



        console.log('Rellenando comentario...');
        await expensePage.fillComment('Este es un gasto de prueba automatizado');
        console.log('✅ Comentario rellenado.');

        console.log('Guardando el gasto...');
        await expensePage.clickSaveExpenseButton();

        console.log('✅ Prueba de creación de gasto exitosa.');

      } catch (error) {
        console.error('❌ Error en la prueba:', error);

        // Tomar screenshot en caso de error
        await takeScreenshot(`error_${Date.now()}.png`);

        throw error;
      }
    },
    60000 
  );
});
