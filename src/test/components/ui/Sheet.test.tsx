import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from '../../../../Components/ui/sheet';
import { Button } from '../../../../Components/ui/button';

describe('Sheet', () => {
	it('should render sheet trigger', () => {
		render(
			<Sheet>
				<SheetTrigger asChild>
					<Button>Open Sheet</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Sheet Description</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		);

		expect(screen.getByText('Open Sheet')).toBeInTheDocument();
	});

	it('should open sheet when trigger is clicked', async () => {
		const user = userEvent.setup();

		render(
			<Sheet>
				<SheetTrigger asChild>
					<Button>Open Sheet</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Sheet Title</SheetTitle>
						<SheetDescription>Sheet Description</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		);

		const trigger = screen.getByText('Open Sheet');
		await user.click(trigger);

		await waitFor(() => {
			expect(screen.getByText('Sheet Title')).toBeInTheDocument();
			expect(screen.getByText('Sheet Description')).toBeInTheDocument();
		});
	});
});
