module.exports = {
    extends: 'ls-react',
    env: {
        jest: true,
    },
    globals: {
        shallow: true,
    },
    rules: {
        'import/no-extraneous-dependencies': 0,
    },
};
