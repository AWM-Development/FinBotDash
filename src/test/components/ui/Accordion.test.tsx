import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '../../../../Components/ui/accordion';

describe('Accordion', () => {
	it('should render accordion with items', () => {
		render(
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Trigger 1</AccordionTrigger>
					<AccordionContent>Content 1</AccordionContent>
				</AccordionItem>
			</Accordion>
		);

		expect(screen.getByText('Trigger 1')).toBeInTheDocument();
	});

	it('should show content when triggered', async () => {
		const user = userEvent.setup();

		render(
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Trigger 1</AccordionTrigger>
					<AccordionContent>Content 1</AccordionContent>
				</AccordionItem>
			</Accordion>
		);

		const trigger = screen.getByText('Trigger 1');
		await user.click(trigger);

		await waitFor(() => {
			expect(screen.getByText('Content 1')).toBeInTheDocument();
		});
	});
});
