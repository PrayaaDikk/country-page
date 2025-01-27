"use client";
import { useState, useEffect } from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/react";

export default function Home() {
	const optionsList = ["population", "area", "name"];
	const regionsList = [
		"americas",
		"antarctic",
		"africa",
		"asia",
		"europe",
		"oceania",
	];
	const [activeRegions, setActiveRegions] = useState([
		"americas",
		"africa",
		"asia",
		"europe",
	]);
	const [selectedOption, setSelectedOption] = useState(optionsList[0]);
	const [countriesStatus, setCountriesStatus] = useState(["independent"]);
	const [searchTerm, setSearchTerm] = useState("");
	const [country, setCountry] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemPerPage = 10;

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await fetch(
					"https://restcountries.com/v3.1/all?fields=name,flags,population,area,region,unMember,independent"
				);
				const data = await res.json();

				const sortData = (data, key, isNumeric = false) => {
					return [...data].sort((a, b) =>
						isNumeric
							? b[key] - a[key]
							: a[key]?.common.localeCompare(b[key]?.common)
					);
				};

				const filteredData = data.filter((item) => {
					const matchesRegion = activeRegions.includes(
						item.region?.toLowerCase()
					);

					const isUnMemberActive =
						countriesStatus.includes("unMember");
					const isIndependentActive =
						countriesStatus.includes("independent");

					if (isUnMemberActive && isIndependentActive) {
						return (
							matchesRegion &&
							item.unMember === true &&
							item.independent === true
						);
					} else if (isUnMemberActive || isIndependentActive) {
						return (
							matchesRegion &&
							(isUnMemberActive
								? item.unMember === true
								: item.independent === true)
						);
					} else {
						return (
							matchesRegion &&
							item.unMember === false &&
							item.independent === false
						);
					}
				});

				const sortedData = (() => {
					switch (selectedOption) {
						case "population":
							return sortData(filteredData, "population", true);
						case "area":
							return sortData(filteredData, "area", true);
						default:
							return sortData(filteredData, "name");
					}
				})();

				const searchFilteredData = sortedData.filter((item) => {
					const nameMatch = item.name.common
						.toLowerCase()
						.includes(searchTerm.toLowerCase());
					const regionMatch = item.region
						?.toLowerCase()
						.includes(searchTerm.toLowerCase());
					return nameMatch || regionMatch;
				});

				setCountry(searchFilteredData);
				setCurrentPage(1);
			} catch (err) {
				console.error("Error fetching data:", err);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			}
		};

		fetchData();
	}, [selectedOption, activeRegions, countriesStatus, searchTerm]);

	const indexOfLastItem = currentPage * itemPerPage;
	const indexOfFirstItem = indexOfLastItem - itemPerPage;
	const currentDataCountries = country.slice(
		indexOfFirstItem,
		indexOfLastItem
	);
	const totalPages = Math.ceil(country.length / itemPerPage);

	const handlePagination = (direction) => {
		if (direction == "prev" && currentPage > 1) {
			setCurrentPage(currentPage - 1);
		} else if (direction == "next" && currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handleActiveRegion = (region) => {
		setActiveRegions((prevRegion) =>
			prevRegion.includes(region)
				? prevRegion.filter((item) => item !== region)
				: [...prevRegion, region]
		);
	};

	const handleCountriesStatus = (status) => {
		setCountriesStatus((prevStatus) =>
			prevStatus.includes(status)
				? prevStatus.filter((item) => item !== status)
				: [...prevStatus, status]
		);
	};

	const formattedNumber = (number) => {
		return new Intl.NumberFormat("en-US").format(number);
	};

	return (
		<div className="relative overflow-x-hidden overflow-y-scroll">
			<img
				src="resources/hero-image.jpg"
				alt="hero-background"
				className="max-w-none object-center absolute left-1/2 -translate-x-1/2 lg:w-full"
			/>

			<img
				src="resources/Logo.svg"
				alt="logo"
				className="absolute top-0 left-1/2 -translate-x-1/2 my-10"
			/>
			<section className="relative mx-2 mt-36 mb-20 bg-blackTheme rounded-xl border border-blackTheme py-6 px-4 shadow-lg ">
				<div className="flex flex-col gap-4 ">
					<h1 className="text-whiteTheme ">
						Found {country.length} countries
					</h1>

					<label
						htmlFor="searchCountry"
						className="p-2 flex gap-2 bg-blackTheme2 rounded-xl"
					>
						<img src="resources/Search.svg" alt="search-icon" />
						<input
							type="text"
							placeholder="Search by Name, Region..."
							className="w-full bg-transparent border-0 focus:outline-none focus:placeholder:opacity-0 text-sm text-whiteTheme placeholder:text-grayTheme "
							id="searchCountry"
							autoComplete="off"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</label>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6">
					<div>
						<div className="grid gap-y-2 mt-8">
							<p className="text-grayTheme text-xs font-semibold">
								Sort by
							</p>
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
										{optionsList.map((option, i) => (
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

						<div className="mt-8 grid grid-cols-1 gap-y-2">
							<p className="text-grayTheme text-xs font-semibold">
								Region
							</p>
							<div className="flex flex-wrap gap-4">
								{regionsList.map((region) => (
									<button
										className={`px-3 py-2 text-whiteTheme text-sm rounded-xl capitalize ${
											activeRegions.includes(region)
												? "bg-blackTheme2"
												: ""
										} `}
										key={region}
										onClick={() =>
											handleActiveRegion(region)
										}
									>
										{region}
									</button>
								))}
							</div>
						</div>

						<div className="grid grid-cols-1 gap-y-2 mt-8">
							<p className="text-grayTheme text-xs font-semibold">
								Status
							</p>
							<div
								className="flex items-center gap-2"
								onClick={() =>
									handleCountriesStatus("unMember")
								}
							>
								<span
									className={`border-2 rounded-md ${
										countriesStatus.includes("unMember")
											? "bg-blueTheme border-blueTheme"
											: "border-whiteTheme [&>img]:opacity-0"
									}`}
								>
									<img src="resources/Done_round.svg" />
								</span>
								<label
									htmlFor="unMemberCheckbox"
									className="text-whiteTheme text-sm"
								>
									Member of the United Nations
								</label>
							</div>
							<div
								className="flex items-center gap-2"
								onClick={() =>
									handleCountriesStatus("independent")
								}
							>
								<span
									className={`border-2 rounded-md ${
										countriesStatus.includes("independent")
											? "bg-blueTheme border-blueTheme"
											: "border-whiteTheme [&>img]:opacity-0"
									}`}
								>
									<img src="resources/Done_round.svg" />
								</span>
								<label
									htmlFor="independentCheckbox"
									className="text-whiteTheme text-sm"
								>
									Independent
								</label>
							</div>
						</div>
					</div>

					<div
						className={`${
							currentDataCountries.length > 0
								? "min-h-[535px]"
								: ""
						} mt-8 flex flex-col justify-between lg:col-span-2`}
					>
						<table className="table-fixed w-full text-left text-whiteTheme [&>thead>tr>th]:py-4 [&>thead>tr>th]:px-2 [&>tbody>tr>td]:py-3 [&>tbody>tr>td]:px-2 ">
							<thead className="text-grayTheme text-xs border-b-2 border-blackTheme2 ">
								<tr>
									<th>Flag</th>
									<th>Name</th>
									<th>Populations</th>
									<th>Area (Km²)</th>
									<th className="max-lg:hidden">Region</th>
								</tr>
							</thead>
							<tbody className="text-sm sm:text-base">
								{isLoading ? (
									Array.from({ length: 10 }).map((_, i) => (
										<tr key={i}>
											<td>
												<span className="flag-size bg-grayTheme rounded-md block animate-pulse"></span>
											</td>
											<td>
												<span className="w-[80px] h-[10px] bg-grayTheme rounded-md block animate-pulse"></span>
											</td>
											<td>
												<span className="w-[80px] h-[10px] bg-grayTheme rounded-md block animate-pulse"></span>
											</td>
											<td>
												<span className="w-[80px] h-[10px] bg-grayTheme rounded-md block animate-pulse"></span>
											</td>
											<td className="max-lg:hidden">
												<span className="w-[80px] h-[10px] bg-grayTheme rounded-md block animate-pulse"></span>
											</td>
										</tr>
									))
								) : currentDataCountries.length < 1 &&
								  !isLoading ? (
									<tr>
										<td colSpan="4">
											<p className="text-center text-grayTheme py-2 text-sm">
												No country found
											</p>
										</td>
									</tr>
								) : (
									currentDataCountries.map((item) => (
										<tr
											key={item.name.common.toLowerCase()}
										>
											<td>
												<img
													src={item.flags.png}
													alt={
														item.flags.alt ||
														"Country flag"
													}
													className="flag-size rounded-md"
												/>
											</td>
											<td>{item.name.common}</td>
											<td>
												{formattedNumber(
													item.population
												)}
											</td>
											<td>
												{formattedNumber(item.area)}
											</td>
											<td className="max-lg:hidden">
												{item.region}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
						<div
							className={`${
								currentDataCountries.length > 0 ? "" : "hidden"
							} mt-8 flex items-center justify-between `}
						>
							<button
								className="pagination-button"
								onClick={() => handlePagination("prev")}
								disabled={currentPage === 1}
							>
								Previous
							</button>
							<div className="flex items-end text-grayTheme gap-x-4">
								<p
									className={`text-sm text-blackTheme2 ${
										currentPage === 1 ? "opacity-0" : ""
									}`}
								>
									{currentPage - 1}
								</p>
								<p>{currentPage}</p>
								<p
									className={`text-sm text-blackTheme2 ${
										currentPage === totalPages
											? "opacity-0"
											: ""
									}`}
								>
									{currentPage + 1}
								</p>
							</div>
							<button
								className="pagination-button"
								onClick={() => handlePagination("next")}
								disabled={currentPage === totalPages}
							>
								Next
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
