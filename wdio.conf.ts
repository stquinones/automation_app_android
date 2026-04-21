exports.config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    port: 4723,
   path: '/',
    specs: ['./test/specs/**/*.ts'],
    //specs: ['./**/test/specs/**/*.ts'],
    maxInstances: 1,
    /*capabilities: [{
        platformName: 'Android',
       'appium:app': process.env.DEVICEFARM_APP_PATH || './app-beta.apk',
        'appium:automationName': 'UiAutomator2',
        'appium:autoGrantPermissions': true
    }],*/
   
   capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': process.env.DEVICEFARM_DEVICE_NAME || 'Android',
        'appium:platformVersion': process.env.DEVICEFARM_DEVICE_OS_VERSION || '*',
        'appium:app': process.env.DEVICEFARM_APP_PATH || './app-beta.apk',
        'appium:udid': process.env.DEVICEFARM_DEVICE_UDID || '',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 300,
        'appium:autoGrantPermissions': true,
    }],
    
    logLevel: 'info',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
   services: [['appium', {
    args: {
      // Opciones para el servidor Appium si necesitas
    },
    command: 'appium',
}]],
reporters: [
    'spec',
    ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false
    }]
],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: './tsconfig.json'
        }
    },
};