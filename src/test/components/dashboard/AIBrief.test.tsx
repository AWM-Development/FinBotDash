import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AIBrief from '../../../../Components/dashboard/AIBrief';

describe('AIBrief', () => {
	it('should render AI Brief component', () => {
		render(<AIBrief />);

		expect(screen.getByText('AI Brief')).toBeInTheDocument();
	});

	it('should render high confidence badge', () => {
		render(<AIBrief />);

		expect(screen.getByText('High Confidence')).toBeInTheDocument();
	});

	it('should render What Changed section', () => {
		render(<AIBrief />);

		expect(screen.getByText(/What Changed/i)).toBeInTheDocument();
		expect(screen.getByText(/QQQ momentum score increased/i)).toBeInTheDocument();
	});

	it('should render Recommended Action section', () => {
		render(<AIBrief />);

		expect(screen.getByText(/Recommended Action/i)).toBeInTheDocument();
		expect(screen.getByText(/Sell IWM/i)).toBeInTheDocument();
		expect(screen.getByText(/Buy QQQ/i)).toBeInTheDocument();
	});

	it('should render Risk note', () => {
		render(<AIBrief />);

		expect(screen.getByText(/Risk note/i)).toBeInTheDocument();
		expect(screen.getByText(/Tech concentration will increase/i)).toBeInTheDocument();
	});
});
