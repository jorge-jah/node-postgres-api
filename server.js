import Fastify from "fastify";

const fastify = Fastify({
    logger: false,
})

const PORT = 3000;

fastify.get("/", (request, reply) => {
    reply.send({
        "code": 200,
        "status": "UPP",
        "message": "Server is OK!"
    });
});

// fastify.get("/produtos". produtosService.buscarProdutos);

fastify.listen({ port: PORT }, (err, address) => {
    if (err) throw err;
    console.log(`Server is now listening on machine IP: ${address}`);
  });