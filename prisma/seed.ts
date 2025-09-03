import * as bcrypt from "bcrypt";
import AnnouncementSeed from "./seeder/announcementSeed";
import BadgeSeed from "./seeder/badgeSeed";
import NewsCategorySeed from "./seeder/newsCategorySeed";
import NewsImageSeed from "./seeder/newsImageSeed";
import NewsReactionSeed from "./seeder/newsReactionSeed";
import NewsSeed from "./seeder/newsSeed";
import NotificationSeed from "./seeder/notificationSeed";
import OppositeNewsSeed from "./seeder/oppositeNewsSeed";
import UserBadgesSeed from "./seeder/userBadgesSeed";
import UserSeed from "./seeder/userSeed";
import WarningSeed from "./seeder/warningSeed";
import { prisma } from "../src/core/config/database";

const main = async () => {
  try {
    // 1. Roles
    await prisma.role.createMany({
      data: [
        { name: "Admin", type: "administrator" },
        { name: "Moderator", type: "moderator" },
        { name: "Writer", type: "writer" },
      ],
    });

    // 1.1 Admin User
    await prisma.user.create({
      data: {
        name: "Admin",
        lastname: "User",
        username: "admin",
        email: "admin@local.com",
        password: bcrypt.hashSync("12345678", 10),
        roleId: 1,
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
    // 4. News Categories
    const newsCategorySeeder = new NewsCategorySeed(3);
    await prisma.newsCategory.createMany({ data: newsCategorySeeder.data });
    const newsCategoryRecords: Array<{ id: string } & Record<string, any>> =
      await prisma.newsCategory.findMany();
    // 5. Announcements
    const announcementSeeder = new AnnouncementSeed(3);
    await prisma.announcement.createMany({ data: announcementSeeder.data });
    // 6. News (every user and category)
    let newsRecords: Array<{ id: string } & Record<string, any>> = [];
    for (const user of userRecords) {
      for (const category of newsCategoryRecords) {
        const newsSeeder = new NewsSeed(2, user.id, category.id);
        await prisma.news.createMany({ data: newsSeeder.data });
      }
    }
    newsRecords = await prisma.news.findMany();
    // 7. News Images (every user and news)
    for (const user of userRecords) {
      for (const news of newsRecords) {
        const newsImageSeeder = new NewsImageSeed(1, user.id, news.id);
        await prisma.newsImage.createMany({ data: newsImageSeeder.data });
      }
    }
    // 8. News Reactions (every user and news)
    for (const user of userRecords) {
      for (const news of newsRecords) {
        const newsReactionSeeder = new NewsReactionSeed(1, user.id, news.id);
        await prisma.newsReaction.createMany({ data: newsReactionSeeder.data });
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
    // 12. OppositeNews (example: first two users and first two news)
    if (userRecords.length >= 2 && newsRecords.length >= 2) {
      const oppositeNewsSeeder = new OppositeNewsSeed(1, {
        sourceUserId: userRecords[0].id,
        oppositeUserId: userRecords[1].id,
        sourceNewsId: newsRecords[0].id,
        oppositeNewsId: newsRecords[1].id,
      });
      await prisma.oppositeNews.createMany({ data: oppositeNewsSeeder.data });
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
