import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import { atualizar, buscarPorId, cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_CATEGORIA_PRODUTO } from "../../categoriaproduto/service/categoriaProdutoService";

export default function CategoriaProdutoForm() {

    const { idCategoria } = useParams();
    const [categoriaProduto, setCategoriaProduto] = useState({
        id: null,
        descricao: ""
    });

    useEffect(() => {

        if (idCategoria) {
            carregarCategorias();
        }

    }, [idCategoria]);

    async function carregarCategorias() {

        try {

            const data = await buscarPorId(
                MAPPING_CONTROLLER_CATEGORIA_PRODUTO,
                idCategoria
            );

            setCategoriaProduto({
                id: data.id,
                descricao: data.descricao ?? ""
            });

        } catch (erro) {
            toast.error("Erro ao carregar uma categoria de produto.");
        }
    }

    async function salvar() {
        
        try {

            if (idCategoria) {

                await atualizar(MAPPING_CONTROLLER_CATEGORIA_PRODUTO, categoriaProduto);
                toast.success("Categoria de produto alterada com sucesso!");

            } else {

                await cadastrar(MAPPING_CONTROLLER_CATEGORIA_PRODUTO, categoriaProduto);
                toast.success("Categoria de produto cadastrada com sucesso!");
            }

        } catch (erro) {
            toast.error("Erro ao salvar a categoria de produto.");
        }
    }

    return (

        <div>

            <Menu />

            <Breadcrumbs items={[
                { label: "Categoria de Produto" },
                { label: "Cadastrar" }
            ]} />

            <div style={{ marginTop: '40px', marginLeft: '10%', marginRight: '10%' }}>

                <div className="overflow-x-auto shadow-sm">

                    <div className="flex items-center justify-between mb-6" style={{marginTop: '20px', marginLeft: '10px', marginRight: '10px'}}>

                        <h1 className="text-3xl font-bold text-gray-800">
                            {idCategoria ? "Alterar Categoria de Produto" : "Nova Categoria de Produto"}
                        </h1>

                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{padding: '10px'}}>
                        <form>

                            <div className="card rounded-box grid grow p-8" style={{padding: '10px'}}>

                                <fieldset className="fieldset w-full">
                                    <label className="fieldset-legend" htmlFor="nome">Nome</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        className="input input-bordered w-full"
                                        value={categoriaProduto.descricao}
                                        onChange={(e) => 
                                            setCategoriaProduto({ ...categoriaProduto, descricao: e.target.value }) 
                                        }
                                    />
                                </fieldset>
                                
                            </div>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{padding: '10px'}}>

                                    <div style={{marginTop: '50px', textAlign: 'left'}}>
                                        <BackButton destino="/categoriaproduto" />
                                    </div>
                                    
                                </div>
                                <div className="card rounded-box grid grow p-8" style={{padding: '10px'}}>

                                    <div style={{marginTop: '50px', textAlign: 'right'}}>
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