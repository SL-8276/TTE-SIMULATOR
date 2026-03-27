const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("probeInput", {
  onReading(callback) {
    if (typeof callback !== "function") {
      return () => {};
    }

    const handler = (_event, payload) => {
      callback(payload);
    };

    ipcRenderer.on("probe-reading", handler);

    return () => {
      ipcRenderer.removeListener("probe-reading", handler);
    };
  },
  onStatus(callback) {
    if (typeof callback !== "function") {
      return () => {};
    }

    const handler = (_event, payload) => {
      callback(payload);
    };

    ipcRenderer.on("probe-status", handler);

    return () => {
      ipcRenderer.removeListener("probe-status", handler);
    };
  }
});
