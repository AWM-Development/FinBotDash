import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableCell,
	TableHead,
	TableFooter,
	TableCaption,
} from '../../../../Components/ui/table';

describe('Table', () => {
	it('should render table with all components', () => {
		render(
			<Table>
				<TableCaption>Test Table</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Value</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Test</TableCell>
						<TableCell>100</TableCell>
					</TableRow>
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell>Total</TableCell>
						<TableCell>200</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		);

		expect(screen.getByText('Test Table')).toBeInTheDocument();
		expect(screen.getByText('Name')).toBeInTheDocument();
		expect(screen.getByText('Value')).toBeInTheDocument();
		expect(screen.getByText('Test')).toBeInTheDocument();
		expect(screen.getAllByText('100')[0]).toBeInTheDocument();
		expect(screen.getByText('Total')).toBeInTheDocument();
		expect(screen.getByText('200')).toBeInTheDocument();
	});

	it('should apply custom className', () => {
		const { container } = render(
			<Table className="custom-table">
				<TableBody>
					<TableRow>
						<TableCell>Test</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		);

		const table = container.querySelector('.custom-table');
		expect(table).toBeInTheDocument();
	});
});
