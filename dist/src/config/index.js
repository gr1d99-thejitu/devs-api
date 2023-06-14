"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = __importDefault(require("path"));
const packageJSON = __importStar(require("../../package.json"));
// default values
// you can change the API_URL values to the ones defined in your .env.development file
const APP_ENV = process.env.NODE_ENV || 'development';
const envFile = path_1.default.join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`);
const corsOptions = {
    origin: '*'
};
const test = {
    version: packageJSON.version,
    corsOptions,
    envFile
};
const development = {
    version: packageJSON.version,
    corsOptions,
    envFile
};
const production = {
    version: packageJSON.version,
    corsOptions,
    envFile
};
const configs = { development, production, test };
const config = configs[APP_ENV];
exports.config = config;
