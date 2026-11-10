-- Slugs only need to be unique per host, so two users can both have "intro-call".

-- DropIndex
DROP INDEX "event_types_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "event_types_hostId_slug_key" ON "event_types"("hostId", "slug");
