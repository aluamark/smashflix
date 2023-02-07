import React, { useState, useEffect } from "react";
import axios from "axios";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { BarLoader } from "react-spinners";
import AnimeSlider from "./anime/AnimeSlider";
import MovieSlider from "./movie/MovieSlider";

const Home = () => {
	const [topAnimes, setTopAnimes] = useState([]);
	const [topMovies, setTopMovies] = useState([]);

	const { promiseInProgress } = usePromiseTracker();

	useEffect(() => {
		const animeUrl = "https://api.consumet.org/anime/gogoanime/top-airing";
		const fetchTopAnimes = async () => {
			try {
				const { data } = await axios.get(animeUrl, {
					params: { page: Math.floor(Math.random() * (2 - 1 + 1) + 1) },
				});
				setTopAnimes(data.results);
			} catch (err) {
				throw new Error(err.message);
			}
		};

		const movieUrl = "https://api.consumet.org/movies/flixhq/trending";
		const fetchTopMovies = async () => {
			try {
				const { data } = await axios.get(movieUrl);
				const topTen = data.results.slice(0, 10);
				setTopMovies(topTen);
			} catch (err) {
				throw new Error(err.message);
			}
		};

		const fetchHomeData = async () => {
			await fetchTopMovies();
			await fetchTopAnimes();
		};

		trackPromise(fetchHomeData());
	}, []);

	return (
		<div>
			{promiseInProgress ? (
				<div className="flex h-[80vh]">
					<div className="bg-neutral-300 m-auto">
						<BarLoader color="#6d6d6d" height={10} width={300} />
					</div>
				</div>
			) : (
				<div className="pt-20">
					<AnimeSlider topAnimes={topAnimes} />
					<MovieSlider topMovies={topMovies} />
				</div>
			)}
		</div>
	);
};

export default Home;
