-- CreateTable
CREATE TABLE "horarios" (
    "id" UUID NOT NULL,
    "hora_inicial" TIME NOT NULL,
    "hora_final" TIME,

    CONSTRAINT "pk_horarios" PRIMARY KEY ("id")
);
