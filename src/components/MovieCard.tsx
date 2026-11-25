import { Link } from "react-router-dom";
import type { MovieCardProps } from "../types/movies";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-poster">
        {movie.poster_path ? (
          <img src={`${POSTER_BASE_URL}${movie.poster_path}`} alt={movie.title} />
        ) : (
          <div className="poster-placeholder">Nessun poster</div>
        )}
      </div>

      <div className="movie-card-body">
        <h2 className="movie-title">{movie.title}</h2>
        <div className="movie-meta">
          <span>{movie.release_date || "Data N/D"}</span>
          <span>★ {movie.vote_average.toFixed(1)}</span>
        </div>
        <p className="movie-overview">
          {movie.overview || "Sinossi non disponibile."}
        </p>
        <Link to={`/movies/${movie.id}`} className="detail-link">
          Dettaglio
        </Link>
      </div>
    </article>
  );
}