import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/Api";
import './filme.css';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "eeac4c9a0f1c7fcd156702106b123192",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                    console.log(response.data);
                })
                .catch(() => {
                    console.log("Filme não encontrado");
                    navigate("/", { replace: true });
                });
        }
        
        loadFilme();

        return () => {
            console.log("COMPONENTE FOI DESMONTADO");
        };

    }, [navigate, id]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeFlix");
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const temFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

        if (temFilme) {
            alert("Esse filme já está na lista!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
        alert("Filme salvo com sucesso!");
    }

    if (loading) {
        return (
            <div className="loading-container">
                <svg className="loading-progress">
                    <circle r="40%" cx="50%" cy="50%" />
                    <circle r="40%" cx="50%" cy="50%" />
                </svg>
                <div className="loading-progress-text">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a 
                        href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;