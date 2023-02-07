import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { BarLoader } from "react-spinners";
import AnimeHeader from "./AnimeHeader";

const AnimeEpisodes = () => {
	const { id } = useParams();
	const [animeData, setAnimeData] = useState({});
	const { promiseInProgress } = usePromiseTracker();

	useEffect(() => {
		const url = `https://api.consumet.org/anime/gogoanime/info/${id}`;
		const fetchAnimeData = async () => {
			try {
				const { data } = await axios.get(url);
				setAnimeData(data);
			} catch (err) {
				throw new Error(err.message);
			}
		};
		trackPromise(fetchAnimeData());
	}, [id]);

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
					<AnimeHeader animeData={animeData} />
				</div>
			)}
		</div>
	);
};

export default AnimeEpisodes;
