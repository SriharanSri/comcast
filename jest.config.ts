module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    // '^.+\\.tsx?$': ['ts-jest'],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)',
  ],
};
