//package com.movies.movies_backend;
//
//import org.bson.types.ObjectId;
//import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public interface ReviewRepository extends MongoRepository<Movie, ObjectId> {
//    Review insert(Review review);
//}
package com.movies.movies_backend.repo;

import com.movies.movies_backend.model.Review;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends MongoRepository<Review, ObjectId> {
}
