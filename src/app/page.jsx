export default function Home() {
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
			<section className="relative mx-8 mt-36 mb-20 bg-blackTheme rounded-xl border border-blackTheme2  ">
				<h1 className="text-whiteTheme">Found 234 countries</h1>
			</section>
		</div>
	);
}
