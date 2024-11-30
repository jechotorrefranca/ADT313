import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [videos, setVideos] = useState([]); // New state for videos
  const [newVideoUrl, setNewVideoUrl] = useState(""); // New state for new video URL
  const navigate = useNavigate();
  let { movieId } = useParams();
  const [description, setDescription] = useState("");
  const [selectedVideo, setSelectedVideo] = useState([]);

  const handleAddVideo = async (movieId2) => {
    console.log(movieId2);
    console.log(movieId);

    // If no videos are found, proceed with empty fields in videoData

    const accessToken = localStorage.getItem("accessToken");
    const videoData = {
      movieId: movieId ? movieId : movieId2, // Use the dynamically provided movieId
      url: selectedVideo?.key
        ? `https://www.youtube.com/embed/${selectedVideo.key}`
        : "https://www.youtube.com/embed/not_available", // Use placeholder URL
      name: selectedVideo?.name || "No video selected", // Default name if no video selected
      site: selectedVideo?.site || "YouTube", // Default site as "YouTube"
      videoKey: selectedVideo?.key || "not_available", // Default key
      videoType: selectedVideo?.type || "placeholder", // Default type
      official: selectedVideo?.official || false, // Default to false
    };

    console.log(videoData);

    try {
      const response = await axios({
        method: movieId ? "patch" : "post",
        url: movieId ? `/videos/${movieId}` : "/videos",
        data: videoData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Video added successfully:", response.data);
      alert("Video added successfully!");
      return true; // Indicate success
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Failed to add video. Please try again.");
      return false; // Indicate failure
    }
  };

  const convertYear = (date) => {
    return date ? date.split("-")[0] : null;
  };

  const handleSearch = useCallback(() => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI",
      },
    }).then((response) => {
      setSearchedMovieList(response.data.results);
      console.log(response.data.results);
    });
  }, [query]);

  const fetchVideos = (tmdbId) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${tmdbId}/videos?language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI",
          },
        }
      )
      .then((response) => {
        const videoResults = response.data.results;
        setVideos(videoResults.length > 0 ? videoResults : ""); // Set to "" if no videos are found
        console.log("Videos from TMDB:", videoResults);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setVideos(""); // Set to "" in case of error
      });
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    fetchVideos(movie.id); // Fetch videos for the selected movie
  };

  const handleSave = async () => {
    if (videos && videos.length > 0 && (!selectedVideo || !selectedVideo.key)) {
      alert("Videos are available. Please select a video before proceeding.");
      return false; // Stop the process
    }

    if (!videos || videos.length <= 0) {
      alert("No videos found. Proceeding with empty video data.");
    }

    const accessToken = localStorage.getItem("accessToken");

    if (!selectedMovie) {
      alert("Please search and select a movie.");
      return;
    }

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

    try {
      // Dynamically decide between patch and post
      const response = await axios({
        method: movieId ? "patch" : "post",
        url: movieId ? `/movies/${movieId}` : "/movies",
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Get the movie ID, either from existing state or the response for a new movie
      const newMovieId = movieId || response.data.id; // Use existing movieId if present, otherwise get from response
      console.log("safjadsfdsgfdsfhdsbfj", movieId || "sd");
      console.log("safjadsfdsgfdsfhdsbfj", newMovieId);
      console.log("Movie saved successfully:", response.data);
      alert("Movie saved successfully!");

      // Proceed to add the video
      const isVideoAdded = await handleAddVideo(newMovieId); // Pass movieId dynamically
      if (!isVideoAdded) {
        alert("Video could not be added. Please try again.");
        return;
      }

      // Navigate to the movie details page
      navigate(`/main/movies`);
    } catch (error) {
      console.error("Error saving movie:", error);
      alert("Failed to save the movie. Please try again.");
    }
  };

  useEffect(() => {
    if (movieId) {
      // Fetch movie details from your server
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
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
          console.log(response.data);

          // Fetch videos from TMDB using the TMDB ID
          return response.data.tmdbId;
        })
        .then(fetchVideos) // Use the reusable function here
        .catch((error) => console.log(error));
    }
  }, [movieId]);

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
          <hr />
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

        <h2>Videos</h2>

        <div className="videosMainCont">
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <div className="videosCont" key={video.id}>
                <p>{video.name}</p>
                <div className="videolist">
                  <div className="video-preview">
                    {/* Assuming the video.key is the unique identifier for a YouTube video */}
                    <iframe
                      width="280"
                      height="158"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedVideo(video);
                      alert("Successfully selected a video!");
                    }}
                  >
                    Select Video
                  </button>
                </div>

                {/* <div>
                  <button type="button" onClick={handleAddVideo}>
                    Add Video
                  </button>
                </div> */}
              </div>
            ))
          ) : (
            <p>No videos found</p>
          )}
        </div>
      </div>

      {<h1>"KAYO NALANG BAHALA MAGLAGAY SA OUTLET"</h1>}

      {movieId && (
        <div>
          <hr />
          <nav>
            <ul className="tabs">
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/cast-and-crews`);
                }}
              >
                Cast & Crews
              </li>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/videos`);
                }}
              >
                Videos
              </li>
              <li
                onClick={() => {
                  navigate(`/main/movies/form/${movieId}/photos`);
                }}
              >
                Photos
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Form;
