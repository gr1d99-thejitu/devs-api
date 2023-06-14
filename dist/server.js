"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const data_source_1 = require("./src/data-source");
const port = process.env.PORT || 8080;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.group();
    console.info('App datasource initialized!starting application server!');
    console.info('Starting application server!');
    console.groupEnd();
    app_1.default.listen(port, () => {
        console.log(`App running on port ${port}`);
    });
})
    .catch((error) => {
    var _a;
    console.group();
    console.error('Datasource initialization error', (_a = error.message) !== null && _a !== void 0 ? _a : JSON.stringify(error));
    console.groupEnd();
});
