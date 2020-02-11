import * as routes from './routes';
import express from 'express';

export const router = express.Router();

// file routes (stylesheets, images, scripts)
router.get('/css/*', routes.sendFile);
router.get('/img/*', routes.sendFile);
router.get('/js/*', routes.sendFile);
router.get('/favicon.ico', routes.sendFile);

// page routes
router.get('/', routes.homePage);
