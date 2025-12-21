import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

class NewsReactionSeed extends Seeder {
  private ids: { userId: string; newsId: string };

  constructor(count: number, userId: string, newsId: string) {
    super(count);
    this.count = count;
    this.ids = { userId, newsId };
    this.generate();
  }

  protected generate(): void {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        value: faker.number.int({ min: -1, max: 1 }),
        userId: this.ids.userId ?? faker.string.uuid(),
        newsId: this.ids.newsId ?? faker.string.uuid(),
      });
    }
  }
}

export default NewsReactionSeed;
