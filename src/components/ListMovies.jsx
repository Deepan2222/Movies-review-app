import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MoviesAPI } from "../api/axios";

export const ListMovies = () => {
  const { token } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await MoviesAPI.get("/movies", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(res.data);
        // console.log("Fetched movies:", res.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    if (token) fetchMovies();
  }, [token]);

  const handleAddReview = (movie) => {
    navigate("/movies/review", { state: { movie } });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        🎬 Movies List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbId}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-500">
                {movie.genres?.join(", ") || "No genres available"}
              </p>

              <button
                onClick={() => handleAddReview(movie)}
                className="mt-3 w-full bg-indigo-500 text-white py-2 px-4 rounded-xl hover:bg-indigo-600 transition"
              >
                Add Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
