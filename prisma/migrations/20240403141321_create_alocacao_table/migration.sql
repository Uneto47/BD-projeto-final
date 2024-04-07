-- CreateTable
CREATE TABLE "alocacoes" (
    "id" UUID NOT NULL,
    "horario_id" UUID NOT NULL,
    "local_id" UUID NOT NULL,

    CONSTRAINT "pk_alocacoes" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alocacoes_horario_id_local_id_key" ON "alocacoes"("horario_id", "local_id");

-- AddForeignKey
ALTER TABLE "alocacoes" ADD CONSTRAINT "alocacoes_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alocacoes" ADD CONSTRAINT "alocacoes_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "locais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
