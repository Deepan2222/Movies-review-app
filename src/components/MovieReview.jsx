import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReviewDetails from "../components/ReviewDetails";
import ReviewForm from "../components/ReviewForm"; // import form

export default function MovieReview() {
  const { state } = useLocation();
  const movie = state?.movie;
  const [showForm, setShowForm] = useState(false);

  if (!movie) return <p className="text-center mt-10">No movie selected.</p>;

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Backdrop slideshow */}
      <div className="absolute inset-0">
        {movie.backdrops?.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`Backdrop ${i}`}
            className="absolute inset-0 w-full h-full object-cover animate-fade"
            style={{
              animationDelay: `${i * 4}s`,
              animationDuration: `${movie.backdrops.length * 4}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-start p-8 md:p-16 gap-10">
        {/* Poster */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-64 md:w-72 rounded-2xl shadow-2xl border-4 border-white/20"
        />

        {/* Movie Info + Reviews */}
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold">{movie.title}</h1>
            <p className="text-gray-300">
              <strong>Release Date:</strong> {movie.releaseDate}
            </p>
            <p className="text-gray-300">
              <strong>Genres:</strong> {movie.genres?.join(", ")}
            </p>
            <a
              href={movie.trailerLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold shadow-lg transition"
            >
              🎬 Watch Trailer
            </a>
          </div>

          {/* Reviews */}
          <ReviewDetails imdbId={movie.imdbId} />

          {/* Add Review Button */}
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold shadow-lg transition"
          >
            ➕ Add Review
          </button>

          {/* Show Review Form in modal-like popup */}
          {showForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative">
                {/* Close button */}
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
                >
                  ✖
                </button>
                <ReviewForm imdbId={movie.imdbId} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
