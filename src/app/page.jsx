"use client";
import { useState, useEffect } from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from "@headlessui/react";

export default function Home() {
	const optionList = ["population", "area", "name"];
	const regionList = [
		"americas",
		"antarctic",
		"africa",
		"asia",
		"europe",
		"oceania",
	];
	const [activeRegion, setActiveRegion] = useState([
		"americas",
		"africa",
		"asia",
		"europe",
	]);
	const [selectedOption, setSelectedOption] = useState(optionList[0]);
	const [countriesStatus, setCountriesStatus] = useState(["independent"]);
	const [searchTerm, setSearchTerm] = useState("");
	const [country, setCountry] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
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
					const matchesRegion = activeRegion.includes(
						item.region?.toLowerCase()
					);

					const isExcludedStatus =
						item.independent === false && item.unMember === false;

					const matchesStatus =
						isExcludedStatus ||
						countriesStatus.some((status) => {
							if (status === "unMember")
								return item.unMember === true;
							if (status === "independent")
								return item.independent === true;
							return false;
						});

					return matchesRegion && matchesStatus;
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
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		};

		fetchData();
	}, [selectedOption, activeRegion, countriesStatus, searchTerm]);

	const handleActiveRegion = (region) => {
		setActiveRegion((prevRegion) =>
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
				className="max-w-none object-center absolute left-1/2 -translate-x-1/2"
			/>

			<img
				src="resources/Logo.svg"
				alt="logo"
				className="absolute top-0 left-1/2 -translate-x-1/2 my-10"
			/>
			<section className="relative mx-4 mt-36 mb-20 bg-blackTheme rounded-xl border border-blackTheme2 py-6 px-4 ">
				<div className="flex flex-col gap-4 ">
					<h1 className="text-whiteTheme ">
						Found {country.length} countries
					</h1>

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
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</label>
				</div>
				<div className="grid grid-cols-1">
					{/* dropdown */}
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
									{optionList.map((option, i) => (
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

					{/* region category */}
					<div className="mt-8 grid gap-y-2">
						<p className="text-grayTheme text-xs font-semibold">
							Region
						</p>
						<div className="flex flex-wrap gap-4">
							{regionList.map((region) => (
								<button
									className={`px-3 py-2 text-whiteTheme text-sm rounded-xl capitalize ${
										activeRegion.includes(region)
											? "bg-blackTheme2"
											: ""
									} `}
									key={region}
									onClick={() => handleActiveRegion(region)}
								>
									{region}
								</button>
							))}
						</div>
					</div>

					{/* country status */}
					<div className="grid gap-y-2 mt-8">
						<p className="text-grayTheme text-xs font-semibold">
							Status
						</p>
						<div
							className="flex items-center gap-2"
							onClick={() => handleCountriesStatus("unMember")}
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
							onClick={() => handleCountriesStatus("independent")}
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

					{/* country list */}
					<div className="mt-8">
						<table className="table-fixed w-full text-left text-whiteTheme [&>thead>tr>th]:py-4 [&>tbody>tr>td]:py-3 ">
							<thead className="text-grayTheme text-xs border-b-2 border-blackTheme2 ">
								<tr>
									<th>Flag</th>
									<th>Name</th>
									<th>Populations</th>
									<th>Area</th>
								</tr>
							</thead>
							<tbody>
								{country.length === 0 ? (
									<tr>
										<td>No country found</td>
									</tr>
								) : (
									country.map((item) => (
										<tr
											key={item.name.common.toLowerCase()}
										>
											<td>
												<img
													src={item.flags.png}
													alt={item.flags.alt}
													className="w-[60px] h-[40px] rounded-md"
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
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</div>
	);
}
