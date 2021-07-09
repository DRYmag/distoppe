const { app, BrowserWindow, nativeTheme } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 375,
    height: 650,
    icon: `${__dirname}/icon.png`
  });

  win.loadFile('dist/distoppe/index.html');
  win.setMenuBarVisibility(false)

  nativeTheme.themeSource = 'dark'
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
