import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";
import { randomInt } from "crypto";

class WarningSeed extends Seeder {
  private userId: string;

  constructor(count: number, userId: string) {
    super(count);
    this.count = count;
    this.userId = userId;
    this.generate();
  }

  protected generate(): void {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        content: faker.lorem.paragraph(),
        reason: faker.lorem.sentence(),
        warningLevel: randomInt(1, 5),
        userId: this.userId ?? faker.string.uuid(),
        deleted: faker.datatype.boolean(),
      });
    }
  }
}

export default WarningSeed;
