import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ReviewDetails = ({ imdbId }) => {
  const { token } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    if (!imdbId || !token) return;

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/reviews/${imdbId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const reviewArray = Object.entries(res.data).map(
          ([userId, [text, rating]]) => ({
            userId,
            text,
            rating,
          })
        );

        setReviews(reviewArray);
        setCurrentPage(1); // reset to first page when new movie loads
      } catch (err) {
        console.error("Error fetching reviews:", err.response || err);
      }
    };

    fetchReviews();
  }, [imdbId, token]);

  if (!reviews.length) return <p className="text-center mt-4">No reviews yet.</p>;

  // Pagination logic
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="space-y-4 mt-4">
      {currentReviews.map((review) => (
        <div
          key={review.userId}
          className="p-1 border rounded-lg bg-gray-800/50"
        >
          <p className="mt-1">{review.text}</p>
          <p className="mt-1 text-gray-300">Rating: ⭐ {review.rating}/5</p>        </div>
      ))}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50"
          >
            ⬅ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewDetails;
