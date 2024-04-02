import { getAllProducts } from "../service/user.service.js";

export const rotasProdutos = (app) => {
    app.get('/produtos', getAllProducts);
}