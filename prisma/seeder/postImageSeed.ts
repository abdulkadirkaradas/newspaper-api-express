import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";

class PostImageSeed extends Seeder {
  private ids: { userId: string; postId: string };

  constructor(count: number, userId: string, postId: string) {
    super(count);
    this.count = count;
    this.ids = { userId, postId };
    this.generate();
  }

  protected generate(): void {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        name: faker.word.sample(),
        ext: faker.system.fileExt(),
        fullpath: faker.system.filePath(),
        userId: this.ids.userId ?? faker.string.uuid(),
        postId: this.ids.postId ?? faker.string.uuid(),
      });
    }
  }
}

export default PostImageSeed;
