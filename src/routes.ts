import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { default as pino } from 'pino';

// instantiate and configure logger
const log = pino({ prettyPrint: true, useLevelLabels: true, name: `FRI-D:${path.basename(__filename)}`, level: process.env.LOG_LEVEL || 'info' });
log.info(`Logging enabled. LOG_LEVEL is ${log.level.toUpperCase()}`);

export const homePage = async (req: Request, res: Response) => {
  log.trace(`${req.url} ->`, 'Valid route, handling...');
  res
    .status(200)
    .send(
      '<html><head><link rel="stylesheet" type="text/css" href="css/style.css"><title>Howdy!</title></head><body>Hello, <img src="/images/sdhs-logo.png"></body>',
    );
};

export const sendFile = async (req: Request, res: Response) => {
  if (fs.existsSync(`.${req.url}`)) {
    log.trace(`${req.url} ->`, `Requested file found, sending.`);
    res.status(200).sendFile(path.resolve(`.${req.url}`));
  } else {
    log.trace(`${req.url} ->`, `Requested file not found, sending 404.`);
    res.status(404).send();
  }
};
