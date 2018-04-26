module.exports = function(wallaby) {
  return {
    files: ["src/**/*.js", "package.json"],
    tests: ["test/**/*.js", { pattern: "test/jest.*.js", ignore: true }],
    compilers: {
      "**/*.js": wallaby.compilers.babel(),
    },
    env: {
      type: "node",
      runner: "node",
    },
    testFramework: "jest",
    setup: function(wallaby) {
      wallaby.testFramework.configure({
        globals: {
          __DEV__: true,
        },
        setupFiles: ["./test/jest.setupPixi.js"],
        transform: {
          "^.+\\.js$": "babel-jest",
        },
      });
    },
  };
};
