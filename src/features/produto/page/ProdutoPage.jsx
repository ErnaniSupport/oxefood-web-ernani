import { useEffect, useState } from "react";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";
import { listar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_PRODUTO } from "../service/produtoService";

export default function ProdutoPage() {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        const data = await listar(MAPPING_CONTROLLER_PRODUTO);
        setLista(data);
    }

    function editar(id) {
        console.log("Editar produto:", id);
    }

    async function confirmarRemover(id) {
        if (confirm("Deseja realmente excluir este produto?")) {
            console.log("Remover produto:", id);
        }
    }

    return (
        <div>
            <Menu />
            <Breadcrumbs items={[
                { label: "Produto" },
                { label: "Listar" }
            ]} />

            <div style={{ marginTop: "40px", marginLeft: "10%", marginRight: "10%" }}>
                <div className="overflow-x-auto shadow-sm">

                    <div
                        className="flex items-center justify-between mb-6"
                        style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
                    >
                        <h1 className="text-3xl font-bold text-gray-800">
                            Produtos
                        </h1>
                        <NewButton destino="/produto-form" />
                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{ marginTop: "30px" }}>
                        <table className="table table-zebra">
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <th>Código</th>
                                    <th>Título</th>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>Valor Unitário</th>
                                    <th>Tempo Mínimo</th>
                                    <th>Tempo Máximo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {lista.map(produto => (
                                    <tr key={produto.id}>
                                        <td style={{ textAlign: "center" }}>
                                            {produto.codigo}
                                        </td>
                                        <td>{produto.titulo}</td>
                                        <td>{produto.descricao}</td>
                                        <td style={{ textAlign: "center" }}>
                                            {produto.idCategoria}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            {produto.valorUnitario}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            {produto.tempoEntregaMinimo} min
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            {produto.tempoEntregaMaximo} min
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            <CrudActions
                                                onEdit={() => editar(produto.id)}
                                                onDelete={() => confirmarRemover(produto.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
}

