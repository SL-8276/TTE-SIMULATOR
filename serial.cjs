const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const BAUD_RATE = 460800;
const HARD_PORT = null;

async function listPorts() {
  const ports = await SerialPort.list();
  return ports.map((port) => ({
    path: port.path,
    manufacturer: port.manufacturer,
    vendorId: port.vendorId,
    productId: port.productId
  }));
}

function pickPort(ports) {
  if (HARD_PORT) return HARD_PORT;

  const preferred = ports.find((port) => {
    const manufacturer = String(port.manufacturer || "").toLowerCase();
    return (
      manufacturer.includes("silicon") ||
      manufacturer.includes("wch") ||
      manufacturer.includes("ftdi")
    );
  });

  return (preferred || ports[0] || {}).path;
}

function parseLine(line) {
  const match = line.match(/^Q\s+([^ ]+)\s+Z\s+(\S+)\s+BTN\s+(\d+)\s+SEQ\s+(\d+)/i);
  if (!match) return null;

  const quaternion = match[1].split(",").map(Number);
  if (quaternion.length !== 4 || quaternion.some((value) => !Number.isFinite(value))) {
    return null;
  }

  return {
    qw: quaternion[0],
    qx: quaternion[1],
    qy: quaternion[2],
    qz: quaternion[3],
    zone: match[2],
    btn: Number(match[3]),
    seq: Number(match[4]),
    ts: Date.now(),
    raw: line
  };
}

function startSerial({ onStatus, onData }) {
  let port = null;

  (async () => {
    try {
      const ports = await listPorts();
      onStatus?.(`Serial ports: ${ports.map((portInfo) => portInfo.path).join(", ") || "(none)"}`);

      const portPath = pickPort(ports);
      if (!portPath) {
        throw new Error("No COM port found.");
      }

      onStatus?.(`Opening serial: ${portPath} @ ${BAUD_RATE}`);
      port = new SerialPort({ path: portPath, baudRate: BAUD_RATE });

      port.on("open", () => onStatus?.(`Serial open: ${portPath}`));
      port.on("error", (error) => onStatus?.(`Serial error: ${error?.message || error}`));
      port.on("close", () => onStatus?.("Serial closed"));

      const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
      parser.on("data", (line) => {
        const packet = parseLine(String(line).trim());
        if (packet) {
          onData?.(packet);
        }
      });
    } catch (error) {
      onStatus?.(`Serial init failed: ${error?.message || error}`);
    }
  })();

  return () => {
    try {
      port?.close();
    } catch {}
  };
}

module.exports = { startSerial };
