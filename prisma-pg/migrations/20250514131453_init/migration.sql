-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'guest',
    "tail" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Node" (
    "owner" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "prevId" TEXT,
    "nextId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Node_owner_trackId_key" ON "Node"("owner", "trackId");

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;
