abstract class Seeder {
    protected count: number;
    protected _data: any = [];

    constructor(count: number) {
        this.count = count;
    }

    protected abstract generate(): void;

    get data(): [] {
        return this._data;
    }
}

export default Seeder;