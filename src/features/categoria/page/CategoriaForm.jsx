import { useState } from "react";
import { toast } from "react-toastify";
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import { cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_CATEGORIA } from "../service/categoriaService";

export default function CategoriaForm() {
    const [categoria, setCategoria] = useState({
        descricao: ""
    });

    async function salvar() {
        try {
            await cadastrar(MAPPING_CONTROLLER_CATEGORIA, categoria);
            toast.success("Categoria cadastrada com sucesso!");
            setCategoria({ descricao: "" });
        } catch (erro) {
            toast.error("Erro ao cadastrar categoria.");
        }
    }

    return (
        <div>
            <Menu />
            <Breadcrumbs items={[
                { label: "Categoria Produto" },
                { label: "Cadastrar" }
            ]} />

            <div style={{ marginTop: "40px", marginLeft: "10%", marginRight: "10%" }}>
                <div className="overflow-x-auto shadow-sm">

                    <div
                        className="flex items-center justify-between mb-6"
                        style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
                    >
                        <h1 className="text-3xl font-bold text-gray-800">
                            Nova Categoria
                        </h1>
                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{ padding: "30px" }}>
                        <form>

                            <div className="flex w-full">
                                <div className="card rounded-box grid grow p-8" style={{ padding: "30px" }}>
                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="descricao">
                                            Descrição
                                        </label>

                                        <input
                                            type="text"
                                            id="descricao"
                                            className="input input-bordered w-full"
                                            value={categoria.descricao}
                                            onChange={(e) =>
                                                setCategoria({
                                                    ...categoria,
                                                    descricao: e.target.value
                                                })
                                            }
                                        />
                                    </fieldset>
                                </div>
                            </div>

                            <div className="flex w-full">
                                <div className="card rounded-box grid grow p-8" style={{ padding: "30px" }}>
                                    <div style={{ marginTop: "50px", textAlign: "left" }}>
                                        <BackButton destino="/categoria" />
                                    </div>
                                </div>

                                <div className="card rounded-box grid grow p-8" style={{ padding: "30px" }}>
                                    <div style={{ marginTop: "50px", textAlign: "right" }}>
                                        <SaveButton save={() => salvar()} />
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

