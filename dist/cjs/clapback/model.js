"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const clapback_js_1 = __importDefault(require("./clapback.js"));
class Model {
    constructor(entityName) {
        this.schema = null;
        this.entityName = entityName;
    }
    setSchema(schema) {
        this.schema = schema;
    }
    async set(data) {
        let routeName = this.entityName.toLowerCase();
        let path = clapback_js_1.default.host + '/entities/' + routeName;
        if (this.schema) {
            let error = this.schema.validate(data);
            if (error) {
                console.log(`VALIDATE ERROR on setting [${this.entityName}]`);
                throw error;
            }
        }
        const res = await axios_1.default.put(path, data);
        return res.data;
    }
    async getAll() {
        let routeName = this.entityName.toLowerCase();
        let response = await (0, axios_1.default)({
            method: 'get',
            url: clapback_js_1.default.host + '/entities/' + routeName,
            data: {}
        });
        return response.data;
    }
    async getId(id) {
        let routeName = this.entityName.toLowerCase();
        try {
            let response = await (0, axios_1.default)({
                method: 'get',
                url: clapback_js_1.default.host + '/entities/' + routeName + "/" + id,
                data: {}
            });
            return response.data;
        }
        catch (e) {
            return { error: "Entity name required!" };
        }
    }
    createClone(obj) {
        let self = this;
        let clone = JSON.parse(JSON.stringify(obj));
        let save = async function () {
            let dataSafe = JSON.parse(JSON.stringify(clone));
            await self.set(dataSafe);
        };
        clone.save = save;
        return clone;
    }
    get(id, cbfunc) {
        let self = this;
        this.getId(id).then((data) => {
            let dataSafe = self.createClone(data);
            cbfunc(dataSafe);
        });
    }
}
exports.default = Model;
