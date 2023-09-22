/*
  Warnings:

  - Added the required column `text` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trash" BOOLEAN NOT NULL DEFAULT false,
    "cardstackId" INTEGER NOT NULL,
    CONSTRAINT "Cards_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cards_cardstackId_fkey" FOREIGN KEY ("cardstackId") REFERENCES "Cardstacks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cards" ("authorId", "cardstackId", "createdAt", "id", "name", "trash") SELECT "authorId", "cardstackId", "createdAt", "id", "name", "trash" FROM "Cards";
DROP TABLE "Cards";
ALTER TABLE "new_Cards" RENAME TO "Cards";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
