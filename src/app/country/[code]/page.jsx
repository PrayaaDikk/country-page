"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DetailsList from "./_components/DetailsList";

export default function Details() {
	const { code } = useParams();
	const [country, setCountry] = useState(null);
	const details = [
		"Capital",
		"Subregion",
		"Language",
		"Currencies",
		"Continents",
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(
					`https://restcountries.com/v3.1/alpha/${code}`
				);
				const data = await res.json();
				if (!data || !data.length) {
					console.error("Country data not found.");
					setCountry(null);
					return;
				}
				setCountry(data[0]);
			} catch (error) {
				console.error("Error fetching country data:", error);
				setCountry(null);
			}
		};

		if (code) fetchData();
	}, [code]);

	// Fallback jika data belum tersedia
	if (!code) {
		return (
			<p className="text-center text-whiteTheme">Invalid Country Code</p>
		);
	}

	if (!country) {
		return <p className="text-center text-whiteTheme">Loading...</p>;
	}

	// Format angka
	const formattedNumber = (number) => {
		return new Intl.NumberFormat("en-US").format(number);
	};

	return (
		<div className="relative overflow-x-hidden overflow-y-scroll">
			<img
				src="/resources/hero-image.jpg"
				alt="hero-background"
				className="max-w-none w-[1500px] 2xl:w-full object-cover object-center absolute left-1/2 -translate-x-1/2"
			/>

			<img
				src="/resources/Logo.svg"
				alt="logo"
				className="absolute top-0 left-1/2 -translate-x-1/2 my-10 lg:top-14"
			/>
			<section className="relative mt-36 lg:mt-64 mb-20 bg-blackTheme border border-blackTheme py-6 px-4 shadow-lg text-whiteTheme ">
				<img
					src={country.flags?.png}
					alt={country.flags?.alt || "Country flag"}
					className="absolute left-1/2 -translate-x-1/2 top-[-30px] w-[220px] h-[150px] rounded-lg"
				/>
				<div className="mt-[120px] mb-8">
					<h1 className="text-center text-[32px] font-semibold">
						{country.name?.common}
					</h1>
					<h4 className="text-sm text-center">
						{country.name?.official}
					</h4>
				</div>
				<div className="flex items-center justify-around">
					<div className="badge-maybe">
						<h5>Population</h5>
						<div className="w-[1px] h-[20px] bg-blackTheme"></div>
						<h5>{formattedNumber(country.population)}</h5>
					</div>
					<div className="badge-maybe">
						<h5>Area (Km²)</h5>
						<div className="w-[1px] h-[20px] bg-blackTheme"></div>
						<h5>{formattedNumber(country.area)}</h5>
					</div>
				</div>
				<div className="mt-8">
					<div className="border-y border-blackTheme2 text-grayTheme font-semibold">
						<DetailsList
							name="Capital"
							value={country.capital}
							borderBottom
						/>
						<DetailsList
							name="Subregion"
							value={country.subregion}
							borderBottom
						/>
						<DetailsList
							name="Language"
							value={
								country.languages
									? Object.values(country.languages).join(
											", "
									  )
									: ""
							}
							borderBottom
						/>
						<DetailsList
							name="Currencies"
							value={
								country.currencies
									? Object.values(country.currencies)
											.map((currency) => currency.name)
											.join(", ")
									: ""
							}
							borderBottom
						/>
						<DetailsList
							name="Continents"
							value={country.continents}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
