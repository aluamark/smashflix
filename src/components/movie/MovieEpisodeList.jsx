import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const MovieEpisodeList = ({
	movieData,
	title,
	mediaId,
	episodes,
	isSeries,
}) => {
	const [availableSeasons, setSeasons] = useState([]);
	const [groupedSeason, setGroupedSeason] = useState({});
	const [selectOption, setSelectOption] = useState("1");
	const [availableEpisodes, setAvailableEpisodes] = useState(0);

	useEffect(() => {
		if (isSeries) {
			let result = episodes.reduce((groupedSeason, episode) => {
				const season = episode.season;
				if (groupedSeason[season] == null) groupedSeason[season] = [];
				groupedSeason[season].push(episode);
				return groupedSeason;
			}, {});

			setSeasons(Object.keys(result));
			setGroupedSeason(result);
			setAvailableEpisodes(result[selectOption].length);
		}
	}, [episodes]);

	return (
		<div id="episodes" className="pt-10 px-4 pb-10">
			{episodes && episodes.length !== 0 && (
				<div>
					<div className="flex justify-between">
						<h2 className="text-3xl pb-3 text-yellow-600">Episodes</h2>

						{isSeries ? (
							<div className="flex">
								<h2 className="text-3xl pr-2">Season</h2>
								<div className="pt-1">
									<select
										value={selectOption}
										onChange={(e) => setSelectOption(e.target.value)}
										name="search-type"
										id="search-type"
										className="h-8 px-5 text-black"
									>
										{availableSeasons.length > 1 ? (
											availableSeasons.map((season, index) => {
												return (
													<option key={index} value={season}>
														{season}
													</option>
												);
											})
										) : (
											<option value="1">1</option>
										)}
									</select>
								</div>
							</div>
						) : null}
					</div>

					<div className="my-3 bg-zinc-800">
						{isSeries
							? groupedSeason[selectOption]?.map((episode, index) => {
									return (
										<div className="flex border-y" key={index}>
											<Link
												to={`/watch/${episode.id}`}
												state={{
													movieData,
													title,
													mediaId,
													isSeries,
													availableSeasons,
													availableEpisodes,
													episodes,
													season: episode.season,
													number: episode.number,
												}}
												className={`rounded ${
													index === 0 ? "bg-zinc-900 text-red-600" : ""
												} hover:bg-zinc-900 hover:text-yellow-600 p-5 w-full`}
											>
												<div className="flex justify-between items-center">
													<span>{episode.title}</span>
													<span>
														<FaPlay />
													</span>
												</div>
											</Link>
										</div>
									);
							  })
							: episodes?.map((episode, index) => {
									return (
										<div className="flex border-y" key={index}>
											<Link
												to={`/watch/${episode.id}`}
												state={{
													movieData,
													title,
													mediaId,
													isSeries,
													availableSeasons,
												}}
												className={`rounded ${
													index === 0 ? "bg-zinc-900 text-red-600" : ""
												} hover:bg-zinc-900 hover:text-yellow-600 p-5 w-full`}
											>
												<div className="flex justify-between items-center">
													<p>{episode.title}</p>
													<span className="ml-5">
														<FaPlay />
													</span>
												</div>
											</Link>
										</div>
									);
							  })}
					</div>
				</div>
			)}
		</div>
	);
};

export default MovieEpisodeList;
