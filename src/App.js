import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import AnimeHome from "./components/anime/AnimeHome";
import AnimeInfo from "./components/anime/AnimeInfo";
import AnimePlayEpisode from "./components/anime/AnimePlayEpisode";
import MovieHome from "./components/movie/MovieHome";
import MovieInfo from "./components/movie/MovieInfo";
import MoviePlayEpisode from "./components/movie/MoviePlayEpisode";
import Home from "./components/Home";
import SearchResults from "./components/search/SearchResults";

const App = () => {
	return (
		<div className="font-mont">
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/anime" element={<AnimeHome />} />
				<Route path="/anime/:id" element={<AnimeInfo />} />
				<Route path="/anime/watch/:id" element={<AnimePlayEpisode />} />

				<Route path="/movie" element={<MovieHome />} />
				<Route path="/movie/:id" element={<MovieInfo />} />
				<Route path="/tv/:id" element={<MovieInfo />} />
				<Route path="/watch/:id" element={<MoviePlayEpisode />} />

				<Route path="/search/:type/:query" element={<SearchResults />} />
				<Route path="/search/:query" element={<SearchResults />} />
			</Routes>
		</div>
	);
};

export default App;
