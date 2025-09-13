import { useEffect, useState } from "react";
import api from '../../services/Api';
import { Link } from "react-router-dom";
import './home.css';


function Home() {
	const [filmes, setFilmes] = useState([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {

		async function loadFilme() {
			const response = await api.get("movie/now_playing",
				{
					params: {
						api_key: " Minha Api Key aqui",
						language: "pt-BR",
						page: 1,
					}
				});

			// console.log(response.data.results);
			//armazenar a saida de response.data.results em setFilmes
			setFilmes(response.data.results);
			setLoading(false);
		}


		loadFilme();

	});


if (loading) {
  return (
    <div className="loading-container">
      <svg className="loading-progress">
        <circle r="40%" cx="50%" cy="50%" />
        <circle r="40%" cx="50%" cy="50%" />
      </svg>
      <div className="loading-progress-text">Carregando...</div>
    </div>
  )
}


	// body... 
	return (
		<div className="container">
			<div className="lista-filmes">
				{filmes.map((filme) => {
					return (
						<article key={filme.id}>
							<strong>{filme.title}</strong>
							<img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
							<Link to={`/filme/${filme.id}`}>Acessar </Link>
						</article>
					)
				})}
			</div>

		</div>
	)
}

export default Home;