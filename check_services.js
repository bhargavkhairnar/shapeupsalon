import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const services = await prisma.service.findMany();
  console.log("SERVICES COUNT:", services.length);
  console.log(services);
}
main();
