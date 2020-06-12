const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const postRouter = require("./posts/post-router");
const welcomeRouter = require("./Welcome/welcome-router");
const deleterRouter = require("./Delete/delete-router");
const putRouter = require("./Put/put-router");
const morgan = require("morgan");
const server = express();
const port = 9090;

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("combined"));
server.use(postRouter);
server.use(welcomeRouter);
server.use(deleterRouter);
server.use(putRouter);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
