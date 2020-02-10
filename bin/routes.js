"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
exports.homePage = (req, res) => __awaiter(this, void 0, void 0, function* () {
    log.trace(`${req.url} ->`, 'Valid route, handling...');
    res
        .status(200)
        .send('<html><head><link rel="stylesheet" type="text/css" href="css/style.css"><title>Howdy!</title></head><body>Hello, <img src="/images/sdhs-logo.png"></body>');
});
exports.sendFile = (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (fs_1.default.existsSync(`.${req.url}`)) {
        log.trace(`${req.url} ->`, `Requested file found, sending.`);
        res.status(200).sendFile(path_1.default.resolve(`.${req.url}`));
    }
    else {
        log.trace(`${req.url} ->`, `Requested file not found, sending 404.`);
        res.status(404).send();
    }
});
//# sourceMappingURL=routes.js.map