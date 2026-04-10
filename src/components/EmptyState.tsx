const EmptyState = () => (
	<section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
		<h2 className="text-lg font-semibold text-slate-900">No cards available yet</h2>
		<p className="mt-2 text-sm text-slate-600">
			Add Spanish to English cards to start studying. Study and quiz actions are disabled until cards exist.
		</p>
	</section>
);

export default EmptyState;
