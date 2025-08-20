package com.movies.movies_backend.controller;

import com.movies.movies_backend.model.Review;
import com.movies.movies_backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody Map<String, String> payload) {
        String imdbId = payload.get("imdbId");
        String userId = payload.get("userId");       // 👈 must be passed from frontend
        String reviewText = payload.get("reviewText");

        return new ResponseEntity<>(
                reviewService.addUserReview(imdbId, userId, reviewText),
                HttpStatus.OK
        );
    }
}

