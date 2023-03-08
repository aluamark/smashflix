import React from "react";

const Alert = ({ alertMsg, setShowAlert }) => {
	return (
		<div className="flex justify-between gap-5 border border-red-500 p-1 m-1">
			<p className="flex items-center gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					className="flex-none fill-red-500 h-5 w-5 mx-3"
				>
					<path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
				</svg>
				{alertMsg}
			</p>
			<button onClick={() => setShowAlert(false)} className="flex-none px-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 320 512"
					className="fill-red-500 h-5 w-5"
				>
					<path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
				</svg>
			</button>
		</div>
	);
};

export default Alert;
