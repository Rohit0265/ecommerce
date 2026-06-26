import { PrismaClient } from "@repo/product-db";

const prisma = new PrismaClient();

async function main() {
  try {
    const product = await prisma.product.create({
      data: {
        name: "Test",
        shortDescription: "test",
        description: "test",
        price: 10,
        categorySlug: "test",
        sizes: ["m"],
        colors: ["blue"],
        images: { blue: "test" },
      },
    });
    console.log("Success:", product);
  } catch (err) {
    console.error("Prisma error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
