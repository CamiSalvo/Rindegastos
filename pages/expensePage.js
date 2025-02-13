const { By, until } = require('selenium-webdriver');

class ExpensePage {
  constructor(driver) {
    //IDs css y xpath de los elementos 
    this.driver = driver;
    this.createExpenseButton = By.css('button.rindeButton-g.tiny.nM');
    this.continueButton = By.css('button.rindeButton-g.nM.mg-8-r.CE1001#createSingleButton');
    this.merchantInput = By.id('merchant');
    this.calendarButton = By.css('button.mat-icon-button');
    this.datePicker = By.css('.mat-calendar-body-cell');
    this.amountInput = By.id('amount');
    this.categoryDropdown = By.css('ng-select[formcontrolname="category"]');
    this.categoryOption = By.css('div.ng-option');
    this.rutInput = By.id('RUT Proveedor');
    this.documentTypeRadioButtons = {
      boletaElectronica: By.css('label[for="255828716Boleta Electrónica1"]'),
      facturaElectronicaAfecta: By.css('label[for="255828716Factura Electrónica Afecta1"]'),
      facturaElectronicaExenta: By.css('label[for="255828716Factura Electrónica Exenta1"]'),
      comprobante: By.css('label[for="255828716Comprobante1"]')
    };
    this.documentNumberInput = By.id('Número de Documento');
    this.commentTextarea = By.id('comment');
    this.saveExpenseButton = By.xpath("//button[.//span[normalize-space(text())='Guardar gasto']]")
  }
  //realiza scroll a medida que se rellenan los campos
  async scrollToElement(selector) {
    const element = await this.driver.wait(until.elementLocated(selector), 10000);
    await this.driver.executeScript(
      "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", 
      element
    );
    await this.driver.sleep(500);
    return element;
  }

  //metodo a clickear el boton de crear un gasto
  async clickCreateExpenseButton() {
    const createExpenseButton = await this.scrollToElement(this.createExpenseButton);
    await this.driver.wait(until.elementIsVisible(createExpenseButton), 10000);
    await createExpenseButton.click();
  }
//metodo para seleccionar continuar en la ventana emergente
  async clickContinueButton() {
    const continueButton = await this.scrollToElement(this.continueButton);
    await this.driver.wait(until.elementIsVisible(continueButton), 10000);
    await continueButton.click();
  }

  //Metodo para rellenar nombre de proveedor
  async enterMerchant(merchant) {
    const merchantField = await this.scrollToElement(this.merchantInput);
    await this.driver.wait(until.elementIsVisible(merchantField), 10000);
    await merchantField.clear();
    await merchantField.sendKeys(merchant);
  }

  //Metodo para abrir calendario para seleccionar la fecha
  async openCalendar() {
    const calendarButton = await this.scrollToElement(this.calendarButton);
    await this.driver.wait(until.elementIsVisible(calendarButton), 10000);
    await calendarButton.click();
    const datepicker = await this.driver.wait(until.elementLocated(By.css('mat-datepicker')), 10000);
    await this.driver.wait(until.elementIsVisible(datepicker), 10000);
  }

//metodo para selecionar la fecha
  async selectDate(date) {
    await this.driver.wait(until.elementsLocated(this.datePicker), 10000);
    const dates = await this.driver.findElements(this.datePicker);
    for (const day of dates) {
      const dayText = await day.getText();
      if (dayText === date) {
        await this.driver.executeScript(
          "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", 
          day
        );
        await day.click();
        break;
      }
    }
  }

  //metodo para seleccionar el total
  async enterAmount(amount) {
    const amountField = await this.scrollToElement(this.amountInput);
    await this.driver.wait(until.elementIsVisible(amountField), 10000);
    await amountField.clear();
    await amountField.sendKeys(amount);
  }

  //metodo para seleccionar la categoria
  async selectCategory(category) {
    const dropdown = await this.scrollToElement(this.categoryDropdown);
    await this.driver.wait(until.elementIsVisible(dropdown), 10000);
    await dropdown.click();
    await this.driver.wait(until.elementLocated(By.css('ng-dropdown-panel[role="listbox"]')), 10000);
    const categoryOptions = await this.driver.findElements(this.categoryOption);
    for (const option of categoryOptions) {
      const optionText = await option.getText();
      if (optionText === category) {
        await this.driver.executeScript(
          "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", 
          option
        );
        await option.click();
        break;
      }
    }
  }

  //metodo para ingresar rut de proveedor
  async fillRUTProveedor(rut) {
    const rutInputField = await this.scrollToElement(this.rutInput);
    await this.driver.wait(until.elementIsVisible(rutInputField), 10000);
    await rutInputField.clear();
    await rutInputField.sendKeys(rut);
  }

  //metodo para ingresar el tipo de documento
  async selectDocumentType(documentType) {
    const xpathMap = {
      'Boleta Electrónica': "//label[normalize-space(.)='Boleta Electrónica']",
      'Factura Electrónica Afecta': "//label[normalize-space(.)='Factura Electrónica Afecta']",
      'Factura Electrónica Exenta': "//label[normalize-space(.)='Factura Electrónica Exenta']",
      'Comprobante': "//label[normalize-space(.)='Comprobante']"
    };

    const xpathSelector = xpathMap[documentType];
    if (!xpathSelector) {
      throw new Error(`Tipo de documento "${documentType}" no encontrado.`);
    }
    const labelElem = await this.driver.wait(until.elementLocated(By.xpath(xpathSelector)), 10000);
    await this.driver.executeScript(
      "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", 
      labelElem
    );
    await this.driver.wait(until.elementIsVisible(labelElem), 10000);
    await this.driver.executeScript("arguments[0].click();", labelElem);
  }

  //metodo para ingresar numero de documeto
  async enterDocumentNumber(docNumber) {
    const docNumberSelector = By.css("input[id='Número de Documento']");
    const docNumberField = await this.scrollToElement(docNumberSelector);
    await this.driver.wait(until.elementIsVisible(docNumberField), 10000);
    await docNumberField.clear();
    await docNumberField.sendKeys(docNumber);
  }
  
  //metodo para ingresar comentario
  async fillComment(comment) {
    const commentField = await this.scrollToElement(this.commentTextarea);
    await this.driver.wait(until.elementIsVisible(commentField), 10000);
    await commentField.clear();
    await commentField.sendKeys(comment);
  }

  //metodo para que haga click en crear gasto
  async clickSaveExpenseButton() {
    const saveButton = await this.scrollToElement(this.saveExpenseButton);
    await this.driver.wait(until.elementIsVisible(saveButton), 10000);
    await this.driver.executeScript("arguments[0].click();", saveButton);
    
    await this.driver.wait(until.stalenessOf(saveButton), 10000);
  
   
  }
  
  
}

module.exports = ExpensePage;
