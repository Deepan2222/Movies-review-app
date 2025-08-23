import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home'; // optional, if you have a home page
import  {AuthProvider}  from './context/AuthContext.jsx';
import { ListMovies } from './components/ListMovies.jsx';
import Summa from './components/Summa.jsx';
import MovieReview from './components/MovieReview.jsx';
import ReviewDetails from './components/ReviewDetails.jsx';
import ReviewForm from './components/ReviewForm.jsx';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Header />
      {/* <Summa/> */}
      {/* <ReviewForm imdbId="tt1630029" /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<ListMovies/>} />
        <Route path="/movies/review" element={<MovieReview/>} />
         {/* <Route path="/test" element={<ReviewDetails/>} /> */}
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
