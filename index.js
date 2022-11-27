const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b8vg83y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const categoriesCollection = client.db("pacificpickDB").collection("categories");
    const bikeslistCollection = client.db("pacificpickDB").collection("bikeslist");
    const bookingsCollection = client.db("pacificpickDB").collection("bookings");
    const addedproductsCollection = client.db("pacificpickDB").collection("addedproducts");
    const usersCollections = client.db("pacificpickDB").collection("users");
    const advertiseCollections = client.db("pacificpickDB").collection("advertiseproducts");

    app.get("/bikescategoris", async (req, res) => {
      const query = {};
      const result = await categoriesCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/bikeslist", async (req, res) => {
      const query = {};
      const bikes = await bikeslistCollection.find(query).toArray();
      res.send(bikes);
    });

    app.get("/bikeslist/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await bikeslistCollection.findOne(filter);
      res.send(result);
    });

    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    });

    app.get("/bookings", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await bookingsCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/addedproducts", async (req, res) => {
      const added = req.body;
      const result = await addedproductsCollection.insertOne(added);
      res.send(result);
    });

    app.get("/addedproducts", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await addedproductsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await bookingsCollection.findOne(filter);
      res.send(result);
    });

    app.post("/advertiseproduct", async (req, res) => {
      const advertise = req.body;
      const result = await advertiseCollections.insertOne(advertise);
      res.send(result);
    });

    app.get("/advertiseproduct", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await advertiseCollections.find(query).toArray();
      res.send(result);
    });

    app.delete("/advertiseproduct/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await advertiseCollections.deleteOne(filter);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollections.insertOne(user);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Pacific Pick server is Running");
});
app.listen(port, () => {
  console.log(`Pacific Pick is running on Port : ${port}`);
});
