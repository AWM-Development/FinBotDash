import { describe, it, expect } from 'vitest';
import { createPageUrl, type PageName } from '../../utils';

describe('utils', () => {
	describe('createPageUrl', () => {
		it('should return correct URL for Dashboard', () => {
			expect(createPageUrl('Dashboard')).toBe('/dashboard');
		});

		it('should return correct URL for Signals', () => {
			expect(createPageUrl('Signals')).toBe('/signals');
		});

		it('should return correct URL for RebalancePacket', () => {
			expect(createPageUrl('RebalancePacket')).toBe('/rebalance-packet');
		});

		it('should return correct URL for Portfolio', () => {
			expect(createPageUrl('Portfolio')).toBe('/portfolio');
		});

		it('should return correct URL for Performance', () => {
			expect(createPageUrl('Performance')).toBe('/performance');
		});

		it('should return correct URL for Risk', () => {
			expect(createPageUrl('Risk')).toBe('/risk');
		});

		it('should return correct URL for TaxTLH', () => {
			expect(createPageUrl('TaxTLH')).toBe('/tax-tlh');
		});

		it('should return correct URL for LogsAudit', () => {
			expect(createPageUrl('LogsAudit')).toBe('/logs-audit');
		});

		it('should return correct URL for Settings', () => {
			expect(createPageUrl('Settings')).toBe('/settings');
		});

		it('should return default /dashboard for invalid page name', () => {
			// TypeScript should prevent this, but test runtime behavior
			const invalidPage = 'InvalidPage' as PageName;
			expect(createPageUrl(invalidPage)).toBe('/dashboard');
		});

		it('should handle all valid PageName types', () => {
			const validPages: PageName[] = [
				'Dashboard',
				'Signals',
				'RebalancePacket',
				'Portfolio',
				'Performance',
				'Risk',
				'TaxTLH',
				'LogsAudit',
				'Settings',
			];

			const expectedUrls = [
				'/dashboard',
				'/signals',
				'/rebalance-packet',
				'/portfolio',
				'/performance',
				'/risk',
				'/tax-tlh',
				'/logs-audit',
				'/settings',
			];

			validPages.forEach((page, index) => {
				expect(createPageUrl(page)).toBe(expectedUrls[index]);
			});
		});
	});
});
