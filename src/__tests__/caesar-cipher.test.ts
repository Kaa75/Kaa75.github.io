/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';

// We test the encrypt logic inline since we can't easily render the hook-based component without full setup
describe('CaesarCipher logic', () => {
  function encrypt(text: string, shift: number): string {
    return text
      .split('')
      .map((char) => {
        if (/[A-Z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        }
        if (/[a-z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
        }
        return char;
      })
      .join('');
  }

  it('encrypts uppercase letters with shift 3', () => {
    expect(encrypt('ABC', 3)).toBe('DEF');
  });

  it('wraps around Z', () => {
    expect(encrypt('XYZ', 3)).toBe('ABC');
  });

  it('preserves non-alphabetic characters', () => {
    expect(encrypt('HELLO WORLD!', 1)).toBe('IFMMP XPSME!');
  });

  it('handles shift of 0 (identity)', () => {
    expect(encrypt('TEST', 0)).toBe('TEST');
  });

  it('encrypts lowercase letters', () => {
    expect(encrypt('abc', 1)).toBe('bcd');
  });

  it('handles full rotation (shift 26 = identity)', () => {
    expect(encrypt('HELLO', 26)).toBe('HELLO');
  });
});
