import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../../../../Components/shared/StatusBadge';

describe('StatusBadge', () => {
	it('should render with status', () => {
		render(<StatusBadge status="pending" />);

		expect(screen.getByText(/pending/i)).toBeInTheDocument();
	});

	it('should render with icon by default', () => {
		const { container } = render(<StatusBadge status="approved" />);

		const icon = container.querySelector('svg');
		expect(icon).toBeInTheDocument();
	});

	it('should hide icon when showIcon is false', () => {
		const { container } = render(<StatusBadge status="approved" showIcon={false} />);

		const icon = container.querySelector('svg');
		expect(icon).not.toBeInTheDocument();
	});

	it('should render all valid statuses', () => {
		const statuses = [
			'eligible',
			'selected',
			'warning',
			'pending',
			'approved',
			'reviewed',
			'ineligible',
			'risk-on',
			'risk-off',
			'choppy',
			'buy',
			'sell',
		];

		statuses.forEach((status) => {
			const { unmount } = render(<StatusBadge status={status} />);
			expect(screen.getByText(new RegExp(status.replace(/-/g, ' '), 'i'))).toBeInTheDocument();
			unmount();
		});
	});

	it('should default to pending for invalid status', () => {
		render(<StatusBadge status="invalid" />);

		// StatusBadge uses pending config for invalid status but displays the status text
		expect(screen.getByText('Invalid')).toBeInTheDocument();
	});

	it('should handle undefined status', () => {
		render(<StatusBadge status={undefined} />);

		expect(screen.getByText(/pending/i)).toBeInTheDocument();
	});

	it('should format status with capital letter and spaces', () => {
		render(<StatusBadge status="risk-on" />);

		expect(screen.getByText('Risk on')).toBeInTheDocument();
	});

	it('should apply custom className', () => {
		const { container } = render(<StatusBadge status="pending" className="custom-class" />);

		const badge = container.querySelector('.custom-class');
		expect(badge).toBeInTheDocument();
	});
});
