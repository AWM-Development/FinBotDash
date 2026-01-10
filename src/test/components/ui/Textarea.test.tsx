import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '../../../../Components/ui/textarea';

describe('Textarea', () => {
	it('should render textarea element', () => {
		render(<Textarea placeholder="Enter text" />);

		expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
	});

	it('should handle user input', async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(<Textarea onChange={handleChange} />);

		const textarea = screen.getByRole('textbox');
		await user.type(textarea, 'Test input');

		expect(handleChange).toHaveBeenCalled();
	});

	it('should be disabled when disabled prop is true', () => {
		render(<Textarea disabled data-testid="test-textarea" />);

		expect(screen.getByTestId('test-textarea')).toBeDisabled();
	});

	it('should apply custom className', () => {
		render(<Textarea className="custom-textarea" data-testid="test-textarea" />);

		expect(screen.getByTestId('test-textarea')).toHaveClass('custom-textarea');
	});

	it('should handle value prop', () => {
		render(<Textarea value="Initial value" readOnly />);

		expect(screen.getByRole('textbox')).toHaveValue('Initial value');
	});
});
