const BABEL_ENV = process.env.BABEL_ENV;
const isCommonJS = BABEL_ENV !== undefined && BABEL_ENV === 'cjs';
const isESM = BABEL_ENV !== undefined && BABEL_ENV === 'esm';

module.exports = (api) => {
  // Cache the configuration
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-typescript'],
      [
        '@babel/env',
        {
          bugfixes: true,
          loose: true,
          modules: isCommonJS ? 'commonjs' : false,
          targets: {
            esmodules: isESM ? true : undefined,
            chrome: 70,
          },
        },
      ],
    ],
  };
};
