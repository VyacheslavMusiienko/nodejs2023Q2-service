/*
  Warnings:

  - The primary key for the `favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `favoritesId` on table `track_to_favorite` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "album_to_favorite" DROP CONSTRAINT "album_to_favorite_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "artist_to_favorite" DROP CONSTRAINT "artist_to_favorite_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "track_to_favorite" DROP CONSTRAINT "track_to_favorite_favoritesId_fkey";

-- AlterTable
ALTER TABLE "album_to_favorite" ALTER COLUMN "favoritesId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "artist_to_favorite" ALTER COLUMN "favoritesId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "favorites_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "track_to_favorite" ALTER COLUMN "favoritesId" SET NOT NULL,
ALTER COLUMN "favoritesId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "artist_to_favorite" ADD CONSTRAINT "artist_to_favorite_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "album_to_favorite" ADD CONSTRAINT "album_to_favorite_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track_to_favorite" ADD CONSTRAINT "track_to_favorite_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
