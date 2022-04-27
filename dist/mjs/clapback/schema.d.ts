export default class Schema {
    private ajv;
    private validator;
    private objSchema;
    constructor(objSchema: any);
    getTypeDescription(): any;
    validate(data: any): any;
}
