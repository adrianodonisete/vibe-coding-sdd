import type { AppMode } from '../types/flashcards';

type PlaceholderPanelProps = {
	mode: AppMode;
	modeLabel: string;
};

const PlaceholderPanel = ({ mode, modeLabel }: PlaceholderPanelProps) => (
	<section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
		<h2 className="text-lg font-semibold text-slate-900">{modeLabel}</h2>
		<p className="mt-2 text-sm text-slate-600">
			Phase 1 complete: navigation shell and typed state are ready for this screen.
		</p>
		<p className="sr-only">Current placeholder mode: {mode}</p>
	</section>
);

export default PlaceholderPanel;
