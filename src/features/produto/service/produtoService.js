import { cadastrar, listar } from "../../../shared/services/crudService";

export const MAPPING_CONTROLLER_PRODUTO = "/api/produto";

export async function listarProdutos() { 
    return await listar(MAPPING_CONTROLLER_PRODUTO); 
}

export async function cadastrarProduto(produto) { 
    return await cadastrar(MAPPING_CONTROLLER_PRODUTO, produto); 
}