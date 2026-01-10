import { describe, it, expect } from 'vitest';
import { cn } from '../../../lib/utils';

describe('lib/utils', () => {
	describe('cn', () => {
		it('should merge class names correctly', () => {
			expect(cn('foo', 'bar')).toBe('foo bar');
		});

		it('should handle undefined values', () => {
			expect(cn('foo', undefined, 'bar')).toBe('foo bar');
		});

		it('should handle null values', () => {
			expect(cn('foo', null, 'bar')).toBe('foo bar');
		});

		it('should handle conditional classes', () => {
			expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar');
		});

		it('should merge Tailwind classes and resolve conflicts', () => {
			// twMerge should resolve conflicts - last one wins for conflicting utilities
			expect(cn('px-2', 'px-4')).toBe('px-4');
		});

		it('should handle empty arrays', () => {
			expect(cn('foo', [], 'bar')).toBe('foo bar');
		});

		it('should handle objects with truthy values', () => {
			expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
		});

		it('should handle arrays of class names', () => {
			expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
		});

		it('should handle mixed input types', () => {
			expect(cn('foo', ['bar', 'baz'], { qux: true }, 'quux')).toBe('foo bar baz qux quux');
		});

		it('should handle no arguments', () => {
			expect(cn()).toBe('');
		});

		it('should merge Tailwind responsive and variant classes correctly', () => {
			const result = cn('px-2 py-1', 'md:px-4 md:py-2', 'hover:bg-blue-500');
			// Result should contain all classes since they don't conflict
			expect(result).toContain('px-2');
			expect(result).toContain('py-1');
			expect(result).toContain('md:px-4');
			expect(result).toContain('md:py-2');
			expect(result).toContain('hover:bg-blue-500');
		});

		it('should resolve conflicting Tailwind classes', () => {
			// When there are conflicts, twMerge should keep the last one
			const result = cn('text-red-500', 'text-blue-500');
			expect(result).toBe('text-blue-500');
		});

		it('should handle complex conditional scenarios', () => {
			const isActive = true;
			const isDisabled = false;
			const variant = 'primary';

			const result = cn(
				'base-class',
				isActive && 'active-class',
				isDisabled && 'disabled-class',
				variant === 'primary' && 'primary-class',
				variant === 'secondary' && 'secondary-class'
			);

			expect(result).toContain('base-class');
			expect(result).toContain('active-class');
			expect(result).not.toContain('disabled-class');
			expect(result).toContain('primary-class');
			expect(result).not.toContain('secondary-class');
		});
	});
});
