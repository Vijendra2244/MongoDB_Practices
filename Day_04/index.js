const express = require("express");
const dotenv = require("dotenv");
const connectionToDB = require("./db");
dotenv.config();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const auth = require("./middleware/auth.middleware");
const { authorise } = require("./middleware/authorise.middleware");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Home Page Of RBAC");
});

app.get("/report",auth,(req,res)=>{
  res.send("You are on protected routes")
})

//customers
app.get("/products",auth, authorise(["customer"]) ,(req,res)=>{
  console.log(req.body)
  res.send("products")
})
//sellers
app.get("/salesdata",auth,authorise(["seller"]),(req,res)=>{
  res.send("salesData")
})

app.use("/users",userRouter)

app.listen(PORT, () => {
  try {
    connectionToDB
      .then((res) => console.log("Connected to db is success"))
      .catch((error) => console.log(error));
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
