import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../../../../Components/ui/checkbox';

describe('Checkbox', () => {
	it('should render checkbox element', () => {
		render(<Checkbox data-testid="test-checkbox" />);

		expect(screen.getByTestId('test-checkbox')).toBeInTheDocument();
	});

	it('should be checked when checked prop is true', () => {
		render(<Checkbox checked data-testid="test-checkbox" />);

		expect(screen.getByTestId('test-checkbox')).toHaveAttribute('data-state', 'checked');
	});

	it('should be disabled when disabled prop is true', () => {
		render(<Checkbox disabled data-testid="test-checkbox" />);

		expect(screen.getByTestId('test-checkbox')).toBeDisabled();
	});

	it('should call onCheckedChange when clicked', async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(<Checkbox onCheckedChange={handleChange} data-testid="test-checkbox" />);

		const checkbox = screen.getByTestId('test-checkbox');
		await user.click(checkbox);

		expect(handleChange).toHaveBeenCalled();
	});

	it('should apply custom className', () => {
		render(<Checkbox className="custom-checkbox" data-testid="test-checkbox" />);

		expect(screen.getByTestId('test-checkbox')).toHaveClass('custom-checkbox');
	});
});
