# autogen

> a tool to automate code generation

`autogen` is a simple to use tool that can generate code automatically based on
other input files. A simple use case would be to generate an `index.ts` file
that re-exports the contents of all subdirectories:

Suppose we have this directory structure:

```
/src
  /components
    /Header
      - index.spec.tsx
      - index.tsx
      - styles.ts
    /Input
      - index.spec.tsx
      - index.tsx
      - styles.ts
    /Select
      - index.spec.tsx
      - index.tsx
      - styles.ts
    - index.ts
```

We'd want to have an `index.ts` file like this:

```typescript
export { default as Header } from './Header';
export { default as Input } from './Input';
export { default as Select } from './Select';
```

However, this kind of boilerplate is inconvenient to maintain, and can get
outdated easily (for example: someone might remove a component, but not its
entry in the index file). With this tool, we can automatically generate this
file.

`autogen` is written in TypeScript and distributed from the NPM registry, but it
is not restricted to the Javascript ecosystem, and you can use it to generate
code in other languages. It uses [Handlebars][hbs] as its templating language.

## Installation

```bash
$ yarn add --dev @z1digitalstudio/autogen

# or

$ npm install --save-dev @z1digitalstudio/autogen
```

## Usage

To use this tool, you need to create your templates first. Following the
previous example, let's create the template for `src/components/index.ts` in
`autogen/src/components/index.ts.hbs`:

```handlebars
{{#each components}}
export { default as {{this}} } from './{{this}}';
{{/each}}
```

Our file structure would look like this:

```
/autogen
  /src
    /components
      - index.ts
/src
  /components
    /Header
      - index.spec.tsx
      - index.tsx
      - styles.ts
    /Input
      - index.spec.tsx
      - index.tsx
      - styles.ts
    /Select
      - index.spec.tsx
      - index.tsx
      - styles.ts
    - index.ts
```

Now we must define our `autogen.config.js` file with all our necessary
configuration:

```javascript
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
```

Here's an overview of the file:

- `baseDir` specifies where the directory containing all templates is placed.
- `templateFile` points to the template inside the base directory.
- `transformData` allows us to pass any information we need to the template. In
  this case, we don't want the full paths, we just need the name of the
  subdirectory.
  The function can be `async` in case we wanted to make more complex
  operations, like reading the contents of the file to determine if it contains a
  default export, and filter it out otherwise.

With all of that, we're all set. We can now run

```bash
$ yarn autogen

# or, if we're using npm...

$ node node_modules/.bin/autogen
```

We can also run `yarn autogen --watch` to put `autogen` in watch mode. It will
react to changes in watched files, and file additions or deletions, and
regenerate the code when necessary.

[hbs]: https://github.com/wycats/handlebars.js/
