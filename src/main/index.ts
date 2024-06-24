import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { Auth } from 'msmc'

let mainWindow: BrowserWindow;
let modrinthWindow: BrowserWindow;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 960,
    height: 540,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.on('openModrinth', () => {
    createModrinthWindow();
  });

  ipcMain.on('requestAccount', () => {
    if (true) {
      mainWindow.webContents.send('loginRequired');
    }
  })

  ipcMain.on('requestAuth', async () => {
    //Create a new Auth manager
    const authManager = new Auth("select_account");
    //Launch using the 'raw' gui framework (can be 'electron' or 'nwjs')
    const xboxManager = await authManager.launch("electron");
    //Generate the Minecraft login token
    const token = await xboxManager.getMinecraft();

    mainWindow.webContents.send("profileInfo", token);
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const createModrinthWindow = () => {
  if (modrinthWindow && !modrinthWindow.isDestroyed()) modrinthWindow.close();
  // Create the browser window.
  modrinthWindow = new BrowserWindow({
    width: 1024,
    height: 640,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  modrinthWindow.on("close", () => {
    modrinthWindow.destroy();
  });

  modrinthWindow.on('ready-to-show', () => {
    modrinthWindow?.show()
  })

  modrinthWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  modrinthWindow.loadURL("https://modrinth.com/mods");

  modrinthWindow.webContents.insertCSS(`
    .normal-page__info {
      display: none;
    }

    main {
      margin-bottom: 60px;
    }

    footer {
      display: none !important;
    }

    section[aria-label*="Loader filters"], section[aria-label*="Environment filters"] {
      display: none;
    }

    .navigation-card a[href*="/versions"] {
      display: none;
    }
    
    div:has(>*[rel~="sponsored"]) {
      display: none !important;
    }
  `);
}