import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { BarLoader } from "react-spinners";
import ReactPlayer from "react-player";

const MoviePlayEpisode = () => {
	const { id } = useParams();
	const location = useLocation();
	const title = location.state?.title;
	const mediaId = location.state?.mediaId;
	const season = location.state?.season;
	const number = location.state?.number;
	const [episodeData, setEpisodeData] = useState([]);
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

				setEpisodeData(data.sources);
				setCaptions(config);
			} catch (err) {
				throw new Error(err.message);
			}
		};

		trackPromise(fetchEpisodeData());
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
				<div className="max-w-screen-lg mx-auto pt-24">
					<div className="flex justify-between px-5">
						<div>
							<h1 className="text-3xl font-bold text-red-600">
								{title ? title : id}
							</h1>
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
								<option value="default">auto</option>
								{episodeData
									.slice(0, episodeData.length - 1)
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
							url={selectUrl ? selectUrl : episodeData[3]?.url}
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
					</div>
				</div>
			)}
		</div>
	);
};

export default MoviePlayEpisode;
