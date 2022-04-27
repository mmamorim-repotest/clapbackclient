import Schema from './schema.js';
export default class Model {
    private entityName;
    private schema;
    constructor(entityName: string);
    setSchema(schema: Schema): void;
    set(data: any): Promise<any>;
    getAll(): Promise<any>;
    getId(id: string): Promise<any>;
    private createClone;
    get(id: string, cbfunc: Function): void;
}
