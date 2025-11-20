
/**
 * Generates a unique ID (fallback if Date.now() isn't enough)
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Formats ISO date string to readable format
 * e.g., "2025-11-20T10:30:00.000Z" → "20 Nov 2025, 10:30 AM"
 */
export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleDateString(undefined, options);
};

/**
 * Formats only the date (no time)
 * e.g., "20 Nov 2025"
 */
export const formatDateOnly = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Simple email validation
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Simple password strength (min 6 chars)
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Capitalizes first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength - 3) + '...';
};

/**
 * Delay helper (useful for debouncing or testing)
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get category color (for future UI enhancement)
 */
export const getCategoryColor = (category: 'work' | 'study' | 'personal'): string => {
  switch (category) {
    case 'work': return '#FF6B6B';
    case 'study': return '#4ECDC4';
    case 'personal': return '#45B7D1';
    default: return '#95A5A6';
  }
};

/**
 * Get category icon (you can use with react-native-vector-icons later)
 */
export const getCategoryIcon = (category: 'work' | 'study' | 'personal'): string => {
  switch (category) {
    case 'work': return 'briefcase';
    case 'study': return 'book';
    case 'personal': return 'heart';
    default: return 'note';
  }
};