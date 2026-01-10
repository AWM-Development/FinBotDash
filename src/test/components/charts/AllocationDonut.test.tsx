import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AllocationDonut from '../../../../Components/charts/AllocationDonut';

describe('AllocationDonut', () => {
	const mockData = {
		equity: 62.5,
		bonds: 25.3,
		real_assets: 7.0,
		cash: 5.2,
	};

	it('should render with data', () => {
		render(<AllocationDonut data={mockData} />);

		expect(screen.getByText('Equities')).toBeInTheDocument();
		expect(screen.getByText('Bonds')).toBeInTheDocument();
		expect(screen.getByText('Real Assets')).toBeInTheDocument();
		expect(screen.getByText('Cash')).toBeInTheDocument();
	});

	it('should render with custom size', () => {
		const { container } = render(<AllocationDonut data={mockData} size={300} />);

		const chartContainer = container.querySelector('div[style*="width: 300"]');
		expect(chartContainer).toBeInTheDocument();
	});

	it('should use default size when not provided', () => {
		const { container } = render(<AllocationDonut data={mockData} />);

		const chartContainer = container.querySelector('div[style*="width: 200"]');
		expect(chartContainer).toBeInTheDocument();
	});

	it('should filter out zero values', () => {
		const dataWithZeros = {
			equity: 100,
			bonds: 0,
			real_assets: 0,
			cash: 0,
		};

		render(<AllocationDonut data={dataWithZeros} />);

		expect(screen.getByText('Equities')).toBeInTheDocument();
		expect(screen.queryByText('Bonds')).not.toBeInTheDocument();
		expect(screen.queryByText('Real Assets')).not.toBeInTheDocument();
		expect(screen.queryByText('Cash')).not.toBeInTheDocument();
	});

	it('should display percentages correctly', () => {
		render(<AllocationDonut data={mockData} />);

		expect(screen.getByText('62.5%')).toBeInTheDocument();
		expect(screen.getByText('25.3%')).toBeInTheDocument();
		expect(screen.getByText('7.0%')).toBeInTheDocument();
		expect(screen.getByText('5.2%')).toBeInTheDocument();
	});

	it('should handle partial data', () => {
		const partialData = {
			equity: 75,
			bonds: 25,
		};

		render(<AllocationDonut data={partialData} />);

		expect(screen.getByText('Equities')).toBeInTheDocument();
		expect(screen.getByText('Bonds')).toBeInTheDocument();
	});

	it('should handle empty data', () => {
		render(<AllocationDonut data={{}} />);

		// Should render but with no items
		const container = screen.getByRole('generic');
		expect(container).toBeInTheDocument();
	});

	it('should handle undefined values in data', () => {
		const dataWithUndefined = {
			equity: 100,
			bonds: undefined,
		};

		render(<AllocationDonut data={dataWithUndefined} />);

		expect(screen.getByText('Equities')).toBeInTheDocument();
	});
});
