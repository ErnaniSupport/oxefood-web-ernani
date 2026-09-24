import { useEffect, useState } from "react";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";
import { listar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_CATEGORIA } from "../service/categoriaService";

export default function CategoriaPage() {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        const data = await listar(MAPPING_CONTROLLER_CATEGORIA);
        setLista(data);
    }

    function editar(id) {
        console.log("Editar categoria:", id);
    }

    async function confirmarRemover(id) {
        if (confirm("Deseja realmente excluir esta categoria?")) {
            console.log("Remover categoria:", id);
        }
    }

    return (
        <div>
            <Menu />
            <Breadcrumbs items={[
                { label: "Categoria Produto" },
                { label: "Listar" }
            ]} />

            <div style={{ marginTop: "40px", marginLeft: "10%", marginRight: "10%" }}>
                <div className="overflow-x-auto shadow-sm">

                    <div
                        className="flex items-center justify-between mb-6"
                        style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
                    >
                        <h1 className="text-3xl font-bold text-gray-800">
                            Categorias de Produto
                        </h1>
                        <NewButton destino="/categoria-form" />
                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{ marginTop: "30px" }}>
                        <table className="table table-zebra">
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <th>ID</th>
                                    <th>Descrição</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {lista.map(categoria => (
                                    <tr key={categoria.id}>
                                        <td style={{ textAlign: "center" }}>
                                            {categoria.id}
                                        </td>
                                        <td>
                                            {categoria.descricao}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            <CrudActions
                                                onEdit={() => editar(categoria.id)}
                                                onDelete={() => confirmarRemover(categoria.id)}
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
