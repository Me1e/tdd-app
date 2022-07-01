const request = require("supertest");
const app = require("../../server");
const newProduct = require("../data/new-product.json");

let firstProduct;

test("Post /api/products", async () => {
  const response = await request(app).post("/api/products").send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

test("should return 500 on POST /api/products", async () => {
  const respose = await request(app)
    .post("/api/products")
    .send({ name: "errrrror" });
  expect(respose.statusCode).toBe(500);
  expect(respose.body).toStrictEqual({
    message:
      "Product validation failed: description: Path `description` is required.",
  });
});

test("GET /api/products", async () => {
  const response = await request(app).get("/api/products");
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

test("GET /api/products/:productId", async () => {
  const response = await request(app).get("/api/products/" + firstProduct._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

test("GET id doenst exist /api/products/:productId", async () => {
  const response = await request(app).get(
    "/api/products/62bf1202755cc57297452404"
  );
  expect(response.statusCode).toBe(404);
});

test("PUT /api/products", async () => {
  const res = await request(app)
    .put("/api/products/" + firstProduct._id)
    .send({
      name: "updated ipad",
      description: "updated expensive",
    });
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("updated ipad");
  expect(res.body.description).toBe("updated expensive");
});

test("should return 404 on PUT /api/products", async () => {
  const res = await request(app)
    .put("/api/products" + "62bf1202755cc57297452404")
    .send({
      name: "updated ipad",
      description: "updated expensive",
    });
  expect(res.statusCode).toBe(404);
});

test("DELETE /api/products", async () => {
  const res = await request(app)
    .delete("/api/products/" + firstProduct._id)
    .send();
  expect(res.statusCode).toBe(200);
});

test("DELETE id doenst exist /api/products/:productId", async () => {
  const res = await request(app)
    .delete("/api/products/" + firstProduct._id)
    .send();
  expect(res.statusCode).toBe(404);
});
