import server from "./config/express";


server.get('/', (_, res) => res.send({ status: 'Status: Ok' }));

server.listen(3000, () => {
    console.log("Server port []");
})

export default server;