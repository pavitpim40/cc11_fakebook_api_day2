require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const friendRouter = require("./routes/friendRoute");
const authenticate = require("./middlewares/authenticate");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.status(201).json({ message: "hello" });
});
app.use("/auth", authRouter);
app.use("/users", authenticate, userRouter);
app.use("/friends", authenticate, friendRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server running on port: " + port));
