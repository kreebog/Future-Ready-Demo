import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { default as pino } from 'pino';

// instantiate and configure logger
const log = pino({ prettyPrint: true, useLevelLabels: true, name: `FRI-D:${path.basename(__filename)}`, level: process.env.LOG_LEVEL || 'info' });
log.info(`Logging enabled. LOG_LEVEL is ${log.level.toUpperCase()}`);

/**
 * Render the home page
 * @param req - Express Request Object
 * @param res - Express Response Object
 */
export const homePage = async (req: Request, res: Response) => {
  log.trace(`${req.url} ->`, 'Valid route, rendering Home Page...');
  let name = 'Mystery School';
  let logo = 'unknown.png';
  let cheer = 'Go, go, whoever you are!';
  switch (req.query['school']) {
    case 'rbhs':
      name = 'Red Bank High School';
      logo = 'rbhs-logo.png';
      cheer = 'Go Lions!';
      break;
    case 'sdhs':
      name = 'Soddy Daisy High School';
      logo = 'sdhs-logo.png';
      cheer = 'Go Daisies!';
      break;
  }
  res.render('pageHome.ejs', { name, logo, cheer });
};

export const sendFile = async (req: Request, res: Response) => {
  if (fs.existsSync(`.${req.url}`)) {
    log.trace(`${req.url} ->`, `Requested file found, sending.`);
    res.status(200).sendFile(path.resolve(`.${req.url}`));
  } else {
    log.trace(`${req.url} ->`, `Requested file not found, sending 404 (NOT FOUND).`);
    res.status(404).send();
  }
};
