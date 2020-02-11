require('dotenv').config();
import express from 'express';
import { default as pino } from 'pino';
import { Server } from 'http';
import { router } from './router';
import path from 'path';

// instantiate and configure logger
const log = pino({ prettyPrint: true, useLevelLabels: true, name: `FRI-D:${path.basename(__filename)}`, level: process.env.LOG_LEVEL || 'info' });
log.info(`Logging enabled. LOG_LEVEL is ${log.level.toUpperCase()}`);

// instantiate express and an httpServer
const app = express();
let httpServer: Server;

startServer();

/**
 * Sets up and starts the express server on the port specified in the HTTP_PORT environment variable
 */
function startServer() {
  log.debug('startServer() ->', 'Starting express HTTPServer...');

  // set ejs for content rendering of non-static pages
  app.set('view engine', 'ejs');

  app.use('/', router);

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
