module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ['airbnb-typescript', "airbnb/hooks", "plugin:@typescript-eslint/recommended"],
    plugins: ["@typescript-eslint"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        },
        project: './tsconfig.json',
    },
    rules: {
        "import/no-cycle": "off",
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/ban-types": "off",
        "max-len": ["error", {"code": 240}],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "class-methods-use-this": "off",
        "react/destructuring-assignment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-restricted-globals": "off",
        "max-classes-per-file": "off",
        "react/static-property-placement": "off",
        "react/jsx-props-no-spreading": "off",
        "no-shadow": "off"
    }
};