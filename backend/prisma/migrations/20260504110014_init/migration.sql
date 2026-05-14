-- CreateTable
CREATE TABLE "StockEvent" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "changePercent" TEXT NOT NULL,
    "eventType" TEXT,
    "explanation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockEvent_pkey" PRIMARY KEY ("id")
);
