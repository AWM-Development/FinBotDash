import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProposedTrades from '../../../../Components/packet/ProposedTrades';

describe('ProposedTrades', () => {
	it('should render proposed trades component', () => {
		render(<ProposedTrades />);

		expect(screen.getByText('Proposed Trades')).toBeInTheDocument();
		expect(screen.getByText(/Order ticket for this month's rebalance/i)).toBeInTheDocument();
	});

	it('should render all trades', () => {
		render(<ProposedTrades />);

		const buyElements = screen.getAllByText('Buy');
		const sellElements = screen.getAllByText('Sell');
		
		expect(buyElements.length).toBeGreaterThan(0);
		expect(sellElements.length).toBeGreaterThan(0);
	});

	it('should render trade tickers', () => {
		render(<ProposedTrades />);

		expect(screen.getByText('QQQ')).toBeInTheDocument();
		expect(screen.getByText('IWM')).toBeInTheDocument();
		expect(screen.getByText('VNQ')).toBeInTheDocument();
	});

	it('should render trade amounts', () => {
		render(<ProposedTrades />);

		expect(screen.getByText('$6,150')).toBeInTheDocument();
		expect(screen.getByText('$4,200')).toBeInTheDocument();
		expect(screen.getByText('$2,800')).toBeInTheDocument();
	});

	it('should render trade reasons', () => {
		render(<ProposedTrades />);

		expect(screen.getByText('Rebalance')).toBeInTheDocument();
		expect(screen.getByText('Regime shift')).toBeInTheDocument();
		expect(screen.getByText('Risk scaling')).toBeInTheDocument();
	});

	it('should render trade notes', () => {
		render(<ProposedTrades />);

		expect(screen.getByText(/Use limit order near midpoint spread/i)).toBeInTheDocument();
		expect(screen.getByText(/Consider tax lot selection/i)).toBeInTheDocument();
		expect(screen.getByText(/Standard order/i)).toBeInTheDocument();
	});
});
