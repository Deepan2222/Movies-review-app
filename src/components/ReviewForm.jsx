import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ReviewForm = ({ imdbId }) => {
  const { user, token } = useContext(AuthContext);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Fetch actual userId from backend using email
  useEffect(() => {
    const fetchUserId = async () => {
      if (!user?.email || !token) return;
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/user/userId?email=${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log("Fetched userId:", res.data); // ✅ log userId
        setUserId(res.data);
      } catch (err) {
        console.error("Failed to fetch userId:", err);
      }
    };

    fetchUserId();
  }, [user, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("UserId not loaded yet. Try again.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/reviews/add",
        {
          imdbId,
          userId,
          reviewText,
          rating: Number(rating),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Review added successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Error posting review:", err.response || err);
      alert("Failed to post review.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6 border border-gray-300">
      <h2 className="text-xl font-bold mb-4 text-cyan-700">Add Review</h2>

      {!userId ? (
        <p className="text-gray-500">Loading user info...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Review Text */}
          <div>
            <label className="block font-medium mb-1 text-cyan-700">
              Your Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              placeholder="Write your thoughts about the movie..."
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block font-medium mb-1 text-cyan-700">
              Rating (1-5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              placeholder="Enter a rating between 1 and 5"
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!userId}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Post Review
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
