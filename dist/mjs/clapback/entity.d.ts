export default class Entity {
    private entityName;
    private schema;
    private objSchema;
    private _model;
    private socket;
    constructor(entityName: string);
    getEntityName(): string;
    getSchema(): any;
    setSchema(objSchema: any): void;
    validate(data: any): any;
    model(): any;
    listen(cbfunc: Function): void;
    listenID(id: string, cbfunc: Function): void;
}
