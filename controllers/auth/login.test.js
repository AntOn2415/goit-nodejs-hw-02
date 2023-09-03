const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

const { DB_HOST } = process.env;

beforeAll(async () => {
  await mongoose.connect(DB_HOST);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Login Controller", () => {
  it("should return a 200 status login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" });
    console.log(response.body);
    expect(response.status).toBe(200);
  });
  it("should return a token as a string", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" });

    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });
  it("should return a user object with email as a string", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" });

    expect(response.body).toHaveProperty("user");
    expect(typeof response.body.user.email).toBe("string");
  });

  it("should return a user object with subscription as a string", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" });

    expect(response.body).toHaveProperty("user");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});

// const express = require("express");
// const request = require("supertest");
// const { auth: ctrl } = require("../../controllers");
// const { validateBody } = require("../../middlewares");
// const { schemas } = require("../../models/user");

// const app = express();

// app.post("/login", validateBody(schemas.loginSchema), ctrl.login);

/* eslint-disable */
// let server;

// beforeAll(() => {
//   server = app.listen(3000);
// });

// afterAll(done => {
//   server.close(done);
// });

// describe("Login controller", () => {
//   it("should return a 200 status code", async () => {
//     const response = await request(app)
//       .post("/login")
//       .send({ email: "test@example.com", password: "password" });
//     console.log(ctrl.login);
//     console.log(response.body);
//     expect(response.status).toBe(200);
//   });

// it("should return a token as a string", async () => {
//   const response = await request(app)
//     .post("/api/auth/login")
//     .send({ email: "test@example.com", password: "password" });

//   expect(response.body).toHaveProperty("token");
//   expect(typeof response.body.token).toBe("string");
// });

// it("should return a user object with email as a string", async () => {
//   const response = await request(app)
//     .post("/api/auth/login")
//     .send({ email: "test@example.com", password: "password" });

//   expect(response.body).toHaveProperty("user");
//   expect(typeof response.body.user.email).toBe("string");
// });

// it("should return a user object with subscription as a string", async () => {
//   const response = await request(app)
//     .post("/api/auth/login")
//     .send({ email: "test@example.com", password: "password" });

//   expect(response.body).toHaveProperty("user");
//   expect(typeof response.body.user.subscription).toBe("string");
// });
// });

// describe("Login controller", () => {
//   it("should return a 200 status code, token, and user object with email and subscription as strings", async () => {
//     const response = await request(app)
//       .post("/api/auth/login")
//       .send({ email: "test@example.com", password: "password" });
//     console.log(ctrl.login);
//     console.log(response.body);
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("token");
//     expect(typeof response.body.token).toBe("string");
//     expect(response.body).toHaveProperty("user");
//     expect(typeof response.body.user.email).toBe("string");
//     expect(typeof response.body.user.subscription).toBe("string");
//   });
// });

// const { auth: ctrl } = require("../../controllers");

// describe("Login controller", () => {
//   test("Login test", async () => {
//     const mReq = {
//       body: { email: "test@example.com", password: "password" },
//     };
//     const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
//     await ctrl.login(mReq, mRes);
//     expect(mRes.status).toBeCalledWith(200);
//     expect(mRes.token).toEqual(expect.anything());
//     expect(mRes.user.email).toEqual(expect.not.stringContaining(expected));
//     expect(mRes.send.user.password).toEqual(expect.not.stringContaining(expected));
//   });
// });
