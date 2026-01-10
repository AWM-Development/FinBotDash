import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ActionNeeded from '../../../../Components/dashboard/ActionNeeded';

const renderWithRouter = (component: React.ReactElement) => {
	return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ActionNeeded', () => {
	it('should render action needed component', () => {
		renderWithRouter(<ActionNeeded />);

		expect(screen.getByText('Action Needed')).toBeInTheDocument();
	});

	it('should render all action items', () => {
		renderWithRouter(<ActionNeeded />);

		expect(screen.getByText(/Review Rebalance Packet/i)).toBeInTheDocument();
		expect(screen.getByText(/TLH opportunity detected/i)).toBeInTheDocument();
		expect(screen.getByText(/Wash-sale risk/i)).toBeInTheDocument();
	});

	it('should render action descriptions', () => {
		renderWithRouter(<ActionNeeded />);

		expect(screen.getByText(/Monthly rebalance recommendations ready/i)).toBeInTheDocument();
		expect(screen.getByText(/Potential tax savings/i)).toBeInTheDocument();
		expect(screen.getByText(/30-day restriction ends/i)).toBeInTheDocument();
	});

	it('should render links to correct pages', () => {
		renderWithRouter(<ActionNeeded />);

		const links = screen.getAllByRole('link');
		expect(links.length).toBeGreaterThan(0);
		
		// Check that links point to correct pages
		links.forEach((link) => {
			expect(link).toHaveAttribute('href');
			const href = link.getAttribute('href');
			expect(href).toMatch(/\/rebalance-packet|\/tax-tlh/);
		});
	});
});
