const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const { startSerial } = require("./serial.cjs");

let mainWindow;
let stopSerial = null;
let serialStarted = false;

function createWindow() {
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  mainWindow.loadURL("http://localhost:5173");
  mainWindow.setMenuBarVisibility(false);

  mainWindow.webContents.on("did-finish-load", () => {
    if (serialStarted) return;
    serialStarted = true;

    stopSerial = startSerial({
      onStatus: (message) => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send("probe-status", message);
        }
      },
      onData: (packet) => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send("probe-reading", packet);
        }
      }
    });
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  try {
    stopSerial?.();
  } catch {}

  if (process.platform !== "darwin") app.quit();
});
