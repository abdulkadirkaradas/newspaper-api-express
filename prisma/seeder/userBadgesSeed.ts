import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

class UserBadgesSeed extends Seeder {
  private ids: { userId: string; badgeId: string };

  constructor(count: number, userId: string, badgeId: string) {
    super(count);
    this.count = count;
    this.ids = { userId, badgeId };
    this.generate();
  }

  generate(): void {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        userId: this.ids.userId ?? faker.string.uuid(),
        badgeId: this.ids.badgeId ?? faker.string.uuid(),
      });
    }
  }
}

export default UserBadgesSeed;