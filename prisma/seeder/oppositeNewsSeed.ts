import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

interface OppositeNews {
  sourceUserId: string;
  oppositeUserId: string;
  sourceNewsId: string;
  oppositeNewsId: string;
}

class OppositeNewsSeed extends Seeder {
  private ids: OppositeNews;

  constructor(count: number, idBag: OppositeNews) {
    super(count);
    this.count = count;
    this.ids = {
      sourceUserId: idBag.sourceUserId,
      oppositeUserId: idBag.oppositeUserId,
      sourceNewsId: idBag.sourceNewsId,
      oppositeNewsId: idBag.oppositeNewsId,
    };
    this.generate();
  }

  generate(): void {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        sourceUserId: this.ids.sourceUserId ?? faker.string.uuid(),
        oppositeUserId: this.ids.oppositeUserId ?? faker.string.uuid(),
        sourceNewsId: this.ids.sourceNewsId ?? faker.string.uuid(),
        oppositeNewsId: this.ids.oppositeNewsId ?? faker.string.uuid(),
        deleted: faker.datatype.boolean(),
      });
    }
  }
}

export default OppositeNewsSeed;
