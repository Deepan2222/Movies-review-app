//package com.movies.movies_backend.model;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.bson.types.ObjectId;
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//import org.springframework.data.mongodb.core.mapping.DocumentReference;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Document(collection = "movies")
//public class Movie {
//    @Id
//    private ObjectId id;
//
//    private String imdbId;
//    private String title;
//    private String releaseDate;
//    private String trailerLink;
//    private String poster;
//
//    // One Review doc that stores all user reviews for this movie
//    @DocumentReference
//    private Review review;
//}
package com.movies.movies_backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "movies")
public class Movie {
    @Id
    private ObjectId id;

    private String imdbId;
    private String title;
    private String releaseDate;
    private String trailerLink;
    private String poster;

    private List<String> genres;      // Movie genres
    private List<String> backdrops;   // Movie backdrop images

    // List of Review document references
    @DocumentReference
    private Review review;
}
