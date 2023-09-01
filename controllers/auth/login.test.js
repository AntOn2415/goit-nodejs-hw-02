const express = require("express");
const request = require("supertest");
const ctrl = require("../auth");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const app = express();
app.post("/login", validateBody(schemas.loginSchema), ctrl.login);

describe("Login controller", () => {
  it("should return a 200 status code, token, and user object with email and subscription as strings", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "password" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
    expect(response.body).toHaveProperty("user");
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
