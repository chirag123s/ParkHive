const tintColorLight = '#0c7ff2'; // ParkHive primary blue
const tintColorDark = '#fff';

export default {
  light: {
    text: '#111418', // Primary text color from design
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#60758a', // Secondary text color from design
    tabIconSelected: tintColorLight,
    secondary: '#f0f2f5', // Secondary background from design
    accent: {
      green: '#4CAF50', // Available parking spots
      red: '#F44336', // Occupied parking spots
    },
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    secondary: '#333',
    accent: {
      green: '#4CAF50',
      red: '#F44336',
    },
  },
};