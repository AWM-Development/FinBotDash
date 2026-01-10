import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmptyState from '../../../../Components/shared/EmptyState';
import { DollarSign } from 'lucide-react';

describe('EmptyState', () => {
	it('should render with default props', () => {
		render(<EmptyState />);

		expect(screen.getByText('No data available')).toBeInTheDocument();
		expect(screen.getByText("There's nothing to show here yet.")).toBeInTheDocument();
	});

	it('should render with custom title', () => {
		render(<EmptyState title="Custom Title" />);

		expect(screen.getByText('Custom Title')).toBeInTheDocument();
	});

	it('should render with custom description', () => {
		render(<EmptyState description="Custom description" />);

		expect(screen.getByText('Custom description')).toBeInTheDocument();
	});

	it('should render with custom icon', () => {
		render(<EmptyState icon={DollarSign} />);

		const icon = screen.getByRole('img', { hidden: true }) || document.querySelector('svg');
		expect(icon).toBeInTheDocument();
	});

	it('should render action button when action provided', async () => {
		const user = userEvent.setup();
		const mockAction = vi.fn();

		render(<EmptyState action={mockAction} actionLabel="Click me" />);

		const button = screen.getByRole('button', { name: /click me/i });
		expect(button).toBeInTheDocument();

		await user.click(button);
		expect(mockAction).toHaveBeenCalledTimes(1);
	});

	it('should use default action label when not provided', () => {
		const mockAction = vi.fn();

		render(<EmptyState action={mockAction} />);

		expect(screen.getByRole('button', { name: /take action/i })).toBeInTheDocument();
	});

	it('should not render action button when action not provided', () => {
		render(<EmptyState />);

		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});
});
