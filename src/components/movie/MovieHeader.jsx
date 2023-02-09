import React from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import MovieEpisodeList from "./MovieEpisodeList";

const MovieHeader = ({
	movieData,
	mediaId,
	episodes,
	isSeries,
	availableSeasons,
}) => {
	return (
		<div className="h-full relative max-w-screen-lg mx-auto">
			<div className="max-w-screen-xl absolute left-0 w-full top-60 md:top-10 z-40">
				<div className="px-5">
					<h1 className="max-w-md text-5xl font-extrabold text-red-600">
						{movieData?.title?.length > 50
							? movieData.title.substring(0, 50).trim() + "..."
							: movieData.title}
					</h1>
					<div className="flex py-4">
						{episodes && episodes.length !== 0 ? (
							<div className="flex">
								<Link
									to={`/watch/${episodes[0].id}`}
									state={{ title: movieData.title, mediaId: mediaId }}
									className="flex items-center border text-white border-gray-300 hover:border-gray-800 hover:bg-gray-800 duration-300 cursor-pointer py-2 px-5 animate-pulse hover:anime"
								>
									<FaPlay className="mr-1" />
									Play
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
							<p>
								{movieData?.description?.length > 200
									? movieData.description.substring(0, 200).trim() + "..."
									: movieData.description}
							</p>
						</div>
						<div className="pb-3">
							<p>
								<span className="text-gray-400">Casts: </span>
								{movieData.casts?.map((cast, index) => {
									return <span key={cast}>{(index ? ", " : "") + cast}</span>;
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

							<p>
								<span className="text-gray-400">Genres: </span>
								{movieData.genres?.map((genre, index) => {
									return <span key={genre}>{(index ? ", " : "") + genre}</span>;
								})}
							</p>
						</div>
					</div>
				</div>
				<MovieEpisodeList
					movieData={movieData}
					title={movieData?.title}
					mediaId={movieData?.id}
					episodes={movieData?.episodes}
					isSeries={isSeries}
				/>
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
	);
};

export default MovieHeader;
