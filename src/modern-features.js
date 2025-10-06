/**
 * Modern JavaScript Features Demo
 * This file demonstrates various modern JavaScript features
 * that have different baseline support levels
 */

// ✅ Widely Available Features (30+ months support)
// These are safe to use in production

// Array.prototype.at() - Widely available
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.at(-1)); // Gets last element: 5

// Optional chaining - Widely available
const user = { profile: { name: 'John' } };
console.log(user?.profile?.name);

// Nullish coalescing - Widely available
const defaultValue = null ?? 'default';
console.log(defaultValue);

// ====================================

// 🟡 Newly Available Features (Recently supported)
// Use with caution, consider polyfills

// Array.prototype.findLast() - Newly available
const lastEven = numbers.findLast(n => n % 2 === 0);
console.log('Last even:', lastEven);

// Array.prototype.findLastIndex() - Newly available
const lastEvenIndex = numbers.findLastIndex(n => n % 2 === 0);
console.log('Last even index:', lastEvenIndex);

// Array.prototype.toSorted() - Newly available (non-mutating sort)
const sorted = numbers.toSorted((a, b) => b - a);
console.log('Sorted:', sorted);

// Array.prototype.toReversed() - Newly available (non-mutating reverse)
const reversed = numbers.toReversed();
console.log('Reversed:', reversed);

// Object.groupBy() - Newly available
const inventory = [
  { name: 'asparagus', type: 'vegetables', quantity: 5 },
  { name: 'bananas', type: 'fruit', quantity: 0 },
  { name: 'goat', type: 'meat', quantity: 23 },
  { name: 'cherries', type: 'fruit', quantity: 5 },
  { name: 'fish', type: 'meat', quantity: 22 },
];
const grouped = Object.groupBy(inventory, ({ type }) => type);
console.log('Grouped:', grouped);

// ====================================

// 🔴 Limited Availability Features (Not yet widely supported)
// These should be avoided or polyfilled

// Promise.try() - Limited availability (proposal stage)
// This would fail in many browsers!
try {
  // Promise.try(() => {
  //   return someAsyncOperation();
  // });
  console.log('Promise.try is not widely supported yet');
} catch (e) {
  console.error('Promise.try not available');
}

// Array.fromAsync() - Limited availability
// This would fail in many browsers!
async function* asyncGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

// Uncomment to test (will fail in many browsers):
// const asyncArray = await Array.fromAsync(asyncGenerator());
// console.log('Async array:', asyncArray);

// Promise.withResolvers() - Limited availability
// const { promise, resolve, reject } = Promise.withResolvers();
// setTimeout(() => resolve('done'), 1000);

// ====================================

// Class features with varying support levels

class ModernClass {
  // Public fields - Widely available
  publicField = 'public';

  // Private fields - Newly available
  #privateField = 'private';

  // Static fields - Widely available
  static staticField = 'static';

  // Private methods - Newly available
  #privateMethod() {
    return this.#privateField;
  }

  // Public method using private members
  usePrivate() {
    return this.#privateMethod();
  }

  // Static initialization blocks - Newly available
  static {
    console.log('Static initialization block');
  }
}

// Top-level await - Newly available
// (Only works in modules, not regular scripts)
// await fetch('https://api.example.com/data');

// ====================================

// String methods with varying support

const text = '  Hello World  ';

// trimStart/trimEnd - Widely available
console.log(text.trimStart());
console.log(text.trimEnd());

// String.prototype.replaceAll - Widely available
const replaced = 'foo bar foo'.replaceAll('foo', 'baz');
console.log(replaced);

// ====================================

// Regular Expression features

// Named capture groups - Widely available
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = '2024-03-15'.match(re);
console.log(match?.groups?.year); // 2024

// Lookbehind assertions - Newly available
const lookbehind = /(?<=\$)\d+/;
const price = 'Price: $100'.match(lookbehind);
console.log('Price:', price?.[0]);

// ====================================

// Export for module usage
export {
  numbers,
  user,
  inventory,
  ModernClass
};