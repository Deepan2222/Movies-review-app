package com.movies.movies_backend.controller;

import com.movies.movies_backend.model.Review;
import com.movies.movies_backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody Map<String, Object> payload) {
        String imdbId = (String) payload.get("imdbId");
        String userId = (String) payload.get("userId");
        String reviewText = (String) payload.get("reviewText");
        Double rating = Double.valueOf(payload.get("rating").toString());  // convert to Double

        return new ResponseEntity<>(
                reviewService.addUserReview(imdbId, userId, reviewText, rating),
                HttpStatus.OK
        );
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<Map<String, List<Object>>> getReviewsByMovie(
            @PathVariable String imdbId) {

        Map<String, List<Object>> reviews = reviewService.getAllReviewsByMovieId(imdbId);

        if (reviews.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 if no reviews
        }

        return ResponseEntity.ok(reviews); // 200 with reviews
    }
}
