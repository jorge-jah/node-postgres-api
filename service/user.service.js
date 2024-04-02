import { connection } from "../db/db.js";

const getAllProducts = async () => {
    const query = 'SELECT * FROM produtos';
    const { rows } = await connection.query(query);
    return rows[0];
};

export { getAllProducts };