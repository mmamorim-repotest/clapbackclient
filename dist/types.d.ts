declare class Schema {
    constructor(objSchema: any);
    getTypeDescription(): any;
    validate(data: any): any;
}
declare class Model {
    constructor(entityName: string);
    setSchema(schema: Schema): void;
    set(data: any): Promise<any>;
    getAll(): Promise<any>;
    getId(id: string): Promise<any>;
    get(id: string, cbfunc: Function): void;
}
declare class Entity {
    constructor(entityName: string);
    getEntityName(): string;
    getSchema(): any;
    setSchema(objSchema: any): void;
    validate(data: any): any;
    model(): Model;
    listen(cbfunc: Function): void;
    listenID(id: string, cbfunc: Function): void;
}
export class Clapback {
    static host: string;
    ready: Promise<any>;
    constructor(host: string);
    getEntities(): Promise<any>;
    entity(entityName: string): Entity;
}

//# sourceMappingURL=types.d.ts.map
