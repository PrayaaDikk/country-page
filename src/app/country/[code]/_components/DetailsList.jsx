export default function DetailsList({ name, value, borderBottom = false }) {
	return (
		<>
			<div
				className={`flex items-center justify-between p-4 ${
					borderBottom && "border-b border-blackTheme2"
				}`}
			>
				<p className="text-sm">{name}</p>
				<p className="text-sm">{value}</p>
			</div>
		</>
	);
}
