import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

interface OppositePost {
  sourceUserId: string;
  targetUserId: string;
  sourcePostId: string;
  targetPostId: string;
}

class OppositePostSeed extends Seeder {
  private ids: OppositePost;

  constructor(count: number, idBag: OppositePost) {
    super(count);
    this.count = count;
    this.ids = {
      sourceUserId: idBag.sourceUserId,
      targetUserId: idBag.targetUserId,
      sourcePostId: idBag.sourcePostId,
      targetPostId: idBag.targetPostId,
    };
    this.generate();
  }

  generate(): void {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        sourceUserId: this.ids.sourceUserId ?? faker.string.uuid(),
        targetUserId: this.ids.targetUserId ?? faker.string.uuid(),
        sourcePostId: this.ids.sourcePostId ?? faker.string.uuid(),
        targetPostId: this.ids.targetPostId ?? faker.string.uuid(),
        deleted: faker.datatype.boolean(),
      });
    }
  }
}

export default OppositePostSeed;
