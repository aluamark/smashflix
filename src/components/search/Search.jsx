import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Search = () => {
	const [searchValue, setSearchValue] = useState("");
	const [selectOption, setSelectOption] = useState("Anime");
	const history = useNavigate();

	const handleSearchInputChanges = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchValue && selectOption === "Anime") {
				history(`/search/${selectOption}/${searchValue}`);
			} else if (searchValue && selectOption === "Movie") {
				history(`/search/${searchValue}`);
			} else {
				history("/");
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [searchValue, selectOption]);

	return (
		<form
			onSubmit={handleSubmit}
			className="flex justify-center items-center py-3 md:px-3"
		>
			<select
				value={selectOption}
				onChange={(e) => setSelectOption(e.target.value)}
				name="search-type"
				id="search-type"
				className="h-8 mr-2 px-3 text-sm text-black"
			>
				<option value="Anime">Anime</option>
				<option value="Movie">Movie</option>
			</select>
			<div className="relative w-max">
				<input
					value={searchValue}
					onChange={handleSearchInputChanges}
					type="search"
					name="search"
					id="search"
					className="relative z-10 bg-transparent w-full h-10 rounded-full border-2 border-red-600 focus:cursor-text cursor-pointer pl-8"
					placeholder={
						selectOption === "Anime" ? "Anime title..." : "Movie title..."
					}
					autoComplete="off"
				/>
				<FaSearch className="absolute inset-y-0 my-auto px-3 fill-red-600 h-6 w-10" />
			</div>
		</form>
	);
};

export default Search;
