/*
  Warnings:

  - Added the required column `order` to the `Cardstacks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cardstacks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trash" BOOLEAN NOT NULL DEFAULT false,
    "boardId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Cardstacks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cardstacks_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Boards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cardstacks" ("authorId", "boardId", "createdAt", "id", "name", "trash") SELECT "authorId", "boardId", "createdAt", "id", "name", "trash" FROM "Cardstacks";
DROP TABLE "Cardstacks";
ALTER TABLE "new_Cardstacks" RENAME TO "Cardstacks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
