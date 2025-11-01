let validRefreshToken: Cookie;
let validAccessToken: Cookie;

const registrationValidationError = {
  url: "/registration",
  statusCode: 400,
  statusMessage: "Validation Error",
  message: "Validation Error",
};

const accessAndRefreshToBeDefined = (response: FetchResponse<any>) => {
  const setCookie = extractSetCookie(response.headers);
  const refreshTokenObj = setCookie.find(
    (cookie) => cookie.name === "refreshToken",
  );
  const accessTokenObj = setCookie.find(
    (cookie) => cookie.name === "accessToken",
  );
  expect(refreshTokenObj).toBeDefined();
  expect(accessTokenObj).toBeDefined();
};

describe.sequential("Authorization", () => {
  const uniqId = uuidv4().split("-")[0];
  const email = `test+${uniqId}@test.com`;
  const password = "test1234";
  const firstName = "Eugen";
  const lastName = "Guriev";
  const meta = { firstName, lastName };

  describe("POST /registration", () => {
    it("gets 400 on validation errors", async () => {
      await $fetch("/registration", {
        baseURL: "http://localhost:3000",
        method: "POST",
        ignoreResponseError: true,
        headers: { Accept: "application/json" },
        body: { email: "1", password: "1", confirmation: "2", meta },
        onResponse: ({ response }) => {
          expect(response.status).toBe(400);
          expect(response._data).toMatchObject({
            ...registrationValidationError,
            data: [
              {
                origin: "string",
                code: "invalid_format",
                format: "email",
                pattern:
                  "/^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$/",
                path: ["email"],
                message: "Invalid email address",
              },
              {
                origin: "string",
                code: "too_small",
                minimum: 8,
                inclusive: true,
                path: ["password"],
                message: "Too small: expected string to have >=8 characters",
              },
              {
                origin: "string",
                code: "too_small",
                minimum: 8,
                inclusive: true,
                path: ["confirmation"],
                message: "Too small: expected string to have >=8 characters",
              },
              {
                code: "custom",
                path: ["confirmation"],
                message: "Passwords do not match!",
              },
            ],
          });
        },
      });
    });
    it("gets 400 on invalid credentials", async () => {
      await $fetch("/registration", {
        baseURL: "http://localhost:3000",
        method: "POST",
        headers: { Accept: "application/json" },
        ignoreResponseError: true,
        body: { email, password, confirmation: "bullshit", meta },
        onResponse: ({ response }) => {
          expect(response.status).toBe(400);
          expect(response._data).toMatchObject({
            ...registrationValidationError,
            data: [
              {
                code: "custom",
                message: "Passwords do not match!",
                path: ["confirmation"],
              },
            ],
          });
        },
      });
    });
    it("gets 200 on valid credentials", async () => {
      await $fetch("/registration", {
        baseURL: "http://localhost:3000",
        method: "POST",
        ignoreResponseError: true,
        headers: { Accept: "application/json" },
        body: { email, password, confirmation: password, meta },
        onResponse: ({ response }) => {
          expect(response.status).toBe(200);
          expect(response._data._id).toBeDefined();
          accessAndRefreshToBeDefined(response);
        },
      });
    });
    it("gets 409 on email already exist", async () => {
      await $fetch("/registration", {
        baseURL: "http://localhost:3000",
        method: "POST",
        headers: { Accept: "application/json" },
        ignoreResponseError: true,
        body: { email, password, confirmation: password, meta },
        onResponse: ({ response }) => {
          expect(response.status).toBe(409);
          expect(response._data).toMatchObject({
            message: "User already exists!",
          });
        },
      });
    });
  });

  describe("POST /login", () => {
    it("gets 400 on validation errors", async () => {
      await $fetch("/login", {
        baseURL: "http://localhost:3000",
        method: "POST",
        headers: { Accept: "application/json" },
        ignoreResponseError: true,
        body: { email: "1", password: "2" },
        onResponse: ({ response }) => {
          expect(response.status).toBe(400);
          expect(response._data).toMatchObject({
            url: "/login",
            statusCode: 400,
            statusMessage: "Validation Error",
            message: "Validation Error",
            data: [
              {
                code: "invalid_format",
                message: "Invalid email address",
                path: ["email"],
              },
              {
                code: "too_small",
                inclusive: true,
                message: "Too small: expected string to have >=8 characters",
                minimum: 8,
                path: ["password"],
              },
            ],
          });
        },
      });
    });

    it("gets 403 on invalid credentials", async () => {
      await $fetch("/login", {
        baseURL: "http://localhost:3000",
        method: "POST",
        headers: { Accept: "application/json" },
        ignoreResponseError: true,
        body: { email: "wrong@email.com", password: "test1234" },
        onResponse: ({ response }) => {
          expect(response.status).toBe(403);
          expect(response._data).toMatchObject({
            message: "Wrong password or email!",
          });
        },
      });
    });

    it("gets 200 on valid credentials", async () => {
      await $fetch("/login", {
        baseURL: "http://localhost:3000",
        method: "POST",
        headers: { Accept: "application/json" },
        body: { email, password },
        onResponse: ({ response }) => {
          expect(response.status).toBe(200);
          const setCookie = extractSetCookie(response.headers);
          const refreshTokenObj = setCookie.find(
            (cookie) => cookie.name === "refreshToken",
          );
          const accessTokenObj = setCookie.find(
            (cookie) => cookie.name === "accessToken",
          );
          validRefreshToken = refreshTokenObj!;
          validAccessToken = accessTokenObj!;
          expect(refreshTokenObj).toBeDefined();
          expect(accessTokenObj).toBeDefined();
        },
      });
    });
  });
});
