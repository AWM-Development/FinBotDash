import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from '../../../../Components/ui/tooltip';

describe('Tooltip', () => {
	it('should render tooltip trigger', () => {
		render(
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>Hover me</TooltipTrigger>
					<TooltipContent>Tooltip content</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);

		expect(screen.getByText('Hover me')).toBeInTheDocument();
	});

	it('should show tooltip content on hover', async () => {
		const user = userEvent.setup();

		render(
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>Hover me</TooltipTrigger>
					<TooltipContent>Tooltip content</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);

		const trigger = screen.getByText('Hover me');
		await user.hover(trigger);

		await waitFor(() => {
			expect(screen.getByText('Tooltip content')).toBeInTheDocument();
		});
	});
});
