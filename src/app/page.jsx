"use client";
import { useState } from "react";

export default function Home() {
	const [isOpenDropDown, setIsOpenDropDown] = useState(false);
	const sortList = ["Population", "Area", "Name"];

	return (
		<div className="relative overflow-hidden">
			<img
				src="resources/hero-image.jpg"
				alt="hero-background"
				className="max-w-none object-center absolute left-1/2 -translate-x-1/2"
			/>

			<img
				src="resources/Logo.svg"
				alt="logo"
				className="absolute top-0 left-1/2 -translate-x-1/2 my-10"
			/>
			<section className="relative mx-4 mt-36 mb-20 bg-blackTheme rounded-xl border border-blackTheme2 pt-6 px-2 ">
				<div className="flex flex-col gap-4 ">
					<h1 className="text-whiteTheme ">Found 234 countries</h1>
					<label
						htmlFor="searchCountry"
						className="p-2 flex gap-2 bg-blackTheme2 rounded-xl"
					>
						<img src="resources/search.svg" alt="search-icon" />
						<input
							type="text"
							placeholder="Search by Name, Region..."
							className="w-full bg-transparent border-0 focus:outline-none 
						focus:placeholder:opacity-0 text-sm text-whiteTheme placeholder:text-whiteTheme "
							id="searchCountry"
						/>
					</label>
				</div>
				<div className="mt-8">
					<div className="">
						<div>
							<p className="block text-whiteTheme text-xs font-semibold ">
								Sort by
							</p>
						</div>
					</div>
					<div></div>
				</div>
			</section>
		</div>
	);
}
