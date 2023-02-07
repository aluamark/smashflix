import React from "react";
import AnimeEpisodeList from "./AnimeEpisodeList";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const AnimeHeader = ({ animeData }) => {
	return (
		<div className="h-full relative">
			<div className="max-w-screen-xl absolute left-0 w-full top-60 md:top-10 z-40">
				<div className="px-5">
					<h1 className="max-w-md text-5xl font-extrabold text-red-600">
						{animeData?.title?.length > 60
							? animeData.title.substring(0, 60).trim() + "..."
							: animeData.title}
					</h1>
					<div className="py-4">
						{animeData.episodes && animeData.episodes.length !== 0 ? (
							<div className="flex">
								<Link
									to={`/anime/watch/${animeData.episodes[0].id}`}
									state={{ title: animeData.title }}
									className="flex items-center border bg-gray-300 hover:bg-gray-500 text-black hover:text-white border-gray-300 hover:border-gray-500 duration-300 py-2 px-5 animate-pulse"
								>
									<FaPlay className="mr-1" />
									Play Episode 1
								</Link>
							</div>
						) : (
							<div className="border text-white border-gray-300 hover:border-gray-800 hover:bg-gray-800 duration-300 py-2 px-5 select-none">
								No available stream yet
							</div>
						)}
					</div>
					<div className="max-w-md">
						<div className="pb-3">
							<h2 className="text-xl text-yellow-600">
								{animeData?.otherName?.length > 50
									? animeData.otherName.substring(0, 50).trim() + "..."
									: animeData.otherName}
							</h2>
						</div>
						<div className="pb-3">
							<p>
								{animeData?.description?.length > 200
									? animeData.description.substring(0, 200).trim() + "..."
									: animeData.description}
							</p>
						</div>
						<div>
							<ul className="flex gap-3">
								<li>
									<span className="text-gray-400">Released: </span>
									{animeData?.releaseDate}
								</li>
								<li>
									<span className="text-gray-400">Status: </span>
									<span
										className={`${
											animeData?.status === "Ongoing"
												? "text-green-500"
												: "text-yellow-500"
										}`}
									>
										{animeData?.status}
									</span>
								</li>
								<li>
									<span className="text-gray-400">Episodes: </span>
									{animeData?.totalEpisodes}
								</li>
							</ul>
							<p>
								<span className="text-gray-400">Genres: </span>
								{animeData.genres?.map((genre, index) => {
									return <span key={genre}>{(index ? ", " : "") + genre}</span>;
								})}
							</p>
						</div>
					</div>
				</div>
				<AnimeEpisodeList
					title={animeData?.title}
					episodes={animeData?.episodes}
				/>
			</div>
			<div className="max-w-screen-lg w-full h-[280px] md:h-[500px]">
				<div className="max-w-screen-lg w-full h-full">
					<div className="max-w-screen-lg absolute w-1/2 h-full md:bg-gradient-to-r md:from-black"></div>
					<div className="max-w-screen-lg absolute w-full h-1/2 bottom-0 bg-gradient-to-t from-zinc-800"></div>

					<img
						src={animeData?.image}
						className="h-[280px] md:h-full object-cover mx-auto md:float-right"
						alt={animeData?.title}
					/>
				</div>
			</div>
		</div>
	);
};

export default AnimeHeader;
