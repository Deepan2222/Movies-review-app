
package com.movies.movies_backend.controller;

import com.movies.movies_backend.model.User;
import com.movies.movies_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // Registration (all fields required)
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        if (user.getUsername() == null || user.getEmail() == null || user.getPassword() == null || user.getRole() == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userService.register(user));
    }

//    @GetMapping("/login")
//    public String loginPage() {
//        return "Custom login page"; // or return a login.html
//    }

    @GetMapping("/home")
    public String homePage() {
        return "Welcome Home!";
    }

}

