-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_encadrantId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "encadrantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_encadrantId_fkey" FOREIGN KEY ("encadrantId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
