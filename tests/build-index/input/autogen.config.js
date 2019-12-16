module.exports = {
  baseDir: 'autogen',
  templates: [
    {
      dependencies: ['src/components/*/index.tsx'],
      templateFile: `src/components/index.ts.hbs`,
      transformData: async files => ({
        components: files
          .map(file => /src\/components\/(.+)\/index\.tsx/.exec(file))
          .filter(it => !!it)
          .map(([, component]) => component),
      }),
    },
  ],
};
