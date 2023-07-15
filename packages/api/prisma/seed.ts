import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcypt from "bcrypt";

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

const defaultPassword = bcypt.hashSync("password", 10);
const users = [
  {
    email: "blog@demo.com",
    password: defaultPassword,
    firstName: "Blog",
    lastName: "Monocle",
  },
  {
    email: "crud@demo.com",
    password: defaultPassword,
    firstName: "Crud",
    lastName: "Monocle",
  },
  ...Array.from({ length: 2 }).map(() => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      email: faker.internet.email({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
      }),
      password: defaultPassword,
      firstName,
      lastName,
    };
  }),
];

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    prisma.user.deleteMany(),
    prisma.event.deleteMany(),
    prisma.metric.deleteMany(),
    prisma.dimension.deleteMany(),
  ]);

  await Promise.all([
    prisma.user.createMany({ data: [...users] }),
    prisma.event.createMany({ data: [...customEvents, ...mouseEvents] }),
    prisma.metric.createMany({ data: webVitalMetrics }),
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
