const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const predefinedServices = [
  { name: "Hair Styling", price: 500, category: "Hair" },
  { name: "Hair Coloring", price: 1500, category: "Hair" },
  { name: "Hair Smoothening", price: 3000, category: "Hair" },
  { name: "Keratin Treatment", price: 4000, category: "Hair" },
  { name: "Facial", price: 1000, category: "Skin" },
  { name: "Cleanup", price: 500, category: "Skin" },
  { name: "Waxing", price: 600, category: "Body" },
  { name: "Bleach", price: 300, category: "Skin" },
  { name: "Manicure", price: 400, category: "Nails" },
  { name: "Nail Care", price: 300, category: "Nails" },
  { name: "Nail Art", price: 800, category: "Nails" },
  { name: "Spa", price: 2000, category: "Body" },
  { name: "Makeup", price: 2500, category: "Makeup" },
  { name: "Beard Styling", price: 300, category: "Men" },
  { name: "Hair Spa", price: 1200, category: "Hair" },
  { name: "Hair Treatments", price: 1500, category: "Hair" },
  { name: "Laser Treatment", price: 5000, category: "Skin" }
];

async function main() {
  for (const srv of predefinedServices) {
    await prisma.service.create({
      data: {
        name: srv.name,
        price: srv.price,
        description: `${srv.name} service`,
        category: srv.category,
        duration: 30,
        isActive: true
      }
    });
  }
  console.log("Services seeded successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
