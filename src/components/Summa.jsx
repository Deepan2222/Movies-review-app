import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Summa = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState(null);

  // review inputs
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [addReviewResponse, setAddReviewResponse] = useState(null);

  const { token, login } = useContext(AuthContext);

  // ✅ Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      console.log("API Response:", res.data);
      setResponseData(res.data);
      login(res.data); // store token in AuthContext
    } catch (err) {
      console.error("Login error:", err);
      setResponseData({ error: "Login failed" });
    }
  };

  // ✅ Fetch reviews
  const fetchReviews = async () => {
    if (!token) {
      console.error("No token available. Please log in first.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8080/api/v1/reviews/tt3915174", {
        headers: {
          Authorization: `Bearer ${token}`, // get token from AuthContext
        },
      });
      console.log("Reviews API Response:", res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // ✅ Add review
  const addReview = async () => {
    if (!token) {
      console.error("No token available. Please log in first.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/reviews/add",
        {
          imdbId: "tt3915174", // example movie ID
          userId: "test3", // your test user ID
          reviewText,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Add Review API Response:", res.data);
      setAddReviewResponse(res.data);
    } catch (err) {
      console.error("Error adding review:", err);
      setAddReviewResponse({ error: "Failed to add review" });
    }
  };

  return (
    <div className="p-6">
      {/* ✅ Login form */}
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      {/* Show login response */}
      {responseData && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}

      {/* ✅ Fetch Reviews Button */}
      <button
        onClick={fetchReviews}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Fetch Reviews
      </button>

      {/* ✅ Add Review Form */}
      <div className="mt-6">
        <h3 className="text-xl mb-2">Add Review</h3>
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="Rating (e.g. 4.5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-2"
        />
        <button
          onClick={addReview}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Submit Review
        </button>
      </div>

      {/* Show add review response */}
      {addReviewResponse && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <pre>{JSON.stringify(addReviewResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Summa;
