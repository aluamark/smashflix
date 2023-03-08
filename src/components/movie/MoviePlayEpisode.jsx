import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { BarLoader } from "react-spinners";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

const MoviePlayEpisode = () => {
	const { id } = useParams();
	const location = useLocation();
	const movieData = location.state?.movieData;
	const title = location.state?.title;
	const mediaId = location.state?.mediaId;
	const isSeries = location.state?.isSeries;
	const availableSeasons = location.state?.availableSeasons;
	const availableEpisodes = location.state?.availableEpisodes;
	const season = location.state?.season;
	const number = location.state?.number;
	const episodes = location.state?.episodes;
	const [episodeData, setEpisodeData] = useState([]);
	const [defaultSource, setDefaultSource] = useState("");
	const [selectUrl, setSelectUrl] = useState("");
	const [selectOption, setSelectOption] = useState("");
	const [captions_arr, setCaptions] = useState([]);
	const { promiseInProgress } = usePromiseTracker();

	const handleSelectChange = (e) => {
		setSelectOption(e.target.value);
		setSelectUrl(episodeData[e.target.value].url);
	};

	useEffect(() => {
		const url = `https://api.consumet.org/movies/flixhq/watch`;

		const fetchEpisodeData = async () => {
			try {
				const { data } = await axios.get(url, {
					params: {
						episodeId: id,
						mediaId: mediaId,
						server: "upcloud",
					},
				});

				const config = data.subtitles.map((sub) => {
					return {
						kind: "subtitles",
						src: sub.url,
						srcLang: sub.lang,
					};
				});

				const auto = data.sources.filter((source) => source.quality === "auto");
				if (auto.length !== 0) {
					setDefaultSource(auto[0]);
				}

				setEpisodeData(data.sources);
				setCaptions(config);
			} catch (err) {
				throw new Error(err.message);
			}
		};

		trackPromise(fetchEpisodeData());
	}, [id, number]);

	return (
		<div>
			{promiseInProgress ? (
				<div className="flex h-[80vh]">
					<div className="bg-neutral-300 m-auto">
						<BarLoader color="#6d6d6d" height={10} width={300} />
					</div>
				</div>
			) : (
				<div className="max-w-screen-lg mx-auto py-24">
					<div className="flex justify-between">
						<div>
							<Link
								to={`/${movieData.id}`}
								state={{ movieData }}
								className="relative mx-auto flex items-center"
							>
								<BiArrowBack />
								<h1 className="text-3xl font-bold text-red-600 pl-3">
									{title ? title : id}
								</h1>
							</Link>

							{season && (
								<div>
									<h2 className="text-xl text-white">
										Season {season}:{" "}
										<span className="text-yellow-600">Episode {number}</span>
									</h2>
								</div>
							)}
						</div>
						<div className="flex items-center">
							<select
								value={selectOption}
								onChange={handleSelectChange}
								name="quality"
								id="quality"
								className="h-8 px-5 text-black"
							>
								<option
									defaultValue={true}
									value={defaultSource.quality}
									key={defaultSource.quality}
								>
									{defaultSource.quality}
								</option>
								{episodeData
									.slice(0)
									.filter((source) => source.quality !== "auto")
									.map((reso, index) => {
										return (
											<option value={index} key={reso.quality}>
												{reso.quality}
											</option>
										);
									})}
							</select>
						</div>
					</div>

					<div className="pt-5 w-full">
						<ReactPlayer
							url={selectUrl ? selectUrl : defaultSource.url}
							controls
							playing
							volume={1}
							pip
							stopOnUnmount={false}
							width="100%"
							height="100%"
							config={{
								file: {
									attributes: {
										crossOrigin: "true",
									},
									tracks: captions_arr,
								},
							}}
						/>
						{season && number > 0 && number < availableEpisodes && (
							<div className="flex justify-between pt-3 px-5">
								<h2 className="text-xl text-white">
									Season {season}:{" "}
									<span className="text-yellow-600">Episode {number}</span>
								</h2>
								<Link
									to={`/watch/${parseInt(id) + 1}`}
									state={{
										movieData,
										title,
										mediaId,
										isSeries,
										availableSeasons,
										availableEpisodes,
										season,
										number: number + 1,
									}}
									className="flex items-center hover:text-yellow-600"
								>
									<span className="pr-1">Next Episode</span>
									<FaPlay />
								</Link>
							</div>
						)}
					</div>

					<div className="pt-3">
						<div className="h-full relative max-w-screen-lg mx-auto">
							<div className="max-w-screen-xl absolute left-0 w-full top-72 md:top-20 z-40">
								<div className="px-5">
									<h1 className="max-w-md text-5xl font-extrabold text-red-600">
										{movieData?.title?.length > 50
											? movieData.title.substring(0, 50).trim() + "..."
											: movieData.title}
									</h1>

									<div className="max-w-md">
										<div className="py-3">
											<p>
												{movieData?.description?.length > 200
													? movieData.description.substring(0, 200).trim() +
													  "..."
													: movieData.description}
											</p>
										</div>
										<div className="pb-3">
											<p>
												<span className="text-gray-400">Casts: </span>
												{movieData.casts?.map((cast, index) => {
													return (
														<span key={cast}>{(index ? ", " : "") + cast}</span>
													);
												})}
											</p>
										</div>
										<div>
											<ul className="flex gap-3">
												<li>
													<span className="text-gray-400">Released: </span>
													{movieData?.releaseDate}
												</li>
												<li>
													<span className="text-gray-400">Type: </span>
													{movieData?.type}
												</li>
											</ul>
											{episodes && episodes.length === 0 ? null : (
												<ul className="flex gap-3">
													{isSeries ? (
														<li>
															<span className="text-gray-400">Seasons: </span>
															{availableSeasons}
														</li>
													) : null}
													<li>
														<span className="text-gray-400">Episodes: </span>
														{movieData?.episodes?.length}
													</li>
													<li>
														<span className="text-gray-400">Duration: </span>
														{movieData?.duration}
													</li>
												</ul>
											)}

											<p className="pb-10">
												<span className="text-gray-400">Genres: </span>
												{movieData.genres?.map((genre, index) => {
													return (
														<span key={genre}>
															{(index ? ", " : "") + genre}
														</span>
													);
												})}
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="max-w-screen-lg w-full h-[280px] md:h-[500px]">
								<div className="max-w-screen-lg w-full h-full">
									<div className="max-w-screen-lg absolute w-1/2 h-full md:bg-gradient-to-r md:from-black"></div>
									<div className="max-w-screen-lg absolute w-full h-1/2 top-0 bg-gradient-to-b from-zinc-800"></div>

									<img
										src={movieData.cover}
										className="h-[280px] md:h-full w-full object-cover"
										alt={movieData.title}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MoviePlayEpisode;
