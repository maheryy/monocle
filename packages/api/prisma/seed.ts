import { PrismaClient } from "@prisma/client";
import { faker, he } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    prisma.event.deleteMany({}),
    prisma.metric.deleteMany({}),
    prisma.dimension.deleteMany({}),
  ]);

  const eventNames = [
    "Product added to cart",
    "Product removed from cart",
    "Product purchased",
    "Product reviewed",
  ];

  const customEvents = Array.from({ length: 50 }).map(() => ({
    name: faker.helpers.arrayElement(eventNames),
    app: "react",
    userId: faker.string.uuid(),
    payload: {
      productId: faker.string.uuid(),
      productPrice: faker.commerce.price(),
    },
  }));

  const mouseEvents = Array.from({ length: 25 }).map(() => {
    const width = 1920;
    const height = 1080;

    const length = faker.number.int({ min: 1, max: 1000 });

    const mousePositions = Array.from({ length }).map((_, index) => ({
      clientX: faker.number.int({ min: 0, max: width }),
      clientY: faker.number.int({ min: 0, max: height }),
      pageX: faker.number.int({ min: 0, max: width }),
      pageY: faker.number.int({ min: 0, max: height }),
      timeStamp: index * 100,
    }));

    return {
      name: "mouse",
      app: "react",
      userId: faker.string.uuid(),
      payload: {
        mousePositions,
        page: faker.internet.url(),
      },
    };
  });

  const webVitals = {
    CLS: [0, 0.5, "float"] as const,
    LCP: [0, 8000, "int"] as const,
    FID: [0, 600, "int"] as const,
    FCP: [0, 6000, "int"] as const,
    TTFB: [0, 2600, "int"] as const,
    INP: [0, 1000, "int"] as const,
  };

  const webVitalMetrics = Array.from({ length: 50 }).map(() => {
    const [name, value] = faker.helpers.objectEntry(webVitals);
    const [min, max, kind] = value;

    return {
      name,
      app: "react",
      userId: faker.string.uuid(),
      value: faker.number[kind]({ min, max }),
    };
  });

  const userAgentDimensions = Array.from({ length: 50 }).map(() => ({
    name: "user-agent",
    app: "react",
    userId: faker.string.uuid(),
    value: faker.internet.userAgent(),
  }));

  const pageViewDimensions = Array.from({ length: 50 }).map(() => ({
    name: "page-view",
    app: "react",
    userId: faker.string.uuid(),
    value: faker.internet.url(),
  }));

  await Promise.all([
    prisma.event.createMany({
      data: [...customEvents, ...mouseEvents],
    }),
    prisma.metric.createMany({
      data: webVitalMetrics,
    }),
    prisma.dimension.createMany({
      data: [...userAgentDimensions, ...pageViewDimensions],
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
