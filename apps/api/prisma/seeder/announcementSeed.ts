import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";

import Seeder from "./Seeder";

class AnnouncementSeed extends Seeder {
  constructor(count: number) {
    super(count);
    this.count = count;
    this.generate();
  }

  protected generate(): void {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        title: faker.word.sample(),
        content: faker.lorem.paragraph(),
        priority: randomInt(1, 5),
      });
    }
  }
}

export default AnnouncementSeed;
