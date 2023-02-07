import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { BarLoader } from "react-spinners";
import MovieHeader from "./MovieHeader";

const MovieInfo = () => {
	const [movieData, setMovieData] = useState({});
	const [isSeries, setIsSeries] = useState(false);
	const [availableSeasons, setAvailableSeasons] = useState([]);
	const { promiseInProgress } = usePromiseTracker();
	const location = useLocation();
	const movieDataFromHome = location.state?.movieData;
	const movieFromSearchResult = location.state?.movie;

	useEffect(() => {
		if (movieDataFromHome) {
			setMovieData(movieDataFromHome);
			if (movieDataFromHome.episodes[0].hasOwnProperty("season")) {
				setIsSeries(true);
			} else {
				setIsSeries(false);
			}
		} else if (movieFromSearchResult) {
			const url = `https://api.consumet.org/movies/flixhq/info?id=${movieFromSearchResult.id}`;
			const fetchMovieData = async () => {
				try {
					const { data } = await axios.get(url);
					setMovieData(data);
					if (data.episodes[0].hasOwnProperty("season")) {
						setIsSeries(true);
					} else {
						setIsSeries(false);
					}
				} catch (err) {
					throw new Error(err.message);
				}
			};
			trackPromise(fetchMovieData());
		}
	}, []);

	useEffect(() => {
		if (isSeries) {
			let result = movieData?.episodes?.reduce((groupedSeason, episode) => {
				const season = episode.season;
				if (groupedSeason[season] == null) groupedSeason[season] = [];
				groupedSeason[season].push(episode);
				return groupedSeason;
			}, {});

			setAvailableSeasons(Object.keys(result));
		}
	}, [movieData]);

	return (
		<div>
			{promiseInProgress ? (
				<div className="flex h-[80vh]">
					<div className="bg-neutral-300 m-auto">
						<BarLoader color="#6d6d6d" height={10} width={300} />
					</div>
				</div>
			) : (
				<div className="pt-[64px]">
					<MovieHeader
						movieData={movieData}
						isSeries={isSeries}
						mediaId={movieData?.id}
						episodes={movieData?.episodes}
						availableSeasons={availableSeasons.length}
					/>
				</div>
			)}
		</div>
	);
};

export default MovieInfo;
