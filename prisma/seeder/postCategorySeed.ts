import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

class PostCategorySeed extends Seeder {
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
      });
    }
  }
}

export default PostCategorySeed;