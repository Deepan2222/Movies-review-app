
package com.movies.movies_backend.service;

import com.movies.movies_backend.model.Movie;
import com.movies.movies_backend.model.Review;
import com.movies.movies_backend.repo.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    // Add a review by a user for a movie
    public Review addUserReview(String imdbId, String userId, String reviewText) {
        // 1. Find or create the Review document for this movie
        Review review = reviewRepository.findByMovieId(imdbId)
                .orElseGet(() -> {
                    Review newReview = new Review();
                    newReview.setMovieId(imdbId);
                    return reviewRepository.save(newReview);
                });

        // 2. Add or update the user's review
        review.getUserReviews().put(userId, reviewText);

        // 3. Save review back to DB
        review = reviewRepository.save(review);

        // 4. Link Review to the Movie (only one reviewId per movie)
        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().set("review", review)) // 👈 set, not push
                .first();

        return review;
    }
}


