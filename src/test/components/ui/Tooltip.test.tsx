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
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger>Hover me</TooltipTrigger>
					<TooltipContent>Tooltip content</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);

		const trigger = screen.getByText('Hover me');
		await user.hover(trigger);

		// Tooltip content is in the DOM but may be visually hidden
		// Check that the tooltip content exists in the document
		await waitFor(
			() => {
				const tooltip = document.querySelector('[role="tooltip"]');
				expect(tooltip).toBeInTheDocument();
				expect(tooltip?.textContent).toBe('Tooltip content');
			},
			{ timeout: 2000 }
		);
	});
});
