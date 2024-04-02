import Fastify from "fastify";
import cors from '@fastify/cors';
import { connection } from "./db/db.js";
import { config } from "./db/config/index.js";

const app = Fastify({
    logger: false,
})

const PORT = 3000;
const HOST = '127.0.0.1';

app.register(cors, {
    origin: '*',
})

connection();

app.get("/", (req, res) => {
    res.send({
        "code": 200,
        "status": "UP",
        "message": "Server is OK!"
    });
});

app.get('/produtos', async (req, res) => {
    const result = await config.query('SELECT * FROM produtos');
    return result.rows;
})

app.get('/produto/:id', async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM produtos WHERE id = ${id}`
    console.log(`[QUERY]: ${query}`);
    const result = await config.query(query);

    if (result.rows.length === 0) {
        res.status(404).send(`Produto com id: ${id} não encontrado!`);
        return result.rows;

    }

    res.status(200).send(result.rows);
})

// fastify.get("/produtos". produtosService.buscarProdutos);

app.post('/produto', async (req, res) => {
    const { nome, descricao, desconto, preco, ativo, categoria, data_cadastro } = req.body;

    try {
        const query = 'INSERT INTO produtos (nome, descricao, desconto, preco, ativo, categoria, data_cadastro) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [nome, descricao, desconto, preco, ativo, categoria, data_cadastro];
        const result = await config.query(query, values);
        res.send(result.rows[0]);
    } catch (err) {
        console.log('Erro ao inserir produto', err);
        res.status(500).send('Erro ao inserir produto');
    }
})

app.put('/produto/:id', async (req, res) => {
    // const { nome, descricao, desconto, preco, ativo, categoria, data_cadastro } = req.body;
    const id = req.params.id;
    const query = `SELECT * FROM produtos WHERE id = ${id}`;
    console.log(`[QUERY]: ${query}`);
    const result1 = await config.query(query);
    if (result1.rows.length === 0) {
        res.status(404).send(`Produto com id: ${id} não encontrado!`);
        return result1.rows;
    } else {
        const queryUpdate =
            `UPDATE produtos
        SET desconto = '1.00'
        WHERE id = ${id}`;
        // const values = [nome, descricao, desconto, preco, ativo, categoria, data_cadastro];
        const newResult = await config.query(queryUpdate);
        // const newResult = await config.query(queryUpdate, values);
        res.status(200).send(`Produto com id ${id} alterado com sucesso!`);
        return newResult.rows;
    }

});

app.delete("/produto/:id", async (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM produtos WHERE id = ${id}`
    console.log(`[QUERY]: ${query}`);
    const result = await config.query(query);
    id.splice;
    res.status(200).send(`Produto com id: ${id} removido com sucesso!`)
    return result;
})

app.listen({  /* host: 'localhost', */ port: PORT }, (err, address) => {
    if (err) throw err;
    app.log.info(`Server listening on ${address}`)
    console.log(`Server is now listening on machine IP: ${address}`);
});