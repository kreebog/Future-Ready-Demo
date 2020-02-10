"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const pino_1 = __importDefault(require("pino"));
const router_1 = require("./router");
const path_1 = __importDefault(require("path"));
// instantiate and configure logger
const log = pino_1.default({ prettyPrint: true, useLevelLabels: true, name: `FRI-D:${path_1.default.basename(__filename)}`, level: process.env.LOG_LEVEL || 'info' });
log.info(`Logging enabled. LOG_LEVEL is ${log.level.toUpperCase()}`);
// instantiate express and an httpServer
const app = express_1.default();
let httpServer;
startServer();
/**
 * Sets up and starts the express server on the port specified in the HTTP_PORT environment variable
 */
function startServer() {
    log.debug('startServer() ->', 'Starting express HTTPServer...');
    app.use('/', router_1.router);
    // catch-all for unhandled requests
    app.get('/*', (req, res) => {
        log.warn(`${req.url} ->`, 'Invalid route, sending 404.');
        res.status(404).json({
            status: '404',
            message: 'Route not found: ' + req.path,
        });
    });
    httpServer = app.listen(process.env.HTTP_PORT || 80, () => {
        log.info('startServer() ->', `Server started on port ${process.env.HTTP_PORT || 80} `);
    });
}
/**
 * Shuts down the server and exits the program.
 */
function stopServer() {
    log.debug('stopServer()', 'Stopping express server.');
}
//# sourceMappingURL=server.js.map