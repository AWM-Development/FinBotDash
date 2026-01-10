import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock AllocationDonut since it's a chart component
vi.mock('../../../../Components/charts/AllocationDonut', () => ({
	default: ({ data, size }: { data: Record<string, number>; size?: number }) => (
		<div data-testid="allocation-donut">
			{Object.entries(data).map(([key, value]) => (
				<div key={key}>
					{key}: {value}%
				</div>
			))}
			{size && <div data-size={size} />}
		</div>
	),
}));

import PortfolioSnapshot from '../../../../Components/dashboard/PortfolioSnapshot';

describe('PortfolioSnapshot', () => {
	it('should render with default props', () => {
		render(<PortfolioSnapshot />);

		expect(screen.getByText('Portfolio Snapshot')).toBeInTheDocument();
		expect(screen.getByText('Total Value')).toBeInTheDocument();
		expect(screen.getByText('$125,420')).toBeInTheDocument();
		expect(screen.getByText('Cash')).toBeInTheDocument();
		expect(screen.getByText('5.2%')).toBeInTheDocument();
		expect(screen.getByText('Holdings')).toBeInTheDocument();
		expect(screen.getByText('4')).toBeInTheDocument();
	});

	it('should render with custom props', () => {
		const customAllocation = {
			equity: 80,
			bonds: 20,
		};

		render(
			<PortfolioSnapshot
				totalValue={200000}
				cashPercent={10}
				holdingsCount={5}
				allocation={customAllocation}
			/>
		);

		expect(screen.getByText('$200,000')).toBeInTheDocument();
		expect(screen.getByText('10%')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();
	});

	it('should format total value with commas', () => {
		render(<PortfolioSnapshot totalValue={1234567} />);

		expect(screen.getByText('$1,234,567')).toBeInTheDocument();
	});

	it('should render AllocationDonut with correct props', () => {
		const allocation = { equity: 70, bonds: 30 };
		render(<PortfolioSnapshot allocation={allocation} size={160} />);

		expect(screen.getByTestId('allocation-donut')).toBeInTheDocument();
		expect(screen.getByText(/equity: 70%/i)).toBeInTheDocument();
		expect(screen.getByText(/bonds: 30%/i)).toBeInTheDocument();
	});
});
