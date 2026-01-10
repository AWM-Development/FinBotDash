import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TaxNotes from '../../../../Components/packet/TaxNotes';

describe('TaxNotes', () => {
	it('should render tax notes component', () => {
		render(<TaxNotes />);

		expect(screen.getByText('Tax Notes')).toBeInTheDocument();
	});

	it('should render TLH opportunity section', () => {
		render(<TaxNotes />);

		expect(screen.getByText('TLH Opportunity')).toBeInTheDocument();
		expect(screen.getByText(/Harvest loss in VTI/i)).toBeInTheDocument();
		expect(screen.getByText(/Replace with ITOT/i)).toBeInTheDocument();
		expect(screen.getByText(/Estimated tax savings: ~\$340/i)).toBeInTheDocument();
	});

	it('should render wash sale warning section', () => {
		render(<TaxNotes />);

		expect(screen.getByText('Wash Sale Warning')).toBeInTheDocument();
		expect(screen.getByText(/Do not repurchase VTI within 30 days/i)).toBeInTheDocument();
		expect(screen.getByText(/restriction ends Feb 15, 2026/i)).toBeInTheDocument();
	});

	it('should render realized gain/loss estimate', () => {
		render(<TaxNotes />);

		expect(screen.getByText(/Est. realized gain\/loss this packet/i)).toBeInTheDocument();
		expect(screen.getByText('-$1,240')).toBeInTheDocument();
		expect(screen.getByText(/Net tax impact depends on your tax bracket/i)).toBeInTheDocument();
	});
});
