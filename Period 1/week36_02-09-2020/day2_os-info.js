const os = require("os");

const osInfo = {
  platform: os.platform(),
  osType: os.type(),
  osType: os.type(),
  freeMemory: os.freemem(),
  totalMemory: os.totalmem(),
  EOL: os.EOL,
};

module.exports = osInfo;
