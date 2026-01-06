import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import Seeder from "./Seeder";
import { randomInt } from "crypto";

class UserSeed extends Seeder {
  constructor(count: number) {
    super(count);
    this.count = count;
    this.generate();
  }

  protected generate(): void {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: bcrypt.hashSync("12345678", 10),
        roleId: randomInt(2, 3),
      });
    }
  }
}

export default UserSeed;
