"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const entity_js_1 = __importDefault(require("./entity.js"));
class Clapback {
    constructor(host) {
        this.entities = {};
        Clapback.host = host;
        let self = this;
        this.ready = new Promise((_resolve, _reject) => {
            self.getEntities().then((data) => {
                _resolve(data);
            });
        });
    }
    async getEntities() {
        let response = await (0, axios_1.default)({
            method: 'get',
            url: Clapback.host + '/entities',
            data: {}
        });
        this.entities = {};
        for (let key in response.data) {
            this.entities[key] = new entity_js_1.default(response.data[key].name);
            this.entities[key].setSchema(response.data[key].schema);
        }
        return response.data;
    }
    entity(entityName) {
        if (entityName == undefined) {
            throw new Error("Entity name required!");
        }
        if (this.entities[entityName] == undefined) {
            throw new Error("Entity name not found!");
        }
        return this.entities[entityName];
    }
}
exports.default = Clapback;
