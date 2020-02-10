import * as routes from './routes';
import express from 'express';

export const router = express.Router();

// handle image and stylesheet requests
router.get('/css/*', routes.sendFile);
router.get('/images/*', routes.sendFile);

// pages
router.get('/', routes.homePage);
