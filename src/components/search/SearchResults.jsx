import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import axios from "axios";
import AnimeFrame from "../anime/AnimeFrame";
import { BarLoader } from "react-spinners";
import MovieFrame from "../movie/MovieFrame";

const SearchResults = () => {
	const { type, query } = useParams();
	const [animeSearchResults, setAnimeSearchResults] = useState([]);
	const [movieSearchResults, setMovieSearchResults] = useState([]);
	const { promiseInProgress } = usePromiseTracker();

	useEffect(() => {
		if (type === "Anime") {
			const animeUrl = `https://api.consumet.org/anime/gogoanime/${query}`;

			const fetchAnimeSearchQuery = async () => {
				try {
					const { data } = await axios.get(animeUrl);
					setAnimeSearchResults(data.results);
				} catch (err) {
					throw new Error(err.message);
				}
			};

			trackPromise(fetchAnimeSearchQuery());
		} else {
			const movieUrl = `https://api.consumet.org/movies/flixhq/${query}`;

			const fetchMovieSearchQuery = async () => {
				try {
					const { data } = await axios.get(movieUrl);

					let movieWithReleaseDate = [];
					let movieWithNoReleaseDate = [];

					for (let i = 0; i < data.results.length; i++) {
						if (data.results[i].releaseDate) {
							movieWithReleaseDate.push(data.results[i]);
						} else {
							movieWithNoReleaseDate.push(data.results[i]);
						}
					}

					movieWithReleaseDate.sort((a, b) =>
						a.releaseDate > b.releaseDate ? -1 : 1
					);

					const sortedSearchResults = [
						...movieWithNoReleaseDate,
						...movieWithReleaseDate,
					];

					setMovieSearchResults(sortedSearchResults);
				} catch (err) {
					throw new Error(err.message);
				}
			};

			trackPromise(fetchMovieSearchQuery());
		}
	}, [query, type]);

	return (
		<div className="bg-zinc-800 pt-20">
			<div className="max-w-screen-lg mx-auto">
				<div className="pl-5">
					<h1 className="text-3xl pb-5">
						Results for: <span className="text-yellow-600">{query}</span>
					</h1>
				</div>
				{promiseInProgress ? (
					<div className="flex h-[80vh]">
						<div className="bg-neutral-300 m-auto">
							<BarLoader color="#6d6d6d" height={10} width={300} />
						</div>
					</div>
				) : type === "Anime" ? (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-10">
						{animeSearchResults &&
							animeSearchResults.map((result) => {
								return <AnimeFrame key={result.id} anime={result} />;
							})}
					</div>
				) : (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-10">
						{movieSearchResults &&
							movieSearchResults.map((movie) => {
								return <MovieFrame key={movie.id} movie={movie} />;
							})}
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchResults;
