import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '../../../../Components/ui/dialog';
import { Button } from '../../../../Components/ui/button';

describe('Dialog', () => {
	it('should render dialog trigger', () => {
		render(
			<Dialog>
				<DialogTrigger asChild>
					<Button>Open Dialog</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Dialog Title</DialogTitle>
						<DialogDescription>Dialog Description</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button>Close</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);

		expect(screen.getByText('Open Dialog')).toBeInTheDocument();
	});

	it('should open dialog when trigger is clicked', async () => {
		const user = userEvent.setup();

		render(
			<Dialog>
				<DialogTrigger asChild>
					<Button>Open Dialog</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Dialog Title</DialogTitle>
						<DialogDescription>Dialog Description</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		);

		const trigger = screen.getByText('Open Dialog');
		await user.click(trigger);

		await waitFor(() => {
			expect(screen.getByText('Dialog Title')).toBeInTheDocument();
			expect(screen.getByText('Dialog Description')).toBeInTheDocument();
		});
	});
});
