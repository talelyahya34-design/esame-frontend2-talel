import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import type { MovieListItem, SearchMoviesResponse } from "../types/movies";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=The%20Lord%20of%20the%20Rings&page=1`;

export function MovieListPage() {
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);

        if (!API_KEY) {
          throw new Error("Chiave VITE_TMDB_API_KEY non trovata in .env");
        }

        const response = await fetch(SEARCH_URL);
        if (!response.ok) {
          throw new Error(`Errore HTTP ${response.status} durante il caricamento`);
        }

        const data: SearchMoviesResponse = await response.json();
        if (active) {
          setMovies(data.results.slice(0, 20));
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Errore imprevisto");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <p className="status-text">Caricamento elenco film...</p>;
  }

  if (error) {
    return <p className="status-text error-text">{error}</p>;
  }

  return (
    <section className="list-page">
      <h1 className="page-title">Elenco Film</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}