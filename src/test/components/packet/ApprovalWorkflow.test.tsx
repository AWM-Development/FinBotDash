import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApprovalWorkflow from '../../../../Components/packet/ApprovalWorkflow';

describe('ApprovalWorkflow', () => {
	it('should render with pending status by default', () => {
		render(<ApprovalWorkflow />);

		expect(screen.getByText('Approval Workflow')).toBeInTheDocument();
		expect(screen.getByText(/Status:/i)).toBeInTheDocument();
		expect(screen.getByText('Pending')).toBeInTheDocument();
	});

	it('should render with reviewed status', () => {
		render(<ApprovalWorkflow status="reviewed" />);

		expect(screen.getByText('Reviewed')).toBeInTheDocument();
	});

	it('should render with approved status', () => {
		render(<ApprovalWorkflow status="approved" />);

		expect(screen.getByText('Approved')).toBeInTheDocument();
	});

	it('should enable review button when pending', () => {
		render(<ApprovalWorkflow status="pending" />);

		const reviewButton = screen.getByRole('button', { name: /mark as reviewed/i });
		expect(reviewButton).not.toBeDisabled();
	});

	it('should disable review button when reviewed', () => {
		render(<ApprovalWorkflow status="reviewed" />);

		const reviewButton = screen.getByRole('button', { name: /mark as reviewed/i });
		expect(reviewButton).toBeDisabled();
	});

	it('should disable approve button when not reviewed', () => {
		render(<ApprovalWorkflow status="pending" />);

		const approveButton = screen.getByRole('button', { name: /approve packet/i });
		expect(approveButton).toBeDisabled();
	});

	it('should enable approve button when reviewed', async () => {
		const user = userEvent.setup();
		render(<ApprovalWorkflow status="pending" />);

		const reviewButton = screen.getByRole('button', { name: /mark as reviewed/i });
		await user.click(reviewButton);

		await waitFor(() => {
			const approveButton = screen.getByRole('button', { name: /approve packet/i });
			expect(approveButton).not.toBeDisabled();
		});
	});

	it('should handle approval workflow', async () => {
		const user = userEvent.setup();
		render(<ApprovalWorkflow status="pending" />);

		// Step 1: Mark as reviewed
		const reviewButton = screen.getByRole('button', { name: /mark as reviewed/i });
		await user.click(reviewButton);

		await waitFor(() => {
			expect(screen.getByText('Reviewed')).toBeInTheDocument();
		});

		// Step 2: Approve
		const approveButton = screen.getByRole('button', { name: /approve packet/i });
		await user.click(approveButton);

		await waitFor(() => {
			expect(screen.getByText('Approved')).toBeInTheDocument();
		});
	});

	it('should handle notes input', async () => {
		const user = userEvent.setup();
		render(<ApprovalWorkflow />);

		const textarea = screen.getByPlaceholderText(/add notes about this rebalance/i);
		await user.type(textarea, 'Test notes');

		expect(textarea).toHaveValue('Test notes');
	});

	it('should render export orders button', () => {
		render(<ApprovalWorkflow />);

		expect(screen.getByRole('button', { name: /export orders/i })).toBeInTheDocument();
	});

	it('should render deviation dialog trigger', () => {
		render(<ApprovalWorkflow />);

		expect(screen.getByRole('button', { name: /i deviated from recommendations/i })).toBeInTheDocument();
	});

	it('should open deviation dialog', async () => {
		const user = userEvent.setup();
		render(<ApprovalWorkflow />);

		const deviationButton = screen.getByRole('button', { name: /i deviated from recommendations/i });
		await user.click(deviationButton);

		await waitFor(() => {
			expect(screen.getByText('Record Deviation')).toBeInTheDocument();
		});
	});
});
