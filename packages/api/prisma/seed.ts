import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcypt from "bcrypt";
import {
  generatePublicKey,
  generateSecretKey,
} from "../src/credential/credential.service";

const DEFAULT_APP_ID = "MCL-AZ209DSD";
const DEFAULT_APP_SECRET = "mcl_ksl6yyvp8k3myppbyfkxxucwb0l4r1qg";

const eventNames = [
  "Product added to cart",
  "Product removed from cart",
  "Product purchased",
  "Product reviewed",
];

const customEvents = Array.from({ length: 25 }).map(() => ({
  name: faker.helpers.arrayElement(eventNames),
  app: "react",
  appId: DEFAULT_APP_ID,
  visitorId: faker.string.uuid(),
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
    appId: DEFAULT_APP_ID,
    visitorId: faker.string.uuid(),
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

const webVitalMetrics = Array.from({ length: 25 }).map(() => {
  const [name, value] = faker.helpers.objectEntry(webVitals);
  const [min, max, kind] = value;

  return {
    name,
    app: "react",
    appId: DEFAULT_APP_ID,
    visitorId: faker.string.uuid(),
    value: faker.number[kind]({ min, max }),
  };
});

const userAgentDimensions = Array.from({ length: 25 }).map(() => ({
  name: "user-agent",
  app: "react",
  appId: DEFAULT_APP_ID,
  visitorId: faker.string.uuid(),
  value: faker.internet.userAgent(),
}));

const pageViewDimensions = Array.from({ length: 25 }).map(() => ({
  name: "page-view",
  app: "react",
  appId: DEFAULT_APP_ID,
  visitorId: faker.string.uuid(),
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
  await prisma.$transaction([
    prisma.event.deleteMany(),
    prisma.metric.deleteMany(),
    prisma.dimension.deleteMany(),
    prisma.credential.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  await prisma.$transaction([
    prisma.user.createMany({ data: [...users] }),
    prisma.event.createMany({ data: [...customEvents, ...mouseEvents] }),
    prisma.metric.createMany({ data: webVitalMetrics }),
    prisma.dimension.createMany({
      data: [...userAgentDimensions, ...pageViewDimensions],
    }),
  ]);

  await prisma.$transaction(async (tx) => {
    const createdUsers = await tx.user.findMany();
    if (!createdUsers.length) return;

    const usedKeys: string[] = [DEFAULT_APP_ID, DEFAULT_APP_SECRET];
    const credentials: Prisma.CredentialCreateManyInput[] = createdUsers.map(
      (user) => {
        let secretKey: string, publicKey: string;

        do {
          secretKey = generateSecretKey();
        } while (usedKeys.includes(secretKey));

        do {
          publicKey = generatePublicKey();
        } while (usedKeys.includes(publicKey));

        // assign default app id to blog user
        if (user.email === users[0].email) {
          publicKey = DEFAULT_APP_ID;
          secretKey = DEFAULT_APP_SECRET;
        } else {
          usedKeys.push(secretKey, publicKey);
        }

        return {
          userId: user.id,
          secretKey: secretKey,
          publicKey: publicKey,
        };
      }
    );

    const profiles: Prisma.ProfileCreateManyInput[] = createdUsers.map(
      (user) => ({
        userId: user.id,
        website: "http://localhost:8080",
        company: faker.company.name(),
        kbis: faker.string.uuid(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
      })
    );

    return await Promise.all([
      tx.credential.createMany({ data: credentials }),
      tx.profile.createMany({ data: profiles }),
    ]);
  });

  console.log("Seeding completed");
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
