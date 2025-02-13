# 📌 Rindegastos - Automatización de Pruebas

Este proyecto es un conjunto de pruebas automatizadas para la plataforma [Rindegastos](https://app.rindegastos.com/), utilizando **Selenium WebDriver** y **Jest** para validar la funcionalidad de creación de gastos.

## 🚀 Características

- 🔍 **Automatización de pruebas** de inicio de sesión y creación de gastos.
- 🌐 **Uso de Selenium WebDriver** para interactuar con la UI.
- ✅ **Framework de testing Jest** para la ejecución y validación de pruebas.
- 📸 **Captura de pantalla en caso de error**.

---

## 📦 Instalación

### 🔧 Prerrequisitos
- Tener instalado [Node.js](https://nodejs.org/)
- Tener instalado **Google Chrome**

### 📥 Instalación del proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/CamiSalvo/Rindegastos.git
   cd rindegastos
   ```

2. Inicializar un proyecto con Node.js:
   ```bash
   npm install
   ```
---

## 🔧 Configuración

El archivo de configuración `config/config.js` define los siguientes parámetros:

```javascript
module.exports = {
    baseUrl: 'https://app.rindegastos.com/', // URL de la plataforma
    browser: 'chrome', // Navegador utilizado
    timeout: 10000 // Tiempo de espera en milisegundos
};
```

---

## 📝 Estructura del Proyecto

```
📂 rindegastos-automation
 ├── 📂 config
 │   └── config.js           # Configuración del entorno
 ├── 📂 pages
 │   ├── loginPage.js        # Página de login
 │   └── expensePage.js      # Página de gastos
 ├── 📂 tests
 │   └── login.test.js       # Pruebas automatizadas
 ├── 📂 utils
 │   └── helper.js           # Utilidades para pruebas
 ├── package.json            # Dependencias y scripts
 ├── README.md               # Documentación del proyecto
```

---

## 🛠 Uso

### 🔹 Ejecutar pruebas
Para ejecutar las pruebas automatizadas, usa el siguiente comando:

```bash
Setear las variables usuario y contraseña
Linea  43 para usuario : await loginPage.enterEmail('example@example.cl');
Linea  60 para contraseña: await loginPage.enterPassword('password');
```

```bash
npm test
```

### 📸 Captura de pantalla en caso de error
En caso de fallo, se guardará una captura de pantalla en la carpeta `screenshots`.

---

## 📄 Scripts disponibles en `package.json`

```json
"scripts": {
  "test": "jest"
}
```



