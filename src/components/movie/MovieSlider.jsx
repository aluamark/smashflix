import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import MovieFrame from "./MovieFrame";

const MovieHome = ({ topMovies }) => {
	const slideLeft = () => {
		let slider = document.getElementById("movie-slider");
		slider.scrollLeft = slider.scrollLeft - 500;
	};

	const slideRight = () => {
		let slider = document.getElementById("movie-slider");
		slider.scrollLeft = slider.scrollLeft + 500;
	};

	return (
		<div className="bg-zinc-800">
			<div className="pl-5">
				<h1 className="text-3xl font-bold">Top Movies</h1>
			</div>
			<div className="relative flex items-center group">
				<MdChevronLeft
					onClick={slideLeft}
					className="absolute left-0 z-10 hidden group-hover:block cursor-pointer"
					size={50}
				/>
				<div
					id="movie-slider"
					className="w-full h-full mx-auto overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
				>
					{topMovies &&
						topMovies.map((movie) => {
							return (
								<div key={movie.id} className="px-1 inline-block">
									<MovieFrame movie={movie} />
								</div>
							);
						})}
				</div>
				<MdChevronRight
					onClick={slideRight}
					className="absolute right-0 z-10 hidden group-hover:block cursor-pointer"
					size={50}
				/>
			</div>
		</div>
	);
};

export default MovieHome;
