import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AIExplanation from '../../../../Components/packet/AIExplanation';

describe('AIExplanation', () => {
	it('should render AI explanation component', () => {
		render(<AIExplanation />);

		expect(screen.getByText('AI Explanation')).toBeInTheDocument();
	});

	it('should render Why These Holdings section', () => {
		render(<AIExplanation />);

		expect(screen.getByText(/Why These Holdings/i)).toBeInTheDocument();
		expect(screen.getByText(/QQQ leads due to strong tech momentum/i)).toBeInTheDocument();
	});

	it('should render Risk Posture Change section', () => {
		render(<AIExplanation />);

		expect(screen.getByText(/Risk Posture Change/i)).toBeInTheDocument();
		expect(screen.getByText(/Shifted from Neutral to Risk-On/i)).toBeInTheDocument();
	});

	it('should render What Could Go Wrong section', () => {
		render(<AIExplanation />);

		expect(screen.getByText(/What Could Go Wrong/i)).toBeInTheDocument();
		expect(screen.getByText(/Tech concentration risk if QQQ reverses/i)).toBeInTheDocument();
	});

	it('should render What Would Cause Next Month to Flip section', () => {
		render(<AIExplanation />);

		expect(screen.getByText(/What Would Cause Next Month to Flip/i)).toBeInTheDocument();
		expect(screen.getByText(/QQQ falling below its 200-day SMA/i)).toBeInTheDocument();
		expect(screen.getByText(/VIX spiking above 25/i)).toBeInTheDocument();
		expect(screen.getByText(/International equities \(EFA\) outperforming/i)).toBeInTheDocument();
	});
});
