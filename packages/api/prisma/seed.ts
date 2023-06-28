import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const eventNames = [
    "Product added to cart",
    "Product removed from cart",
    "Product purchased",
    "Product reviewed",
  ];

  const events = Array.from({ length: 50 }).map(() => ({
    name: faker.helpers.arrayElement(eventNames),
    app: "react",
    userId: faker.string.uuid(),
    payload: {
      productId: faker.string.uuid(),
      productPrice: faker.commerce.price(),
    },
  }));

  const metricNames = [
    "Time to first paint",
    "Time to first contentful paint",
    "Time to first meaningful paint",
    "Time to interactive",
    "Total blocking time",
    "Cumulative layout shift",
  ];

  const metrics = Array.from({ length: 50 }).map(() => ({
    name: faker.helpers.arrayElement(metricNames),
    app: "react",
    userId: faker.string.uuid(),
    value: faker.number.int(3000),
  }));

  const userAgents = Array.from({ length: 50 }).map(() => ({
    name: "User-Agent",
    app: "react",
    userId: faker.string.uuid(),
    value: faker.internet.userAgent(),
  }));

  await Promise.all([
    prisma.event.createMany({
      data: events,
    }),
    prisma.metric.createMany({
      data: metrics,
    }),
    prisma.dimension.createMany({
      data: userAgents,
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
