import React from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const AnimeEpisodeList = ({ title, episodes }) => {
	return (
		<div className="pt-10 px-4 pb-10">
			<h2 className="text-3xl pb-3 text-yellow-600">Episodes</h2>
			<div className="my-3 bg-zinc-800">
				{episodes?.reverse().map((episode, index) => {
					return (
						<div className="flex border-y" key={index}>
							<Link
								to={`/anime/watch/${episode.id}`}
								state={{ title: title }}
								className={`rounded ${
									index === 0 ? "bg-zinc-900 text-red-600" : ""
								} hover:bg-zinc-900 hover:text-yellow-600 p-5 w-full`}
							>
								<div className="flex justify-between items-center">
									<p>
										{title} - Episode{" "}
										{episode.id.split("-").slice(-1).join(" ")}{" "}
										{index === 0 ? "- Latest 🔥" : ""}
									</p>
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
	);
};

export default AnimeEpisodeList;
