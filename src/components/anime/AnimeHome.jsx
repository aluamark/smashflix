import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AnimeFrame from "./AnimeFrame";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { BarLoader } from "react-spinners";

const AnimeHome = () => {
	const [topAnimes, setTopAnimes] = useState([]);
	const [animeData, setAnimeData] = useState({});
	const { promiseInProgress } = usePromiseTracker();

	useEffect(() => {
		const url = "https://api.consumet.org/anime/gogoanime/top-airing";
		const fetchTopAnimes = async () => {
			try {
				const { data } = await axios.get(url, { params: { page: 2 } });
				setTopAnimes(data.results);
				setAnimeData(
					data.results[Math.floor(Math.random() * data.results.length)]
				);
			} catch (err) {
				throw new Error(err.message);
			}
		};

		trackPromise(fetchTopAnimes());
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
									{animeData?.title?.length > 50
										? animeData.title.substring(0, 50).trim() + "..."
										: animeData.title}
								</h1>
								<h2 className="text-xl text-yellow-500">Featured Anime</h2>
								<div className="mt-3">
									<Link
										to={`/anime/${animeData.id}`}
										className="border bg-gray-300 hover:bg-gray-500 text-black hover:text-white border-gray-300 hover:border-gray-500 duration-300 py-2 px-10 animate-pulse"
									>
										More Info
									</Link>
								</div>
							</div>
							<div className="pt-10">
								<h1 className="pl-5 pb-3 text-3xl">Top Animes</h1>
								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-10">
									{topAnimes &&
										topAnimes.map((anime) => {
											return <AnimeFrame key={anime.id} anime={anime} />;
										})}
								</div>
							</div>
						</div>

						<div className="max-w-screen-lg w-full h-[280px] md:h-[500px]">
							<div className="max-w-screen-lg w-full h-full">
								<div className="max-w-screen-lg absolute w-1/2 h-full md:bg-gradient-to-r md:from-black"></div>
								<div className="max-w-screen-lg absolute w-full h-1/2 bottom-0 bg-gradient-to-t from-zinc-800"></div>

								<img
									src={animeData?.image}
									className="h-[280px] md:h-full object-cover mx-auto md:float-right "
									alt={animeData?.title}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AnimeHome;
