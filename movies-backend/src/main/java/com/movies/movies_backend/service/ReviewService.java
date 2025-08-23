package com.movies.movies_backend.service;

import com.movies.movies_backend.model.Movie;
import com.movies.movies_backend.model.Review;
import com.movies.movies_backend.repo.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    // Add a review by a user for a movie
    public Review addUserReview(String imdbId, String userId, String reviewText, Double rating) {
        // 1. Find or create the Review document for this movie
        Review review = reviewRepository.findByMovieId(imdbId)
                .orElseGet(() -> {
                    Review newReview = new Review();
                    newReview.setMovieId(imdbId);
                    return reviewRepository.save(newReview);
                });

        // 2. Prepare value list [reviewText, rating]
        List<Object> value = new ArrayList<>();
        value.add(reviewText);
        value.add(rating);

        // 3. Use userId (ObjectId as string) as the key
        review.getUserReviews().put(userId, value);

        // 4. Save review back to DB
        review = reviewRepository.save(review);

        // 5. Link Review to the Movie (only one reviewId per movie)
        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().set("review", review))
                .first();

        return review;
    }

    public Map<String, List<Object>> getAllReviewsByMovieId(String imdbId) {
        Review review = reviewRepository.findByMovieId(imdbId)
                .orElse(null);

        if (review == null) {
            return Map.of(); // return empty map if no reviews found
        }

        return review.getUserReviews();
    }

}
