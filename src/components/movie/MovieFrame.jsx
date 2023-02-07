import React from "react";
import { Link } from "react-router-dom";

const MovieFrame = ({ movie }) => {
	let movieTitle = "";
	if (movie.title.length > 20) {
		movieTitle = movie.title.substring(0, 20);
		movieTitle = movieTitle.trim();
		movieTitle += "...";
	} else {
		movieTitle = movie.title;
	}

	return (
		<Link
			to={`/${movie.id}`}
			state={{ movie: movie }}
			className="relative px-1 mx-auto"
		>
			<img
				className="w-48 h-[17rem] sm:w-60 sm:h-80 hover:scale-105 duration-300"
				src={movie.image}
				alt={movie.title}
			/>
			<p className="text-xs md:text-sm text-center py-3">
				{movieTitle} {movie.releaseDate ? `(${movie.releaseDate})` : ""}
			</p>
		</Link>
	);
};

export default MovieFrame;
