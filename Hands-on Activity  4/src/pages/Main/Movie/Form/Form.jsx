import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [page, setpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let { movieId } = useParams();
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI",
      },
    })
      .then((response) => {
        setSearchedMovieList(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, [query, page]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (selectedMovie === undefined) {
      alert("Please search and select a movie.");
    } else {
      const data = {
        tmdbId: selectedMovie.id,
        title: selectedMovie.original_title,
        overview: selectedMovie.overview,
        popularity: selectedMovie.popularity,
        releaseDate: selectedMovie.release_date,
        voteAverage: selectedMovie.vote_average,
        backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
        posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
        isFeatured: 0,
      };

      axios({
        method: movieId ? "patch" : "post",
        url: movieId ? `/movies/${movieId}` : "/movies",
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((saveResponse) => {
          console.log(saveResponse);
          alert("Success");
          navigate("/main/movies");
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`).then((response) => {
        setMovie(response.data);
        const tempData = {
          id: response.data.tmdbId,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.posterPath,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
        };
        setSelectedMovie(tempData);
      });
    }
  }, []);

  const handleNextPage = () => {
    if (page < totalPages) {
      setpage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setpage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    if (query) handleSearch();
  }, [page]);

  return (
    <>
      <h1>{movieId !== undefined ? "Edit " : "Create "} Movie</h1>

      {movieId === undefined && (
        <>
          <div className="search-container">
            Search Movie:{" "}
            <input
              type="text"
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="button" onClick={handleSearch}>
              Search
            </button>
            <div className="searched-movie">
              {searchedMovieList.map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))}
            </div>
          </div>

          {searchedMovieList.length > 0 && (
            <>
              <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                  Next
                </button>
              </div>
              <hr />
            </>
          )}
        </>
      )}

      <div className="container">
        <form>
          {selectedMovie ? (
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt={selectedMovie.original_title}
            />
          ) : (
            ""
          )}
          <div className="field">
            Title:
            <input
              type="text"
              disabled={!movieId}
              value={selectedMovie ? selectedMovie.original_title : ""}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  original_title: e.target.value,
                })
              }
            />
          </div>
          <div className="field">
            Overview:
            <textarea
              disabled={!movieId}
              rows={10}
              value={selectedMovie ? selectedMovie.overview : ""}
              onChange={(e) =>
                setSelectedMovie({ ...selectedMovie, overview: e.target.value })
              }
            />
          </div>
          <div className="field">
            Popularity:
            <input
              type="text"
              disabled={!movieId}
              value={selectedMovie ? selectedMovie.popularity : ""}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  popularity: e.target.value,
                })
              }
            />
          </div>
          <div className="field">
            Release Date:
            <input
              type="text"
              disabled={!movieId}
              value={selectedMovie ? selectedMovie.release_date : ""}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  release_date: e.target.value,
                })
              }
            />
          </div>
          <div className="field">
            Vote Average:
            <input
              type="text"
              disabled={!movieId}
              value={selectedMovie ? selectedMovie.vote_average : ""}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  vote_average: e.target.value,
                })
              }
            />
          </div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
