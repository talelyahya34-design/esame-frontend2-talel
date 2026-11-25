import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { MovieDetail } from "../types/movies";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadMovieDetail() {
      try {
        setLoading(true);
        setError(null);

        if (!API_KEY) {
          throw new Error("Chiave VITE_TMDB_API_KEY non trovata in .env");
        }

        if (!id) {
          throw new Error("ID film non valido");
        }

        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Errore HTTP ${response.status} durante il caricamento del dettaglio`);
        }

        const data: MovieDetail = await response.json();
        if (active) {
          setMovie(data);
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

    loadMovieDetail();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <p className="status-text">Caricamento dettaglio film...</p>;
  }

  if (error) {
    return (
      <div className="detail-page">
        <p className="status-text error-text">{error}</p>
        <Link to="/" className="detail-btn">
          Torna all'elenco
        </Link>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <section className="detail-page">
      <div className="detail-layout">
        <div className="detail-poster">
          {movie.poster_path ? (
            <img src={`${POSTER_BASE_URL}${movie.poster_path}`} alt={movie.title} />
          ) : (
            <div className="poster-placeholder">Nessun poster</div>
          )}
        </div>

        <div className="detail-info">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="detail-tagline">{movie.tagline}</p>}

          <div className="detail-badges">
            <span>Uscita: {movie.release_date || "N/D"}</span>
            <span>Voto: ★ {movie.vote_average.toFixed(1)}</span>
            <span>Durata: {movie.runtime ? `${movie.runtime} min` : "N/D"}</span>
          </div>

          <p className="detail-genres">
            <strong>Generi:</strong>{" "}
            {movie.genres.length > 0
              ? movie.genres.map((g) => g.name).join(", ")
              : "Nessun genere"}
          </p>

          <p className="detail-overview">
            {movie.overview || "Sinossi non disponibile."}
          </p>
        </div>
      </div>

      <div>
        <Link to="/" className="detail-btn">
          Torna all'elenco
        </Link>
      </div>
    </section>
  );
}