const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting data wipe...');

  // Delete all invoice items first due to foreign key constraints
  await prisma.invoiceItem.deleteMany({});
  console.log('Cleared InvoiceItems');

  // Delete all invoices
  await prisma.invoice.deleteMany({});
  console.log('Cleared Invoices');

  // Delete all appointments
  await prisma.appointment.deleteMany({});
  console.log('Cleared Appointments');

  // Delete all customers
  await prisma.customer.deleteMany({});
  console.log('Cleared Customers');

  console.log('Data wipe complete! Ready for production.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
