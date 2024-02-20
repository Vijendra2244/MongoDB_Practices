const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const PORT = process.env.PORT;
const app = express();

const client_id = process.env.CLIENT_ID;
const secret_key = process.env.SECRET_KEY;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// Github Oauth provider

app.get("/auth/github", async (req, res) => {
  const { code } = req.query;
  console.log(code);
  const accessToken = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: client_id,
        client_secret: secret_key,
        code,
      }),
    }
  ).then((res) => res.json());

  const user = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken.access_token}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
    console.log(user);
  res.send("You are here from github provider");
});


app.listen(PORT, () => {
  [console.log(`Server is listening on port ${PORT}`)];
});
