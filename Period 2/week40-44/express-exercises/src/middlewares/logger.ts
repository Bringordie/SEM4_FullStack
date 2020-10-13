import winston from 'winston';
import expressWinston from 'express-winston';
 
const logger = function (req:any, res:any, next:any) {
    const levelStatus = () => {
        var levelS = "";
        if (res.statusCode >= 100) { levelS = "info"; }
        if (res.statusCode >= 400) { levelS = "warn"; }
        if (res.statusCode >= 500) { levelS = "error"; }
        // Ops is worried about hacking attempts so make Unauthorized and Forbidden critical
        if (res.statusCode == 401 || res.statusCode == 403) { levelS = "critical"; }
        // No one should be using the old path, so always warn for those
        if (req.path === "/v1" && levelS === "info") { levelS = "warn"; }
        return levelS;
      }

    //console.log("Inside Logger: "+res.statusCode + 'Status Level: '+ levelStatus())

expressWinston.logger({
  level: "info",
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: './src/logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './src/logs/all.log' }),
  ],
});

next()
}



export {logger}