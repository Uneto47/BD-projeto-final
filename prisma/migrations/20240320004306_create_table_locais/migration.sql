-- CreateTable
CREATE TABLE "locais" (
    "id" UUID NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "CEP" VARCHAR(8) NOT NULL,
    "logradouro" VARCHAR(50) NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" VARCHAR(25) NOT NULL,
    "cidade" VARCHAR(25) NOT NULL,
    "UF" VARCHAR(2) NOT NULL,

    CONSTRAINT "pk_locais" PRIMARY KEY ("id")
);
