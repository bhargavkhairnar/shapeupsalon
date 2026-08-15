import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.setting.upsert({
    where: { key: 'salonAddress' },
    update: { value: 'Takala, to, Rajarampuri Main Rd, near old Siddhivinayak hospital, Kolhapur, Maharashtra 416013' },
    create: { key: 'salonAddress', value: 'Takala, to, Rajarampuri Main Rd, near old Siddhivinayak hospital, Kolhapur, Maharashtra 416013' },
  });
  console.log('Address updated in database successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
