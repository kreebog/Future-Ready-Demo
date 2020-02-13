"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const pino_1 = __importDefault(require("pino"));
// instantiate and configure logger
const log = pino_1.default({ prettyPrint: true, useLevelLabels: true, name: `FRI-D:${path_1.default.basename(__filename)}`, level: process.env.LOG_LEVEL || 'info' });
log.info(`Logging enabled. LOG_LEVEL is ${log.level.toUpperCase()}`);
/**
 * Render the home page
 *
 * @param req - Express Request Object
 * @param res - Express Response Object
 */
exports.homePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    log.trace(`${req.url} ->`, 'Valid route, rendering Home Page...');
    let name = '';
    let logo = '';
    let cheer = '';
    switch (req.query['school']) {
        case 'rbhs':
            name = 'Red Bank High School';
            logo = 'rbhs-logo.png';
            cheer = 'GooooOOO - big, scary, cat-lookin\' thing!';
            break;
        case 'sdhs':
            name = 'Soddy Daisy High School';
            logo = 'sdhs-logo.png';
            cheer = 'GooooOOO - flowers?';
            break;
    }
    res.render('pageHome.ejs', { name, logo, cheer });
});
/**
 * Checks for existence of requested file and sends if found.
 * If not found, will respond with 404.
 *
 * @param req
 * @param res
 */
exports.sendFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (fs_1.default.existsSync(`.${req.url}`)) {
        log.trace(`${req.url} ->`, `Requested file found, sending.`);
        res.status(200).sendFile(path_1.default.resolve(`.${req.url}`));
    }
    else {
        log.trace(`${req.url} ->`, `Requested file not found, sending 404 (NOT FOUND).`);
        res.status(404).send();
    }
});
//# sourceMappingURL=routes.js.map