/*
  Warnings:

  - You are about to drop the column `ext` on the `Badge` table. All the data in the column will be lost.
  - You are about to drop the column `fullpath` on the `Badge` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Badge` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewsCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewsImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewsReaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OppositeNews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `url` to the `Badge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_userId_fkey";

-- DropForeignKey
ALTER TABLE "NewsImage" DROP CONSTRAINT "NewsImage_newsId_fkey";

-- DropForeignKey
ALTER TABLE "NewsImage" DROP CONSTRAINT "NewsImage_userId_fkey";

-- DropForeignKey
ALTER TABLE "NewsReaction" DROP CONSTRAINT "NewsReaction_newsId_fkey";

-- DropForeignKey
ALTER TABLE "NewsReaction" DROP CONSTRAINT "NewsReaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "OppositeNews" DROP CONSTRAINT "OppositeNews_oppositeNewsId_fkey";

-- DropForeignKey
ALTER TABLE "OppositeNews" DROP CONSTRAINT "OppositeNews_oppositeUserId_fkey";

-- DropForeignKey
ALTER TABLE "OppositeNews" DROP CONSTRAINT "OppositeNews_sourceNewsId_fkey";

-- DropForeignKey
ALTER TABLE "OppositeNews" DROP CONSTRAINT "OppositeNews_sourceUserId_fkey";

-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "ext",
DROP COLUMN "fullpath",
DROP COLUMN "type",
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "type",
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 3,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "emailVerifiedAt" DROP NOT NULL,
ALTER COLUMN "emailVerifiedAt" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "UserBadges" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Warning" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ(3);

-- DropTable
DROP TABLE "News";

-- DropTable
DROP TABLE "NewsCategory";

-- DropTable
DROP TABLE "NewsImage";

-- DropTable
DROP TABLE "NewsReaction";

-- DropTable
DROP TABLE "OppositeNews";

-- CreateTable
CREATE TABLE "PostCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "visibility" BOOLEAN NOT NULL DEFAULT false,
    "approvedBy" TEXT NOT NULL DEFAULT '',
    "removedBy" TEXT NOT NULL DEFAULT '',
    "opposedToId" TEXT,
    "authorId" TEXT NOT NULL,
    "categoryId" TEXT,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostImage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fullpath" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostReaction" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "PostReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_opposedToId_idx" ON "Post"("opposedToId");

-- CreateIndex
CREATE INDEX "PostReaction_postId_idx" ON "PostReaction"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "PostReaction_postId_authorId_key" ON "PostReaction"("postId", "authorId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_opposedToId_fkey" FOREIGN KEY ("opposedToId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PostCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReaction" ADD CONSTRAINT "PostReaction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReaction" ADD CONSTRAINT "PostReaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
