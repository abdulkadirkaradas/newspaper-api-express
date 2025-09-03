import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

class NotificationSeed extends Seeder {
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
        type: faker.word.sample(),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        isRead: faker.datatype.boolean(),
        userId: this.userId ?? faker.string.uuid()
      });
    }
  }
}

export default NotificationSeed;