import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../Components/ui/select';

describe('Select', () => {
	it('should render select trigger', () => {
		render(
			<Select>
				<SelectTrigger>
					<SelectValue placeholder="Select an option" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="option1">Option 1</SelectItem>
					<SelectItem value="option2">Option 2</SelectItem>
				</SelectContent>
			</Select>
		);

		expect(screen.getByText('Select an option')).toBeInTheDocument();
	});

	it('should display selected value', () => {
		render(
			<Select value="option1">
				<SelectTrigger>
					<SelectValue placeholder="Select an option" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="option1">Option 1</SelectItem>
					<SelectItem value="option2">Option 2</SelectItem>
				</SelectContent>
			</Select>
		);

		expect(screen.getByText('Option 1')).toBeInTheDocument();
	});
});
