import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";
import { randomInt } from "crypto";

class NewsSeed extends Seeder {
  private ids: { userId: string; categoryId: string };

  constructor(count: number, userId: string, categoryId: string) {
    super(count);
    this.count = count;
    this.ids = { userId, categoryId };
    this.generate();
  }

  protected generate(): void {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        priority: randomInt(1, 3),
        pinned: faker.datatype.boolean(),
        visibility: faker.datatype.boolean(),
        approvedBy: faker.string.uuid(),
        userId: this.ids.userId ?? faker.string.uuid(),
        categoryId: this.ids.categoryId ?? faker.string.uuid(),
      });
    }
  }
}

export default NewsSeed;