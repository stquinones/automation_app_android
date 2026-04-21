import { expect, $ } from '@wdio/globals';

describe('Inicio', () => {

  beforeEach(async () => {
    await driver.terminateApp('com.tn.beta');  
    await driver.activateApp('com.tn.beta');
  });

  it('Encontrar boton de vivo', async () => {
   const liveButton = await $('~En vivo. Transmisión en tiempo real');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();

  });

  it('Acceder al vivo', async () => {
   const liveButton = await $('~En vivo. Transmisión en tiempo real');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const enVivo = await $('~Mostrar controles del reproductor');
      await expect(enVivo).toBeDisplayed();
  });

  it('Encontrar campana de notificaciones', async () => {
   const liveButton = await $('~Campana Notificaciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
  });

  it('Acceder a modal de notificaciones', async () => {
   const liveButton = await $('~Campana Notificaciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Notificaciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();
      
  });

  it('Validar modal de notificaciones', async () => {
   const liveButton = await $('~Campana Notificaciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      
      const topbarSecciones = await $('//android.view.View[@text="Notificaciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();

      const botonAjustesNotificaciones = await $('~Ajustes de notificaciones');
      await botonAjustesNotificaciones.waitForDisplayed({ timeout: 10000 });
      await expect(botonAjustesNotificaciones).toBeDisplayed()

      const textoNotificaciones = await $('//android.widget.TextView[@text="No tenés notificaciones nuevas"]');
      await textoNotificaciones.waitForDisplayed({ timeout: 10000 });
      await expect(textoNotificaciones).toBeDisplayed();

      const bajadaNotificaciones = await $('//android.widget.TextView[@text="Configurá tus alertas y descubrí nuevos temas para informarte."]');
      await bajadaNotificaciones.waitForDisplayed({ timeout: 10000 });
      await expect(bajadaNotificaciones).toBeDisplayed();

      const botonSeleccionarTemas = await $('~Seleccionar temas');
      await botonSeleccionarTemas.waitForDisplayed({ timeout: 10000 });
      await expect(botonSeleccionarTemas).toBeDisplayed();

      const botonVolverInicio = await $('//android.widget.TextView[@resource-id="button-text" and @text="Volver al inicio"]');
      await botonVolverInicio.waitForDisplayed({ timeout: 10000 });
      await expect(botonVolverInicio).toBeDisplayed();
      
  });

  it('Acceder a modal de notificaciones', async () => {
   const liveButton = await $('~Campana Notificaciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Notificaciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();
      const botonInicio = await $('//android.widget.Button[@content-desc="Atrás"]');
      await botonInicio.waitForDisplayed({ timeout: 10000 });
      await expect(botonInicio).toBeDisplayed();
      botonInicio.click()
      const botonVivo = await $('~En vivo. Transmisión en tiempo real');
      await botonVivo.waitForDisplayed({ timeout: 10000 });
      await expect(botonVivo).toBeDisplayed();
      
  });


  it('Acceder a ajustes de notificaciones desde boton', async () => {
   const liveButton = await $('~Campana Notificaciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Notificaciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();

      const botonSeleccionar = await $('~Seleccionar temas');
      await botonSeleccionar.waitForDisplayed({ timeout: 10000 });
      await expect(botonSeleccionar).toBeDisplayed();
      botonSeleccionar.click();
      const ajustesNotificaciones = await $('//android.view.View[@text="Ajustes de notificaciones"]');
      await ajustesNotificaciones.waitForDisplayed({ timeout: 10000 });
      await expect(ajustesNotificaciones).toBeDisplayed();
      
  });

  it('Acceder a ajustes de notificaciones desde icono', async () => {
   const liveButton = await $('~Campana Notificaciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Notificaciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();

      const botonAjustesNotificaciones = await $('~Ajustes de notificaciones');
      await botonAjustesNotificaciones.waitForDisplayed({ timeout: 10000 });
      await expect(botonAjustesNotificaciones).toBeDisplayed();
      botonAjustesNotificaciones.click();
      const ajustesNotificaciones = await $('//android.view.View[@text="Ajustes de notificaciones"]');
      await ajustesNotificaciones.waitForDisplayed({ timeout: 10000 });
      await expect(ajustesNotificaciones).toBeDisplayed();

      
  });

})

describe('Notas', () => { 
  
  beforeEach(async () => {
    await driver.terminateApp('com.tn.beta');  
    await driver.activateApp('com.tn.beta');
  });

  it('Acceder a nota', async () => {
  
    const liveButton = await $('~En vivo. Transmisión en tiempo real');
    await liveButton.waitForDisplayed({ timeout: 90000 });
    await expect(liveButton).toBeDisplayed();

    const nota = await $('//android.widget.TextView[@content-desc="Tras el desplazamiento de Florencia Misrahi, el Gobierno nombró a Juan Pazo como el nuevo titular de ARCA/. Tras el desplazamiento de Florencia Misrahi, el Gobierno nombró a Juan Pazo como el nuevo titular de ARCA"]');
    await nota.waitForDisplayed({ timeout: 90000 });
    await expect(nota).toBeDisplayed();

    nota.click()

    //const bodyNota = await $('//android.view.View[@resource-id="fusion-app"]');
    const bodyNota = await $('~nota')
    await bodyNota.waitForDisplayed({ timeout: 90000 });
    await expect(bodyNota).toBeDisplayed();
    

  })

  it('Validar topbar de nota', async () => {
  
    const liveButton = await $('~En vivo. Transmisión en tiempo real');
    await liveButton.waitForDisplayed({ timeout: 90000 });
    await expect(liveButton).toBeDisplayed();

    const nota = await $('//android.widget.TextView[@content-desc="Tras el desplazamiento de Florencia Misrahi, el Gobierno nombró a Juan Pazo como el nuevo titular de ARCA/. Tras el desplazamiento de Florencia Misrahi, el Gobierno nombró a Juan Pazo como el nuevo titular de ARCA"]');
    await nota.waitForDisplayed({ timeout: 90000 });
    await expect(nota).toBeDisplayed();

    nota.click()

    const bodyNota = await $('~nota');
    await bodyNota.waitForDisplayed({ timeout: 90000 });
    await expect(bodyNota).toBeDisplayed();

    const botonAtras = await $('//android.widget.Button[@content-desc="Atrás"]');
    await botonAtras.waitForDisplayed({ timeout: 90000 });
    await expect(botonAtras).toBeDisplayed();

    const botonShare = await $('~Compartir nota');
    await botonShare.waitForDisplayed({ timeout: 90000 });
    await expect(botonShare).toBeDisplayed();
    
  })

  it('Acceder a nota y volver a Inicio', async () => {
  
    const liveButton = await $('~En vivo. Transmisión en tiempo real');
    await liveButton.waitForDisplayed({ timeout: 90000 });
    await expect(liveButton).toBeDisplayed();

    const nota = await $('//android.widget.TextView[@content-desc="Tras el desplazamiento de Florencia Misrahi, el Gobierno nombró a Juan Pazo como el nuevo titular de ARCA/. Tras el desplazamiento de Florencia Misrahi, el Gobierno nombró a Juan Pazo como el nuevo titular de ARCA"]');
    await nota.waitForDisplayed({ timeout: 90000 });
    await expect(nota).toBeDisplayed();

    nota.click()

    const bodyNota = await $('~nota');
    await bodyNota.waitForDisplayed({ timeout: 90000 });
    await expect(bodyNota).toBeDisplayed();
    
    const botonAtras = await $('//android.widget.Button[@content-desc="Atrás"]');
    await botonAtras.waitForDisplayed({ timeout: 90000 });
    await expect(botonAtras).toBeDisplayed();

    botonAtras.click();

    await liveButton.waitForDisplayed({ timeout: 90000 });
    await expect(liveButton).toBeDisplayed();

  })
})

describe('Navbar', () => {

beforeEach(async () => {
    await driver.terminateApp('com.tn.beta');  
    await driver.activateApp('com.tn.beta');
  });

  

  it('Encontrar Inicio del navbar', async () => {
   const liveButton = await $('~Inicio');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
  });

  it('Encontrar Secciones del navbar', async () => {
   const liveButton = await $('~Secciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
  });

  it('Ingresar a Secciones del navbar', async () => {
   const liveButton = await $('~Secciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.widget.TextView[@text="Selección del editor"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();
  });

  it('Validar pantalla Secciones', async () => {
   const liveButton = await $('~Secciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      //const topbarSecciones = await $('//android.view.View[@text="Secciones"]');
      //await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      //await expect(topbarSecciones).toBeDisplayed();
      const titleSecciones = await $('//android.widget.TextView[@text="Selección del editor"]');
      await titleSecciones.waitForDisplayed({ timeout: 90000 });
      await expect(titleSecciones).toBeDisplayed();

      const menuTodoNoticias = await $('~Todo Noticias, Ícono chevron-right');
      await menuTodoNoticias.waitForDisplayed({ timeout: 10000 });
      await expect(menuTodoNoticias).toBeDisplayed();

      const menuDeportivo = await $('~Deportivo, Nuevo, Ícono chevron-right');
      await menuDeportivo.waitForDisplayed({ timeout: 10000 });
      await expect(menuDeportivo).toBeDisplayed();

      const menuShow = await $('~Show, Ícono chevron-right');
      await menuShow.waitForDisplayed({ timeout: 10000 });
      await expect(menuShow).toBeDisplayed();

      const menuMusica = await $('~La Viola, Ícono chevron-right');
      await menuMusica.waitForDisplayed({ timeout: 10000 });
      await expect(menuMusica).toBeDisplayed();

      const menuTecno = await $('~Tecno, Ícono chevron-right');
      await menuTecno.waitForDisplayed({ timeout: 10000 });
      await expect(menuTecno).toBeDisplayed();

      const menuBienestar = await $('~Con Bienestar, Ícono chevron-right');
      await menuBienestar.waitForDisplayed({ timeout: 10000 });
      await expect(menuBienestar).toBeDisplayed();

      const menuNosotres = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("Todes Nosotres, Ícono chevron-right"));'
      );

      await expect(menuNosotres).toBeDisplayed();

      
      const menuEstilo = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN Estilo, Ícono chevron-right"));'
      );

      await expect(menuEstilo).toBeDisplayed();

      const menuAutos = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN Autos, Ícono chevron-right"));'
      );

      await expect(menuAutos).toBeDisplayed();

      const menuGente = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN y la Gente, Ícono chevron-right"));'
      );

      await expect(menuGente).toBeDisplayed();

      const menuCampo = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN Campo, Ícono chevron-right"));'
      );

      await expect(menuCampo).toBeDisplayed();

      const menuRunning = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN Running, Ícono chevron-right"));'
      );

      await expect(menuRunning).toBeDisplayed();
      const verMas = await $('//android.widget.TextView[@text="Ver más categorías"]');
      await verMas.waitForDisplayed({ timeout: 90000 });
      await expect(verMas).toBeDisplayed();

      
  });

  it('Validar boton Ver Mas', async () => {
   const liveButton = await $('~Secciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      //const topbarSecciones = await $('//android.view.View[@text="Secciones"]');
      //await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      //await expect(topbarSecciones).toBeDisplayed();
      const titleSecciones = await $('//android.widget.TextView[@text="Selección del editor"]');
      await titleSecciones.waitForDisplayed({ timeout: 90000 });
      await expect(titleSecciones).toBeDisplayed();

      const menuTodoNoticias = await $('~Todo Noticias, Ícono chevron-right');
      await menuTodoNoticias.waitForDisplayed({ timeout: 10000 });
      await expect(menuTodoNoticias).toBeDisplayed();

      const menuNosotres = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("Todes Nosotres, Ícono chevron-right"));'
      );

      await expect(menuNosotres).toBeDisplayed();

      
      const menuEstilo = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN Estilo, Ícono chevron-right"));'
      );

      await expect(menuEstilo).toBeDisplayed();

      const menuAutos = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN Autos, Ícono chevron-right"));'
      );

      await expect(menuAutos).toBeDisplayed();

      const menuGente = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN y la Gente, Ícono chevron-right"));'
      );

      await expect(menuGente).toBeDisplayed();

      const menuCampo = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN Campo, Ícono chevron-right"));'
      );

      await expect(menuCampo).toBeDisplayed();

      const menuRunning = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN Running, Ícono chevron-right"));'
      );

      await expect(menuRunning).toBeDisplayed();
      const verMas = await $('//android.widget.TextView[@text="Ver más categorías"]');
      await verMas.waitForDisplayed({ timeout: 90000 });
      await expect(verMas).toBeDisplayed();
      verMas.click()

      
  });

  //Adición desde git
  /*it('Validar header Politica', async () => {
   const liveButton = await $('~Secciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Secciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();

      const menuPolitica = await $('~Política');
      await menuPolitica.waitForDisplayed({ timeout: 10000 });
      await expect(menuPolitica).toBeDisplayed();
      await menuPolitica.click();
      const campanaNotificaciones = await $('~Campana Notificaciones');
      await campanaNotificaciones.waitForDisplayed({ timeout: 90000 });
      await expect(campanaNotificaciones).toBeDisplayed();
 

      const { width, height } = await driver.getWindowRect();

      await driver.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.7) },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 150 },
        { type: 'pointerMove', duration: 300, x: Math.floor(width / 2), y: Math.floor(height * 0.4) },
        { type: 'pointerUp', button: 0 }
      ]
  }]);
  
  const enVivoBtn = await $('~En vivo. Transmisión en tiempo real');

    await expect(enVivoBtn).toBeDisplayed();

    const politicaIcon = await $$(
    'android=new UiSelector().className("com.horcrux.svg.GroupView")'
    )[1];

    await expect(politicaIcon).toBeDisplayed();

  })

  it('Validar header Deportivo', async () => {
   const liveButton = await $('~Secciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Secciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();

      const menuPolitica = await $('~Deportivo');
      await menuPolitica.waitForDisplayed({ timeout: 10000 });
      await expect(menuPolitica).toBeDisplayed();
      await menuPolitica.click();
      const campanaNotificaciones = await $('~Campana Notificaciones');
      await campanaNotificaciones.waitForDisplayed({ timeout: 90000 });
      await expect(campanaNotificaciones).toBeDisplayed();
 

      const { width, height } = await driver.getWindowRect();

      await driver.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.7) },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 150 },
        { type: 'pointerMove', duration: 300, x: Math.floor(width / 2), y: Math.floor(height * 0.4) },
        { type: 'pointerUp', button: 0 }
      ]
  }]);
  
  const enVivoBtn = await $('~En vivo. Transmisión en tiempo real');

    await expect(enVivoBtn).toBeDisplayed();

    const deportivoIcon = await $$(
    'android=new UiSelector().className("com.horcrux.svg.GroupView")'
    )[0];

    await expect(deportivoIcon).toBeDisplayed();

  })

  it('Validar header Show', async () => {
   const liveButton = await $('~Secciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Secciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();

      const menuPolitica = await $('~Show');
      await menuPolitica.waitForDisplayed({ timeout: 10000 });
      await expect(menuPolitica).toBeDisplayed();
      await menuPolitica.click();
      const campanaNotificaciones = await $('~Campana Notificaciones');
      await campanaNotificaciones.waitForDisplayed({ timeout: 90000 });
      await expect(campanaNotificaciones).toBeDisplayed();
 

      const { width, height } = await driver.getWindowRect();

      await driver.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.7) },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 150 },
        { type: 'pointerMove', duration: 300, x: Math.floor(width / 2), y: Math.floor(height * 0.4) },
        { type: 'pointerUp', button: 0 }
      ]
  }]);
  
  const enVivoBtn = await $('~En vivo. Transmisión en tiempo real');

    await expect(enVivoBtn).toBeDisplayed();

    const showIcon = await $$(
    'android=new UiSelector().className("com.horcrux.svg.GroupView")'
    )[0];

    await expect(showIcon).toBeDisplayed();

  })

  it('Validar header La Viola', async () => {
   const liveButton = await $('~Secciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Secciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();

      const menuPolitica = await $('~La Viola');
      await menuPolitica.waitForDisplayed({ timeout: 10000 });
      await expect(menuPolitica).toBeDisplayed();
      await menuPolitica.click();
      const campanaNotificaciones = await $('~Campana Notificaciones');
      await campanaNotificaciones.waitForDisplayed({ timeout: 90000 });
      await expect(campanaNotificaciones).toBeDisplayed();
 

      const { width, height } = await driver.getWindowRect();

      await driver.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.7) },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 150 },
        { type: 'pointerMove', duration: 300, x: Math.floor(width / 2), y: Math.floor(height * 0.4) },
        { type: 'pointerUp', button: 0 }
      ]
  }]);
  
  const enVivoBtn = await $('~En vivo. Transmisión en tiempo real');

    await expect(enVivoBtn).toBeDisplayed();

    const musicaIcon = await $$(
    'android=new UiSelector().className("com.horcrux.svg.GroupView")'
    )[0];

    await expect(musicaIcon).toBeDisplayed();

  })

  it('Validar header Tecno', async () => {
   const liveButton = await $('~Secciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Secciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();

      const menuPolitica = await $('~Tecno');
      await menuPolitica.waitForDisplayed({ timeout: 10000 });
      await expect(menuPolitica).toBeDisplayed();
      await menuPolitica.click();
      const campanaNotificaciones = await $('~Campana Notificaciones');
      await campanaNotificaciones.waitForDisplayed({ timeout: 90000 });
      await expect(campanaNotificaciones).toBeDisplayed();
 

      const { width, height } = await driver.getWindowRect();

      await driver.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.7) },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 150 },
        { type: 'pointerMove', duration: 300, x: Math.floor(width / 2), y: Math.floor(height * 0.4) },
        { type: 'pointerUp', button: 0 }
      ]
  }]);
  
  const enVivoBtn = await $('~En vivo. Transmisión en tiempo real');

    await expect(enVivoBtn).toBeDisplayed();

    const tecnoIcon = await $$(
    'android=new UiSelector().className("com.horcrux.svg.GroupView")'
    )[0];

    await expect(tecnoIcon).toBeDisplayed();

  })

    it('Ingresar a TN Radio', async () => {

      const liveButton = await $('~Secciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Secciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();

      const menuRadio = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN radio"));'
      );

      await expect(menuRadio).toBeDisplayed();
      menuRadio.click();

      const topbarRadio = await $('//android.view.View[@text="TN radio"]');
      await topbarRadio.waitForDisplayed({ timeout: 90000 });
      await expect(topbarRadio).toBeDisplayed();

  
  })


  it('Ingresar a TN Redes', async () => {

      const liveButton = await $('~Secciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Secciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();

      const menuRedes = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN en las redes"));'
      );

      await expect(menuRedes).toBeDisplayed();
      menuRedes.click();

      const topbarRedes = await $('//android.view.View[@text="TN en las redes"]');
      await topbarRedes.waitForDisplayed({ timeout: 90000 });
      await expect(topbarRedes).toBeDisplayed();

  
  })

  it('Validar pantalla TN Redes', async () => {

      const liveButton = await $('~Secciones');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Secciones"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();

      const menuRedes = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().description("TN en las redes"));'
      );

      await expect(menuRedes).toBeDisplayed();
      menuRedes.click();

      const topbarRedes = await $('//android.view.View[@text="TN en las redes"]');
      await topbarRedes.waitForDisplayed({ timeout: 90000 });
      await expect(topbarRedes).toBeDisplayed();

      const labelRedes = await $('//android.widget.TextView[@text="Seguinos en:"]');
      await labelRedes.waitForDisplayed({ timeout: 90000 });
      await expect(labelRedes).toBeDisplayed();

      const facebook = await $('~Facebook');
      await facebook.waitForDisplayed({ timeout: 90000 });
      await expect(facebook).toBeDisplayed();

      const equis = await $('~X');
      await equis.waitForDisplayed({ timeout: 90000 });
      await expect(equis).toBeDisplayed();

      const instagram = await $('~Instagram');
      await instagram.waitForDisplayed({ timeout: 90000 });
      await expect(instagram).toBeDisplayed();

      const youtube = await $('~Youtube');
      await youtube.waitForDisplayed({ timeout: 90000 });
      await expect(youtube).toBeDisplayed();

      const tiktok = await $('~TikTok');
      await tiktok.waitForDisplayed({ timeout: 90000 });
      await expect(tiktok).toBeDisplayed();

      const telegram = await $('~Telegram');
      await telegram.waitForDisplayed({ timeout: 90000 });
      await expect(telegram).toBeDisplayed();

  
  })
*/

  it('Encontrar Ajustes del nabvar', async () => {
   const liveButton = await $('~Ajustes');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
  });
  
  it('Ingresar a Ajustes del navbar', async () => {
   const liveButton = await $('~Ajustes');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Ajustes"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();
  });

  it('Validar pantalla Ajustes', async () => {
   const liveButton = await $('~Ajustes');
      await liveButton.waitForDisplayed({ timeout: 90000 });
      await expect(liveButton).toBeDisplayed();
      await liveButton.click();
      const topbarSecciones = await $('//android.view.View[@text="Ajustes"]');
      await topbarSecciones.waitForDisplayed({ timeout: 10000 });
      await expect(topbarSecciones).toBeDisplayed();

      const tituloAjustes = await $('//android.widget.TextView[@text="Notificaciones"]');
      await tituloAjustes.waitForDisplayed({ timeout: 10000 });
      await expect(tituloAjustes).toBeDisplayed();

      const ultimoMomento = await $('//android.widget.TextView[@text="Último momento"]');
      await ultimoMomento.waitForDisplayed({ timeout: 10000 });
      await expect(ultimoMomento).toBeDisplayed();

      const politica = await $('//android.widget.TextView[@text="Política"]');
      await politica.waitForDisplayed({ timeout: 10000 });
      await expect(politica).toBeDisplayed();

      const economia = await $('//android.widget.TextView[@text="Economía"]');
      await economia.waitForDisplayed({ timeout: 10000 });
      await expect(economia).toBeDisplayed();

      const deportes = await $('//android.widget.TextView[@text="Deportes"]');
      await deportes.waitForDisplayed({ timeout: 10000 });
      await expect(deportes).toBeDisplayed();

      const show = await $('//android.widget.TextView[@text="Show"]');
      await show.waitForDisplayed({ timeout: 10000 });
      await expect(show).toBeDisplayed();

      const general = await $('//android.widget.TextView[@text="Información General"]');
      await general.waitForDisplayed({ timeout: 10000 });
      await expect(general).toBeDisplayed();

      const autos = await $('//android.widget.TextView[@text="Autos"]');
      await autos.waitForDisplayed({ timeout: 10000 });
      await expect(autos).toBeDisplayed();

      const salud = await $('//android.widget.TextView[@text="Salud"]');
      await salud.waitForDisplayed({ timeout: 10000 });
      await expect(salud).toBeDisplayed();

      const musica = await $('//android.widget.TextView[@text="Música"]');
      await musica.waitForDisplayed({ timeout: 10000 });
      await expect(musica).toBeDisplayed();

      const internacional = await $(
        'android=new UiScrollable(new UiSelector().scrollable(true))' +
        '.scrollIntoView(new UiSelector().text("Internacional"));'
      );

      await expect(internacional).toBeDisplayed();  

  });

});
