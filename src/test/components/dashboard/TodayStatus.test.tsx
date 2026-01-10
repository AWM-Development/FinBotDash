import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodayStatus from '../../../../Components/dashboard/TodayStatus';

describe('TodayStatus', () => {
	it('should render with default props', () => {
		render(<TodayStatus />);

		expect(screen.getByText("Today's Status")).toBeInTheDocument();
		expect(screen.getByText('Next rebalance')).toBeInTheDocument();
		expect(screen.getByText('Feb 3, 2026')).toBeInTheDocument();
		expect(screen.getByText('Regime')).toBeInTheDocument();
		expect(screen.getByText('Choppy Risk-On')).toBeInTheDocument();
		expect(screen.getByText('Risk posture')).toBeInTheDocument();
		expect(screen.getByText('Neutral')).toBeInTheDocument();
		expect(screen.getByText('Prices updated')).toBeInTheDocument();
	});

	it('should render with custom props', () => {
		render(
			<TodayStatus
				nextRebalance="March 1, 2026"
				regime="Risk-On"
				riskPosture="Aggressive"
				dataFreshness="yesterday 2:00pm ET"
			/>
		);

		expect(screen.getByText('March 1, 2026')).toBeInTheDocument();
		expect(screen.getByText('Risk-On')).toBeInTheDocument();
		expect(screen.getByText('Aggressive')).toBeInTheDocument();
		expect(screen.getByText('yesterday 2:00pm ET')).toBeInTheDocument();
	});

	it('should render all status sections', () => {
		render(<TodayStatus />);

		expect(screen.getByText(/next rebalance/i)).toBeInTheDocument();
		expect(screen.getByText(/regime/i)).toBeInTheDocument();
		expect(screen.getByText(/risk posture/i)).toBeInTheDocument();
		expect(screen.getByText(/prices updated/i)).toBeInTheDocument();
	});
});
