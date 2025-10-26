import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

interface OppositeNews {
  sourceUserId: string;
  targetUserId: string;
  sourceNewsId: string;
  targetNewsId: string;
}

class OppositeNewsSeed extends Seeder {
  private ids: OppositeNews;

  constructor(count: number, idBag: OppositeNews) {
    super(count);
    this.count = count;
    this.ids = {
      sourceUserId: idBag.sourceUserId,
      targetUserId: idBag.targetUserId,
      sourceNewsId: idBag.sourceNewsId,
      targetNewsId: idBag.targetNewsId,
    };
    this.generate();
  }

  generate(): void {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        sourceUserId: this.ids.sourceUserId ?? faker.string.uuid(),
        targetUserId: this.ids.targetUserId ?? faker.string.uuid(),
        sourceNewsId: this.ids.sourceNewsId ?? faker.string.uuid(),
        targetNewsId: this.ids.targetNewsId ?? faker.string.uuid(),
        deleted: faker.datatype.boolean(),
      });
    }
  }
}

export default OppositeNewsSeed;
