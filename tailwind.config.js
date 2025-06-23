/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#6B73FF', // Inspiring creativity and trust - indigo-500
        'primary-50': '#EBEEFF', // Light indigo tint - indigo-50
        'primary-100': '#D6DDFF', // Lighter indigo shade - indigo-100
        'primary-200': '#B3BFFF', // Light indigo shade - indigo-200
        'primary-300': '#8A96FF', // Medium-light indigo shade - indigo-300
        'primary-400': '#7B84FF', // Medium indigo shade - indigo-400
        'primary-500': '#6B73FF', // Base primary color - indigo-500
        'primary-600': '#5A62E6', // Darker indigo shade - indigo-600
        'primary-700': '#4A52CC', // Dark indigo shade - indigo-700
        'primary-800': '#3A41B3', // Darker indigo shade - indigo-800
        'primary-900': '#2A3199', // Darkest indigo shade - indigo-900

        // Secondary Colors
        'secondary': '#FF6B9D', // Warm, approachable accent - pink-400
        'secondary-50': '#FFF0F5', // Light pink tint - pink-50
        'secondary-100': '#FFE1EC', // Lighter pink shade - pink-100
        'secondary-200': '#FFC2D4', // Light pink shade - pink-200
        'secondary-300': '#FFA3BC', // Medium-light pink shade - pink-300
        'secondary-400': '#FF84A4', // Medium pink shade - pink-400
        'secondary-500': '#FF6B9D', // Base secondary color - pink-500
        'secondary-600': '#E65A8A', // Darker pink shade - pink-600
        'secondary-700': '#CC4977', // Dark pink shade - pink-700
        'secondary-800': '#B33864', // Darker pink shade - pink-800
        'secondary-900': '#992751', // Darkest pink shade - pink-900

        // Accent Colors
        'accent': '#4ECDC4', // Calming teal - teal-400
        'accent-50': '#F0FDFC', // Light teal tint - teal-50
        'accent-100': '#CCFBF1', // Lighter teal shade - teal-100
        'accent-200': '#99F6E4', // Light teal shade - teal-200
        'accent-300': '#5EEAD4', // Medium-light teal shade - teal-300
        'accent-400': '#4ECDC4', // Base accent color - teal-400
        'accent-500': '#14B8A6', // Medium teal shade - teal-500
        'accent-600': '#0D9488', // Darker teal shade - teal-600
        'accent-700': '#0F766E', // Dark teal shade - teal-700
        'accent-800': '#115E59', // Darker teal shade - teal-800
        'accent-900': '#134E4A', // Darkest teal shade - teal-900

        // Background Colors
        'background': '#FEFEFE', // Soft white background - gray-50
        'surface': '#F8F9FF', // Subtle lavender-tinted surface - slate-50

        // Text Colors
        'text-primary': '#2D3748', // Rich charcoal - gray-700
        'text-secondary': '#718096', // Balanced gray - gray-500

        // Status Colors
        'success': '#48BB78', // Natural green - green-400
        'success-50': '#F0FDF4', // Light green tint - green-50
        'success-100': '#DCFCE7', // Lighter green shade - green-100
        'success-200': '#BBF7D0', // Light green shade - green-200
        'success-300': '#86EFAC', // Medium-light green shade - green-300
        'success-400': '#48BB78', // Base success color - green-400
        'success-500': '#22C55E', // Medium green shade - green-500
        'success-600': '#16A34A', // Darker green shade - green-600
        'success-700': '#15803D', // Dark green shade - green-700
        'success-800': '#166534', // Darker green shade - green-800
        'success-900': '#14532D', // Darkest green shade - green-900

        'warning': '#ED8936', // Friendly orange - orange-400
        'warning-50': '#FFFBEB', // Light orange tint - orange-50
        'warning-100': '#FEF3C7', // Lighter orange shade - orange-100
        'warning-200': '#FDE68A', // Light orange shade - orange-200
        'warning-300': '#FCD34D', // Medium-light orange shade - orange-300
        'warning-400': '#ED8936', // Base warning color - orange-400
        'warning-500': '#F59E0B', // Medium orange shade - orange-500
        'warning-600': '#D97706', // Darker orange shade - orange-600
        'warning-700': '#B45309', // Dark orange shade - orange-700
        'warning-800': '#92400E', // Darker orange shade - orange-800
        'warning-900': '#78350F', // Darkest orange shade - orange-900

        'error': '#F56565', // Gentle red - red-400
        'error-50': '#FEF2F2', // Light red tint - red-50
        'error-100': '#FEE2E2', // Lighter red shade - red-100
        'error-200': '#FECACA', // Light red shade - red-200
        'error-300': '#FCA5A5', // Medium-light red shade - red-300
        'error-400': '#F56565', // Base error color - red-400
        'error-500': '#EF4444', // Medium red shade - red-500
        'error-600': '#DC2626', // Darker red shade - red-600
        'error-700': '#B91C1C', // Dark red shade - red-700
        'error-800': '#991B1B', // Darker red shade - red-800
        'error-900': '#7F1D1D', // Darkest red shade - red-900
      },
      fontFamily: {
        'heading': ['Fredoka One', 'cursive'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Nunito', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'storybook': '8px',
      },
      boxShadow: {
        'storybook': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'storybook-lg': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      transitionTimingFunction: {
        'storybook': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}