import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MetricCard from '../../../../Components/shared/MetricCard';
import { TrendingUp } from 'lucide-react';

describe('MetricCard', () => {
	it('should render with title and value', () => {
		render(<MetricCard title="Test Title" value="100" />);

		expect(screen.getByText('Test Title')).toBeInTheDocument();
		expect(screen.getByText('100')).toBeInTheDocument();
	});

	it('should render with subtitle', () => {
		render(<MetricCard title="Test Title" value="100" subtitle="Test subtitle" />);

		expect(screen.getByText('Test Title')).toBeInTheDocument();
		expect(screen.getByText('100')).toBeInTheDocument();
		expect(screen.getByText('Test subtitle')).toBeInTheDocument();
	});

	it('should render with change and trend up', () => {
		render(<MetricCard title="Test Title" value="100" change="+5%" trend="up" />);

		expect(screen.getByText('Test Title')).toBeInTheDocument();
		expect(screen.getByText('100')).toBeInTheDocument();
		expect(screen.getByText('+5%')).toBeInTheDocument();
	});

	it('should render with change and trend down', () => {
		render(<MetricCard title="Test Title" value="100" change="-5%" trend="down" />);

		expect(screen.getByText('Test Title')).toBeInTheDocument();
		expect(screen.getByText('100')).toBeInTheDocument();
		expect(screen.getByText('-5%')).toBeInTheDocument();
	});

	it('should render with change label', () => {
		render(<MetricCard title="Test Title" value="100" change="+5%" changeLabel="vs SPY" trend="up" />);

		expect(screen.getByText('Test Title')).toBeInTheDocument();
		expect(screen.getByText('100')).toBeInTheDocument();
		expect(screen.getByText('+5%')).toBeInTheDocument();
		expect(screen.getByText('vs SPY')).toBeInTheDocument();
	});

	it('should render with icon', () => {
		render(<MetricCard title="Test Title" value="100" icon={TrendingUp} />);

		expect(screen.getByText('Test Title')).toBeInTheDocument();
		expect(screen.getByText('100')).toBeInTheDocument();
	});

	it('should apply custom className', () => {
		const { container } = render(
			<MetricCard title="Test Title" value="100" className="custom-class" />
		);

		const card = container.querySelector('.custom-class');
		expect(card).toBeInTheDocument();
	});

	it('should render with neutral trend', () => {
		render(<MetricCard title="Test Title" value="100" change="0%" trend="neutral" />);

		expect(screen.getByText('Test Title')).toBeInTheDocument();
		expect(screen.getByText('100')).toBeInTheDocument();
		expect(screen.getByText('0%')).toBeInTheDocument();
	});

	it('should prioritize subtitle when no change provided', () => {
		render(<MetricCard title="Test Title" value="100" subtitle="Test subtitle" />);

		expect(screen.getByText('Test subtitle')).toBeInTheDocument();
	});

	it('should prioritize change when both change and subtitle provided', () => {
		render(
			<MetricCard
				title="Test Title"
				value="100"
				change="+5%"
				subtitle="Test subtitle"
				trend="up"
			/>
		);

		expect(screen.getByText('+5%')).toBeInTheDocument();
		expect(screen.queryByText('Test subtitle')).not.toBeInTheDocument();
	});
});
