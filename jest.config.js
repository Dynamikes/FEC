module.exports = {
  verbose: true,
  moduleFileExtension": ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\.(css|less|scss)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\.(js|jsx)$": "babel-jest",

  }
};