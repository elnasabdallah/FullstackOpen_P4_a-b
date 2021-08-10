const app = require("./app"); // the actual Express application
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

// const server = http.createServer(app);
// app.get("/", (req, res) => res.send("Hello World!"));
app.listen(3001, () => console.log("Example app listening on port 3001!"));
