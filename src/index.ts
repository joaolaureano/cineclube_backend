import server from "./config/express";

server.get("/", (_, res) =>
  res.send({ message: "Server is running", status: "Status: Ok" })
);

const serverPort = 5000;

server.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});

export default server;
