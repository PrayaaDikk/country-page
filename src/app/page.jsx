"use client";
import { useRef, useState, useEffect } from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/react";

export default function Home() {
	const sortList = ["population", "area", "name"];
	const [selectedOption, setSelectedOption] = useState(sortList[0]);

	return (
		<div className="relative overflow-hidden h-[1000px]">
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

					{/* search country box */}
					<label
						htmlFor="searchCountry"
						className="p-2 flex gap-2 bg-blackTheme2 rounded-xl"
					>
						<img src="resources/search.svg" alt="search-icon" />
						<input
							type="text"
							placeholder="Search by Name, Region..."
							className="w-full bg-transparent border-0 focus:outline-none focus:placeholder:opacity-0 text-sm text-whiteTheme placeholder:text-grayTheme "
							id="searchCountry"
							autoComplete="off"
						/>
					</label>
				</div>
				<div className="mt-8">
					<div className="grid gap-2">
						<p className="block text-grayTheme text-xs font-semibold">
							Sort by
						</p>
						{/* dropdown */}
						<div className="relative">
							<Listbox
								value={selectedOption}
								onChange={setSelectedOption}
							>
								<ListboxButton className="w-full px-3 py-2 border-2 border-blackTheme2 rounded-xl flex items-center justify-between ">
									<p className="text-whiteTheme text-sm capitalize">
										{selectedOption}
									</p>
									<img
										src="resources/Expand_down.svg"
										alt="dropdown-icon"
									/>
								</ListboxButton>
								<ListboxOptions className="absolute w-full bg-blackTheme2 rounded-xl shadow text-sm text-whiteTheme p-1 mt-1 ">
									{sortList.map((option, i) => (
										<ListboxOption
											value={option}
											key={i}
											className="block px-3 py-2 cursor-pointer capitalize active:bg-blackTheme rounded-lg"
										>
											{option}
										</ListboxOption>
									))}
								</ListboxOptions>
							</Listbox>
						</div>
					</div>
					<div></div>
				</div>
			</section>
		</div>
	);
}
