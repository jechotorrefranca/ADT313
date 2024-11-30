import { useEffect } from "react";
import { useMovieContext } from "../../../../context/MovieContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MovieGenres from "../../../../components/MovieGenres/MovieGenres";

function View() {
  const { movie, setMovie } = useMovieContext();

  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId !== undefined) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((e) => {
          console.log(e);
          navigate("/");
        });
    }
    return () => {};
  }, [movieId]);

  const convertYear = (date) => {
    return date ? date.split("-")[0] : null;
  };

  return (
    <>
      {movie && (
        <>
          <div>
            <div className="banner">
              <h1>
                {movie.title} {`(${convertYear(movie.releaseDate)})`}
              </h1>
            </div>
            <h3>{movie.overview}</h3>
            {JSON.stringify(movie)}
          </div>

          {movie.casts && movie.casts.length && (
            <div>
              <h1>Cast & Crew</h1>
              {JSON.stringify(movie.casts)}
            </div>
          )}

          <MovieGenres movieId={movie.tmdbId} />

          {movie.videos && movie.videos[0] ? (
            <div className="video-preview">
              {/* Assuming the video.key is the unique identifier for a YouTube video */}
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${movie.videos[0]?.videoKey}`}
                title={movie.videos[0]?.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : null}

          {movie.videos && movie.videos.length && (
            <div>
              <h1>Videos</h1>
              {JSON.stringify(movie.videos)}
            </div>
          )}

          {movie.photos && movie.photos.length && (
            <div>
              <h1>Photos</h1>
              {JSON.stringify(movie.photos)}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default View;
