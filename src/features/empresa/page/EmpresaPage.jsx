import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";
import { buscarPorId, listar, remover} from "../../../shared/services/crudService";

import { MAPPING_CONTROLLER_EMPRESA } from "../service/empresaService";

export default function EmpresaPage() {
    const [lista, setLista] = useState([]);

    const [empresa, setEmpresa] = useState({
        id: null,
        site: "",
        cnpj: "",
        inscricaoEstadual: "",
        nomeEmpresarial: "",
        nomeFantasia: "",
        fone: "",
        foneAlternativo: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        try {
            const data = await listar(MAPPING_CONTROLLER_EMPRESA);
            setLista(data);
        } catch (erro) {
            console.error(erro);
            toast.error("Erro ao carregar empresas.");
        }
    }

    function editar(id) {
        navigate(`/empresa-form/${id}`);
    }

    async function confirmarRemover(id) {
        if (!confirm("Deseja realmente excluir esta empresa?")) {
            return;
        }

        try {
            await remover(MAPPING_CONTROLLER_EMPRESA, id);
            await carregar();

            toast.success("Empresa removida com sucesso!");
        } catch (erro) {
            console.error(erro);
            toast.error("Erro ao tentar remover a empresa.");
        }
    }

    async function detalhar(id) {
        try {
            const data = await buscarPorId(
                MAPPING_CONTROLLER_EMPRESA,
                id
            );

            setEmpresa({
                id: data.id,
                site: data.site ?? "",
                cnpj: data.cnpj ?? "",
                inscricaoEstadual: data.inscricaoEstadual ?? "",
                nomeEmpresarial: data.nomeEmpresarial ?? "",
                nomeFantasia: data.nomeFantasia ?? "",
                fone: data.fone ?? "",
                foneAlternativo: data.foneAlternativo ?? ""
            });

            document.getElementById("modal-detalhar").showModal();
        } catch (erro) {
            console.error(erro);
            toast.error("Erro ao carregar os dados da empresa.");
        }
    }

    return (
        <div>
            <Menu />

            <Breadcrumbs
                items={[
                    { label: "Empresa" },
                    { label: "Listar" }
                ]}
            />

            <div
                style={{
                    marginTop: "40px",
                    marginLeft: "10%",
                    marginRight: "10%"
                }}
            >
                <div className="overflow-x-auto shadow-sm">
                    <div
                        className="flex items-center justify-between mb-6"
                        style={{
                            marginTop: "20px",
                            marginLeft: "10px",
                            marginRight: "10px"
                        }}
                    >
                        <h1 className="text-3xl font-bold text-gray-800">
                            Empresas
                        </h1>

                        <NewButton destino="/empresa-form" />
                    </div>

                    <div className="divider divider-info" />

                    <div
                        className="overflow-x-auto"
                        style={{ marginTop: "30px" }}
                    >
                        <table className="table table-zebra">
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <th>Nome Empresarial</th>
                                    <th>Nome Fantasia</th>
                                    <th>CNPJ</th>
                                    <th>Inscrição Estadual</th>
                                    <th>Telefone</th>
                                    <th>Telefone Alternativo</th>
                                    <th>Site</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {lista.map((empresaItem) => (
                                    <tr key={empresaItem.id}>
                                        <td>
                                            {empresaItem.nomeEmpresarial}
                                        </td>

                                        <td>
                                            {empresaItem.nomeFantasia}
                                        </td>

                                        <td style={{ textAlign: "center" }}>
                                            {empresaItem.cnpj}
                                        </td>

                                        <td style={{ textAlign: "center" }}>
                                            {empresaItem.inscricaoEstadual}
                                        </td>

                                        <td style={{ textAlign: "center" }}>
                                            {empresaItem.fone}
                                        </td>

                                        <td style={{ textAlign: "center" }}>
                                            {empresaItem.foneAlternativo}
                                        </td>

                                        <td style={{ textAlign: "center" }}>
                                            {empresaItem.site}
                                        </td>

                                        <td style={{ textAlign: "center" }}>
                                            <CrudActions
                                                onDetail={() =>
                                                    detalhar(empresaItem.id)
                                                }
                                                onEdit={() =>
                                                    editar(empresaItem.id)
                                                }
                                                onDelete={() =>
                                                    confirmarRemover(empresaItem.id)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}

                                {lista.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            Nenhuma empresa cadastrada.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal de detalhes da empresa */}
            <dialog id="modal-detalhar" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Dados da Empresa
                    </h3>

                    <div className="divider" />

                    <p className="py-2">
                        <strong>Nome Empresarial:</strong>{" "}
                        {empresa.nomeEmpresarial}
                    </p>

                    <p className="py-2">
                        <strong>Nome Fantasia:</strong>{" "}
                        {empresa.nomeFantasia}
                    </p>

                    <p className="py-2">
                        <strong>CNPJ:</strong> {empresa.cnpj}
                    </p>

                    <p className="py-2">
                        <strong>Inscrição Estadual:</strong>{" "}
                        {empresa.inscricaoEstadual}
                    </p>

                    <p className="py-2">
                        <strong>Telefone:</strong> {empresa.fone}
                    </p>

                    <p className="py-2">
                        <strong>Telefone Alternativo:</strong>{" "}
                        {empresa.foneAlternativo}
                    </p>

                    <p className="py-2">
                        <strong>Site:</strong> {empresa.site}
                    </p>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <Footer />
        </div>
    );
}
