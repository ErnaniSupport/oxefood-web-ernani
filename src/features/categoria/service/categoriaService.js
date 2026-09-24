import { cadastrar, listar } from "../../../shared/services/crudService";

export const MAPPING_CONTROLLER_CATEGORIA = "/api/categoria";

export async function listarCategorias() {
    return await listar(MAPPING_CONTROLLER_CATEGORIA);
}

export async function cadastrarCategoria(categoria) {
    return await cadastrar(MAPPING_CONTROLLER_CATEGORIA, categoria);
}

