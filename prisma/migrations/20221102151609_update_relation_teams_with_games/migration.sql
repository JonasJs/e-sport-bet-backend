-- CreateTable
CREATE TABLE "TeamsOnGames" (
    "teamId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "TeamsOnGames_pkey" PRIMARY KEY ("teamId","gameId")
);

-- AddForeignKey
ALTER TABLE "TeamsOnGames" ADD CONSTRAINT "TeamsOnGames_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamsOnGames" ADD CONSTRAINT "TeamsOnGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
