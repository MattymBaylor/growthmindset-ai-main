// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Format date
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

// Format relative time
export function formatRelativeTime(date) {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

// Truncate text
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Generate avatar URL
export function getAvatarUrl(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0891b2&color=fff`;
}

// Validate email
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Generate random ID
export function generateId(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

// Debounce function
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Sleep function for async operations
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Parse error messages
export function parseError(error) {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error?.message) return error.error.message;
  return 'An unexpected error occurred';
}

// Check if running in development
export const isDevelopment = process.env.NODE_ENV === 'development';

// Check if running in production
export const isProduction = process.env.NODE_ENV === 'production';

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage`, error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} to localStorage`, error);
    }
  },
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage`, error);
    }
  },
  clear: () => {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  },
};

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    resetPassword: '/auth/reset-password',
  },
  user: {
    profile: '/user/profile',
    update: '/user/update',
  },
  // Add more endpoints as needed
};

// Constants
export const CONSTANTS = {
  APP_NAME: 'Growth Mindset AI',
  SUPPORT_EMAIL: 'support@growthmindset.ai',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
};
