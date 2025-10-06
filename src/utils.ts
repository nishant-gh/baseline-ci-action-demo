/**
 * TypeScript Utilities with Modern Features
 * Demonstrates TypeScript-specific features and modern JS APIs
 */

// Type definitions
interface User {
  id: number;
  name: string;
  email?: string;
  metadata?: Record<string, unknown>;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: 'electronics' | 'clothing' | 'food';
  inStock: boolean;
}

// ====================================
// Widely Available Features
// ====================================

// Using Map with type safety - Widely available
const userCache = new Map<number, User>();

export function cacheUser(user: User): void {
  userCache.set(user.id, user);
}

// WeakMap for private data - Widely available
const privateData = new WeakMap<object, string>();

// Set operations - Widely available
const uniqueIds = new Set<string>();

// Promise.all with types - Widely available
export async function fetchAllUsers(ids: number[]): Promise<User[]> {
  const promises = ids.map(id =>
    Promise.resolve({ id, name: `User ${id}` })
  );
  return Promise.all(promises);
}

// ====================================
// Newly Available Features
// ====================================

// Using Array.prototype.at() with types - Newly available
export function getLastItem<T>(items: T[]): T | undefined {
  return items.at(-1);
}

// Array.prototype.findLast with types - Newly available
export function findLastActiveProduct(products: Product[]): Product | undefined {
  return products.findLast(p => p.inStock);
}

// Array.prototype.toSorted with types - Newly available
export function sortProductsByPrice(products: Product[]): Product[] {
  return products.toSorted((a, b) => a.price - b.price);
}

// Object.groupBy with types - Newly available
export function groupProductsByCategory(products: Product[]) {
  return Object.groupBy(products, p => p.category);
}

// Using structuredClone - Newly available
export function deepClone<T>(obj: T): T {
  return structuredClone(obj);
}

// ====================================
// Limited Availability Features
// ====================================

// Promise.try - Limited availability (would need polyfill)
// export async function tryPromise<T>(fn: () => T | Promise<T>): Promise<T> {
//   return Promise.try(fn);
// }

// Array.fromAsync - Limited availability
// export async function asyncArrayFrom<T>(
//   asyncIterable: AsyncIterable<T>
// ): Promise<T[]> {
//   return Array.fromAsync(asyncIterable);
// }

// Promise.withResolvers - Limited availability
// export function createDeferred<T>() {
//   const { promise, resolve, reject } = Promise.withResolvers<T>();
//   return { promise, resolve, reject };
// }

// ====================================
// Modern TypeScript patterns
// ====================================

// Template literal types - TypeScript feature
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = `/api/${string}`;

export function makeRequest(method: HTTPMethod, endpoint: Endpoint) {
  console.log(`${method} ${endpoint}`);
}

// Conditional types
type IsArray<T> = T extends Array<any> ? true : false;
type Test1 = IsArray<string[]>; // true
type Test2 = IsArray<string>; // false

// Utility types with modern features
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

// Using satisfies operator (TypeScript 4.9+)
const config = {
  port: 3000,
  host: 'localhost',
  debug: true
} satisfies Record<string, string | number | boolean>;

// Type predicates with modern features
export function isValidProduct(item: unknown): item is Product {
  return (
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'price' in item &&
    typeof (item as Product).price === 'number'
  );
}

// ====================================
// Async patterns
// ====================================

// Async generators - Newly available
export async function* fetchPaginatedData(
  pageSize: number = 10
): AsyncGenerator<User[], void, unknown> {
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    // Simulate API call
    const users: User[] = Array.from({ length: pageSize }, (_, i) => ({
      id: page * pageSize + i,
      name: `User ${page * pageSize + i}`
    }));

    yield users;
    page++;
    hasMore = page < 5; // Limit to 5 pages for demo
  }
}

// Using for await...of - Newly available
export async function processAllPages() {
  const allUsers: User[] = [];

  for await (const users of fetchPaginatedData()) {
    allUsers.push(...users);
  }

  return allUsers;
}

// ====================================
// Error handling patterns
// ====================================

// Custom error classes with cause - Newly available
export class ValidationError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = 'ValidationError';
    this.cause = cause; // Error.cause is newly available
  }
}

// Using AggregateError - Newly available
export function validateProducts(products: Product[]): void {
  const errors: Error[] = [];

  for (const product of products) {
    if (product.price < 0) {
      errors.push(new ValidationError(`Invalid price for ${product.name}`));
    }
    if (!product.name) {
      errors.push(new ValidationError(`Missing name for product ${product.id}`));
    }
  }

  if (errors.length > 0) {
    throw new AggregateError(errors, 'Multiple validation errors');
  }
}

// ====================================
// Numeric operations
// ====================================

// BigInt operations - Widely available
export function calculateLargeSum(values: bigint[]): bigint {
  return values.reduce((sum, val) => sum + val, 0n);
}

// Number methods - Varying availability
export function formatPrice(price: number): string {
  // Number.isFinite - Widely available
  if (!Number.isFinite(price)) {
    return 'Invalid price';
  }

  // Intl.NumberFormat - Widely available
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

// ====================================
// Module exports
// ====================================

export default {
  cacheUser,
  fetchAllUsers,
  getLastItem,
  findLastActiveProduct,
  sortProductsByPrice,
  groupProductsByCategory,
  deepClone,
  makeRequest,
  isValidProduct,
  processAllPages,
  validateProducts,
  calculateLargeSum,
  formatPrice
};