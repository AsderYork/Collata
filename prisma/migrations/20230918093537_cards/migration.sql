-- CreateTable
CREATE TABLE "Boards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trash" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Boards_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cardstacks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trash" BOOLEAN NOT NULL DEFAULT false,
    "boardId" INTEGER NOT NULL,
    CONSTRAINT "Cardstacks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cardstacks_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Boards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trash" BOOLEAN NOT NULL DEFAULT false,
    "cardstackId" INTEGER NOT NULL,
    CONSTRAINT "Cards_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cards_cardstackId_fkey" FOREIGN KEY ("cardstackId") REFERENCES "Cardstacks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
