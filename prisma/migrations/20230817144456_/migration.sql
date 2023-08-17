/*
  Warnings:

  - A unique constraint covering the columns `[artist_id]` on the table `albums` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[artist_id]` on the table `tracks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[album_id]` on the table `tracks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "albums_artist_id_key" ON "albums"("artist_id");

-- CreateIndex
CREATE UNIQUE INDEX "tracks_artist_id_key" ON "tracks"("artist_id");

-- CreateIndex
CREATE UNIQUE INDEX "tracks_album_id_key" ON "tracks"("album_id");
