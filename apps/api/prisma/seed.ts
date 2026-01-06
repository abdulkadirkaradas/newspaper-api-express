import * as bcrypt from "bcrypt";
import AnnouncementSeed from "./seeder/announcementSeed";
import BadgeSeed from "./seeder/badgeSeed";
import PostCategorySeed from "./seeder/postCategorySeed";
import PostImageSeed from "./seeder/postImageSeed";
import PostReactionSeed from "./seeder/postReactionSeed";
import PostSeed from "./seeder/postSeed";
import NotificationSeed from "./seeder/notificationSeed";
import UserBadgesSeed from "./seeder/userBadgesSeed";
import UserSeed from "./seeder/userSeed";
import WarningSeed from "./seeder/warningSeed";
import { prisma } from "../src/core/config/database";
import { ROLE } from '../src/core/helper/constants/role.constants';

const main = async () => {
  try {
    // 1. Roles
    await prisma.role.createMany({
      data: [
        { name: "Admin", type: "administrator" },
        { name: "Moderator", type: "moderator" },
        { name: "Writer", type: "writer" },
      ],
      skipDuplicates: true,
    });

    // 1.1 Admin User
    await prisma.user.upsert({
      where: { email: "admin@local.com" },
      update: {},
      create: {
        name: "Admin",
        lastname: "User",
        username: "admin",
        email: "admin@local.com",
        password: bcrypt.hashSync("12345678", 10),
        roleId: ROLE.ADMIN,
      },
    });

    // 2. Users
    const userSeeder = new UserSeed(2);
    await prisma.user.createMany({ data: userSeeder.data });
    const userRecords: Array<{ id: string } & Record<string, any>> =
      await prisma.user.findMany();
    // 3. Badges
    const badgeSeeder = new BadgeSeed(5);
    await prisma.badge.createMany({ data: badgeSeeder.data });
    const badgeRecords: Array<{ id: string } & Record<string, any>> =
      await prisma.badge.findMany();
    // 4. Post Categories
    const postCategorySeeder = new PostCategorySeed(3);
    await prisma.postCategory.createMany({ data: postCategorySeeder.data });
    const postCategoryRecords: Array<{ id: string } & Record<string, any>> =
      await prisma.postCategory.findMany();
    // 5. Announcements
    const announcementSeeder = new AnnouncementSeed(3);
    await prisma.announcement.createMany({ data: announcementSeeder.data });
    // 6. Posts (every user and category)
    let postRecords: Array<{ id: string } & Record<string, any>> = [];
    for (const user of userRecords) {
      for (const category of postCategoryRecords) {
        const postSeeder = new PostSeed(1, user.id, category.id);
        await prisma.post.createMany({ data: postSeeder.data });
      }
    }
    postRecords = await prisma.post.findMany();
    // 7. Post Images (every user and post)
    for (const user of userRecords) {
      for (const post of postRecords) {
        const postImageSeeder = new PostImageSeed(1, user.id, post.id);
        await prisma.postImage.createMany({ data: postImageSeeder.data });
      }
    }
    // 8. Post Reactions (every user and post)
    for (const user of userRecords) {
      for (const post of postRecords) {
        const postReactionSeeder = new PostReactionSeed(1, user.id, post.id);
        await prisma.postReaction.createMany({
          data: postReactionSeeder.data,
          skipDuplicates: true,
        });
      }
    }
    // 9. Notifications (every user)
    for (const user of userRecords) {
      const notificationSeeder = new NotificationSeed(2, user.id);
      await prisma.notification.createMany({ data: notificationSeeder.data });
    }
    // 10. Warnings (every user)
    for (const user of userRecords) {
      const warningSeeder = new WarningSeed(1, user.id);
      await prisma.warning.createMany({ data: warningSeeder.data });
    }
    // 11. UserBadges (every user and badge)
    for (const user of userRecords) {
      for (const badge of badgeRecords) {
        const userBadgesSeeder = new UserBadgesSeed(1, user.id, badge.id);
        await prisma.userBadges.createMany({ data: userBadgesSeeder.data });
      }
    }
    console.log("Database has been seeded.");
  } catch (error) {
    console.error("Error occurred during seeding:", error);
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
