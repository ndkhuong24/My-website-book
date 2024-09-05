export class Groups {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    status: number;

    constructor(id: number, name: string, status: number, created_at?: Date, updated_at?: Date) {
        this.id = id;
        this.name = name;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
        this.status = status;
    }
}