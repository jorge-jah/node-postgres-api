import { config } from "./config/index.js";

export const connection = async ()=> {
    try {
        // Método connect é o que tenta a conexão com o bd
        await config.connect();

        console.log('PostgreSQL conectado com sucesso.')
    } catch (err) {
        console.log('Erro ao conectar com o banco de dados.', err);
    }
}