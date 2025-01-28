export default function LoadingData() {
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
			<section className="relative mt-36 lg:mt-64 mb-20 bg-blackTheme border border-blackTheme py-6 px-4 shadow-2xl text-whiteTheme max-w-[640px] mx-auto">
				<div className="absolute left-1/2 -translate-x-1/2 top-[-30px] w-[220px] h-[150px] rounded-lg bg-grayTheme animate-pulse" />
				<div className="mt-[120px] mb-8">
					<h1 className="text-center mx-auto w-32 h-2.5 bg-grayTheme rounded-2xl animate-pulse">
						{/* country name */}
					</h1>
					<h4 className="mt-2 text-sm text-center mx-auto w-40 h-2.5 rounded-2xl animate-pulse bg-grayTheme w-">
						{/* country officially name */}
					</h4>
				</div>
				<div className="flex items-center justify-around">
					<div className="w-56 h-2.5 bg-grayTheme rounded-2xl animate-pulse">
						{/* population badge */}
					</div>
					<div className="w-56 h-2.5 bg-grayTheme rounded-2xl animate-pulse">
						{/* area badge */}
					</div>
				</div>
				<div className="mt-8">
					<div className="border-t border-blackTheme2 text-grayTheme">
						{Array.from({ length: 5 }).map((_, i) => (
							<div
								className="flex items-center justify-between p-4 border-b border-blackTheme2"
								key={i}
							>
								<p className="w-20 h-2.5 bg-grayTheme rounded-2xl animate-pulse">
									{/* name */}
								</p>
								<p className="w-24 h-2.5 bg-grayTheme rounded-2xl animate-pulse">
									{/* value */}
								</p>
							</div>
						))}
					</div>
				</div>
				<div className="mt-4">
					<h2 className="w-28 h-2.5 bg-grayTheme rounded-2xl animate-pulse">
						{/* neighbours */}
					</h2>
					<div className="flex items-start flex-wrap gap-6 mt-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<span key={i}>
								<div className="flex flex-col items-center">
									<div className="rounded-md w-[60px] h-[40px] bg-grayTheme animate-pulse" />
									<h3 className="mt-4 text-xs text-center w-16 h-2.5 bg-grayTheme rounded-2xl">
										{/* neighbour name */}
									</h3>
								</div>
							</span>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
