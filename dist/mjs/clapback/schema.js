import Ajv from "ajv";
export default class Schema {
    constructor(objSchema) {
        this.objSchema = objSchema;
        this.ajv = new Ajv();
        this.validator = this.ajv.compile(objSchema);
    }
    getTypeDescription() {
        let typeDesc = {};
        for (let key in this.objSchema.properties) {
            typeDesc[key] = this.objSchema.properties[key].type;
        }
        return typeDesc;
    }
    validate(data) {
        this.validator(data);
        return this.validator.errors;
    }
}
