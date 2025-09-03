import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

class BadgeSeed extends Seeder {
  constructor(count: number) {
    super(count);
    this.count = count;
    this.generate();
  }

  protected generate(): void {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        name: faker.word.sample(),
        description: faker.lorem.sentence(),
        type: faker.word.sample(),
        ext: faker.system.fileExt(),
        fullpath: faker.system.filePath(),
        deleted: faker.datatype.boolean(),
      });
    }
  }
}

export default BadgeSeed;
