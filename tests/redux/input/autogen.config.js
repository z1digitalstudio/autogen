const camelCase = require('lodash/camelCase');

module.exports = {
  baseDir: 'autogen',
  configureHandlebars: Handlebars => {
    Handlebars.registerHelper('upperCamelCase', word => {
      const [first, ...rest] = camelCase(word);
      return `${first.toUpperCase()}${rest.join('')}`;
    });
  },
  templates: [
    {
      dependencies: ['src/redux/modules/**/epic.ts'],
      templateFile: `src/redux/modules/appEpics.ts.hbs`,
      transformData: async files => ({
        modules: files
          .map(file => /src\/redux\/modules\/(.+)\/epic\.ts/.exec(file))
          .filter(it => !!it)
          .map(([, module]) => module),
      }),
    },
    {
      dependencies: ['src/redux/modules/**/reducer.ts'],
      templateFile: `src/redux/modules/appReducers.ts.hbs`,
      transformData: async files => ({
        modules: files
          .map(file => /src\/redux\/modules\/(.+)\/reducer\.ts/.exec(file))
          .filter(it => !!it)
          .map(([, module]) => module),
      }),
    },
    {
      dependencies: ['src/redux/modules/**/types.ts'],
      templateFile: `src/redux/modules/appTypes.ts.hbs`,
      transformData: async files => ({
        modules: files
          .map(file => /src\/redux\/modules\/(.+)\/types\.ts/.exec(file))
          .filter(it => !!it)
          .map(([, module]) => module),
      }),
    },
  ],
};
