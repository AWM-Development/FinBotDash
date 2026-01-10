import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TargetAllocation from '../../../../Components/packet/TargetAllocation';

describe('TargetAllocation', () => {
	it('should render target allocation component', () => {
		render(<TargetAllocation />);

		expect(screen.getByText('Target Allocation')).toBeInTheDocument();
	});

	it('should render all allocations', () => {
		render(<TargetAllocation />);

		expect(screen.getByText('QQQ')).toBeInTheDocument();
		expect(screen.getByText('SPY')).toBeInTheDocument();
		expect(screen.getByText('VNQ')).toBeInTheDocument();
	});

	it('should render allocation names', () => {
		render(<TargetAllocation />);

		expect(screen.getByText('Nasdaq 100')).toBeInTheDocument();
		expect(screen.getByText('S&P 500')).toBeInTheDocument();
		expect(screen.getByText('Real Estate')).toBeInTheDocument();
	});

	it('should render current and target percentages', () => {
		render(<TargetAllocation />);

		expect(screen.getByText(/Current: 28.5%/i)).toBeInTheDocument();
		expect(screen.getByText(/Target: 33.33%/i)).toBeInTheDocument();
		expect(screen.getByText(/Current: 35.2%/i)).toBeInTheDocument();
		expect(screen.getByText(/Current: 31.1%/i)).toBeInTheDocument();
	});

	it('should calculate and display differences', () => {
		render(<TargetAllocation />);

		// QQQ: target 33.33, current 28.5, diff = +4.83%
		expect(screen.getByText(/\+4.8%/i)).toBeInTheDocument();
		
		// SPY: target 33.33, current 35.2, diff = -1.87%
		expect(screen.getByText(/-1.9%/i)).toBeInTheDocument();
	});
});
