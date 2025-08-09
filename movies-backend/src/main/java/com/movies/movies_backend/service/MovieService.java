package com.movies.movies_backend.service;

import com.movies.movies_backend.model.Movie;
import com.movies.movies_backend.repo.MovieRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    public List<Movie> allMovies() {
        return repository.findAll();
    }

    public Optional<Movie> findById(ObjectId id) {
        return repository.findById(id);
    }

    public Optional<Movie> findByImdbId(String imdbId) {
        return repository.findByImdbId(imdbId);
    }
}
