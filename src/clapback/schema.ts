import Ajv from "ajv"

export default class Schema {
    private ajv: Ajv
    private validator: any
    private objSchema: any

    constructor(objSchema: any) {
        this.objSchema = objSchema
        this.ajv = new Ajv()
        this.validator = this.ajv.compile(objSchema)
    }

    getTypeDescription() {
        let typeDesc: any = {}
        for(let key in this.objSchema.properties) {
            typeDesc[key] = this.objSchema.properties[key].type
        }
        return typeDesc
    }

    validate(data: any) {
        this.validator(data)
        return this.validator.errors
    }
}