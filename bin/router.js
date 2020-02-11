"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes = __importStar(require("./routes"));
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
// file routes (stylesheets, images, scripts)
exports.router.get('/css/*', routes.sendFile);
exports.router.get('/img/*', routes.sendFile);
exports.router.get('/js/*', routes.sendFile);
exports.router.get('/favicon.ico', routes.sendFile);
// page routes
exports.router.get('/', routes.homePage);
//# sourceMappingURL=router.js.map