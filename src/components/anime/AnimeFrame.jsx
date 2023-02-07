import React from "react";
import { Link } from "react-router-dom";

const AnimeFrame = ({ anime }) => {
	let animeTitle = "";
	if (anime.title.length > 25) {
		animeTitle = anime.title.substring(0, 25);
		animeTitle = animeTitle.trim();
		animeTitle += "...";
	} else {
		animeTitle = anime.title;
	}

	return (
		<Link
			to={`/anime/${anime.id}`}
			state={{ anime }}
			className="relative px-1 mx-auto"
		>
			<span className="absolute top-0 bg-yellow-600 px-1 text-xs">
				{anime?.subOrDub}
			</span>
			<img
				className="w-48 h-[17rem] sm:w-60 sm:h-80 hover:scale-105 duration-300"
				src={anime?.image}
				alt={anime?.title}
			/>
			<p className="text-xs md:text-sm text-center py-3">{animeTitle}</p>
		</Link>
	);
};

export default AnimeFrame;
