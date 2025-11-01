import { ObjectId } from "mongodb";
import { adminId, regularId } from "./constants";

export const adminUserSeedData = {
  _id: new ObjectId(adminId),
  role: "admin",
  email: "admin@test.com",
  password: "adminpasswordhash",
  meta: {
    abc: 123,
  },
};

export const regularUserSeedData = {
  _id: new ObjectId(regularId),
  role: "user",
  email: "regular@test.com",
  password: "regularpasswordhash",
  meta: {
    abc: 123,
  },
};

export async function clearTestData() {
  try {
    await ModelUser.deleteMany({});
    await ModelToken.deleteMany({});
    // biome-ignore lint/suspicious/noConsole: on purpose
    console.log(
      "\x1b[32m%s\x1b[0m",
      "✓",
      "Test database cleared successfully.",
    );
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: on purpose
    console.error("Error clearing test database:", error);
    throw error; // Rethrow to fail test setup if clearing fails
  }
}

export async function seedTestData() {
  try {
    await ModelUser.create([adminUserSeedData, regularUserSeedData]);
    // biome-ignore lint/suspicious/noConsole: on purpose
    console.log("\x1b[32m%s\x1b[0m", "✓", "Test database seeded successfully.");
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: on purpose
    console.error("Error seeding test database:", error);
    if (error.code === 11000) {
      // biome-ignore lint/suspicious/noConsole: on purpose
      console.warn(
        "Duplicate key error during seeding. This might indicate an issue with clearing data or ObjectId reuse.",
      );
    }
    throw error;
  }
}
