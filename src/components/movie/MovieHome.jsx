import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieFrame from "./MovieFrame";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { BarLoader } from "react-spinners";

const MovieHome = () => {
	const [topMovies, setTopMovies] = useState([]);
	const [movieData, setMovieData] = useState({});
	const { promiseInProgress } = usePromiseTracker();

	useEffect(() => {
		const url = "https://api.consumet.org/movies/flixhq/trending";
		const fetchTopMovies = async () => {
			try {
				const { data } = await axios.get(url);
				const topTen = data.results.slice(0, 10);
				setTopMovies(topTen);

				const movie =
					data.results[Math.floor(Math.random() * data.results.length)];

				const movieUrl = `https://api.consumet.org/movies/flixhq/info?id=${movie.id}`;
				const featuredMovie = await axios.get(movieUrl);

				setMovieData(featuredMovie.data);
			} catch (err) {
				throw new Error(err.message);
			}
		};

		trackPromise(fetchTopMovies());
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
				<div className="pt-[64px] max-w-screen-lg mx-auto">
					<div className="h-full relative">
						<div className="max-w-screen-xl absolute left-0 w-full top-60 md:top-72 z-40">
							<div className="px-5">
								<h1 className="max-w-md text-5xl font-extrabold text-red-600">
									{movieData?.title?.length > 50
										? movieData.title.substring(0, 50).trim() + "..."
										: movieData.title}
								</h1>
								<h2 className="text-xl text-yellow-500">Featured Movie</h2>
								<div className="mt-3">
									<Link
										to={`/${movieData.id}`}
										state={{ movieData: movieData }}
										className="border bg-gray-300 hover:bg-gray-500 text-black hover:text-white border-gray-300 hover:border-gray-500 duration-300 py-2 px-10 animate-pulse"
									>
										More Info
									</Link>
								</div>
							</div>
							<div className="pt-10">
								<h1 className="pl-5 pb-3 text-3xl">Top Movies</h1>
								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-10">
									{topMovies &&
										topMovies.map((movie) => {
											return <MovieFrame key={movie.id} movie={movie} />;
										})}
								</div>
							</div>
						</div>
						<div className="max-w-screen-lg w-full h-[280px] md:h-[500px]">
							<div className="max-w-screen-lg w-full h-full">
								<div className="max-w-screen-lg absolute w-1/2 h-full md:bg-gradient-to-r md:from-black"></div>
								<div className="max-w-screen-lg absolute w-full h-1/2 bottom-0 bg-gradient-to-t from-zinc-800"></div>

								<img
									src={movieData.cover}
									className="h-[280px] md:h-full w-full object-cover"
									alt={movieData.title}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MovieHome;
