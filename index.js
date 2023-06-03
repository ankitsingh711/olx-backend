const express = require("express");
const app = express();
const { connection } = require("./config/db");
const { UserRouter } = require("./router/UserRouter");
const cors = require("cors");
const { ProductRouter } = require("./router/ProductsRouter");

// Middlewars Used

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/user", UserRouter);
app.use("/product", ProductRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("DB Connected");
    console.log(`App is running on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
