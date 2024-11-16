-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispute" (
    "id" SERIAL NOT NULL,
    "user_1" INTEGER NOT NULL,
    "user_2" INTEGER NOT NULL,
    "text_1" TEXT NOT NULL,
    "text_1_confirm" BOOLEAN NOT NULL,
    "text_2" TEXT NOT NULL,
    "text_2_confirm" BOOLEAN NOT NULL,
    "decision" TEXT NOT NULL,
    "who_is_right" TEXT NOT NULL,

    CONSTRAINT "Dispute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);
