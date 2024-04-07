-- DropForeignKey
ALTER TABLE "alocacoes" DROP CONSTRAINT "alocacoes_horario_id_fkey";

-- DropForeignKey
ALTER TABLE "alocacoes" DROP CONSTRAINT "alocacoes_local_id_fkey";

-- AddForeignKey
ALTER TABLE "alocacoes" ADD CONSTRAINT "alocacoes_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alocacoes" ADD CONSTRAINT "alocacoes_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "locais"("id") ON DELETE CASCADE ON UPDATE CASCADE;
