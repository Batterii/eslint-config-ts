# @batterii/eslint-config-ts

This package contains a
[sharable configuration](https://eslint.org/docs/developer-guide/shareable-configs)
file for [ESLint](https://eslint.org/), to be used in Batterii TypeScript
projects.


## typescript-eslint

ESLint does not support TypeScript directly, but linting of TypeScript files is
accomplished through
[typescript-eslint](https://github.com/typescript-eslint/typescript-eslint).
This requires a
[parser](https://www.npmjs.com/package/@typescript-eslint/parser) to parse the
code, and a
[plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) to
specify any new rules specific to TypeScript. Both are listed as
peerDependencies of this package and must be installed by consuming projects.

In addition, the `tsc` config file must exist in the root of the project with
the name `tsconfig.json`, as the plugin needs this config for several of its
rules.


## Base Rules

This package depends on
[@batterii/eslint-config-node](https://www.npmjs.com/package/@batterii/eslint-config-node),
and most of the linter rules are configured there. If you'd like to make a
change to a rule that is not prefixed with `@typescript-eslint`, you should
configure it there, instead of here. The ultimate goal is to prevent repetition
of configuration in order to maintain consistency.


## ESLint-Specific Rules

If a rule is prefixed with `@typescript-eslint`, it is configured in this
package instead of the base. All such rules are described in the
[plugin README](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin#supported-rules).


## Replaced Rules

Some ESLint rules are not compatible with TypeScript as-implemented in ESLint
itself, due to inevitable differences in the AST's produced by the different
parsers. To get around this problem, `typescript-eslint` has simply
re-implemented these rules. Generally, the same configuration settings can be
used-- the base rule just needs to be turned off and its counterpart (with a
`@typescrpt-eslint` prefix) needs to be turned on.

To maximize reuse, any such rules are configured in
`@batterii/eslint-config-node`. Their configurations are imported and copied to
the prefixed rule name, and the base rule is set to `'off'`. They are listed
towards the top of `./index.js` and should remain there for clarity. If you wish
to change the configuration of any of these rules, please do so in
`@batterii/eslint-config-node` instead of here.


## Adding Replaced Rules

The list of "replaced" rules in this project is not exhaustive and only includes
the rules that we're actually using. Unfortunately, nobody seems to be keeping a
definitive list of re-implemented rules anywhere as of this writing.

If you are adding new configuration for a rule documented in
`@typescript-eslint/eslint-plugin`, try searching for it (without the prefix)
in the ESLint rules docs. If it appears there as well, chances are it is a
"replaced" rule and should be configured in `@batterii/eslint-config-node`
instead of here. To perform the replacement, simply add the rule name to the
list in `./index.js`.


## Scripts

This project includes a couple helpful npm scripts to use while developing:

- `npm run lint`
	- Lints the project using `@batterii/eslint-config-node` as configuration.
- `npm run lintf`
	- Runs the linter with the `--fix` option.


## Before Publishing

Since there isn't a way of reliably testing linter configuration except to
run the linter, you should consider using `npm link` to see how your changes
affect the linter before publishing them.

To do this, run the following in this project:

```sh
npm link
```

Followed by this in your consuming project:

```sh
npm link @batterii/eslint-config-ts
```

This will replace the package in your consuming project with a symlink that
points at your changed files. Now you can run `npm run lint` or `npm run lintf`
in the consuming project to try out your changes.

Once you're done, you can get rid of the symlinks by running the following
in this project:

```sh
npm unlink
```

As well as this in your consuming project:

```sh
npm ci
```

This latter command will fully revert your `node_modules` folder back to exactly
what is specified in `package-lock.json`. This will this also destroy any other
linked packages, but this is actually for the best.

Ideally, you should not keep your packages linked this way for any significant
length of time, so make sure you remember to perform this cleanup when you are
done testing.


## Publishing

To publish, simply run `npm version` with `major`, `minor`, or `patch`. When
you do this, the following happens:

1. The `preversion` script runs the linter and aborts if there are any errors.
2. `npm version` updates the version field in `package.json`, creates a new
   commit for this change, and tags the commit with the version number.
3. The `postversion` script runs `npm publish`.
4. The `prepublishOnly` script pushes the current branch and all tags.
5. Finally, `npm publish` publishes the new version to the registry.

Note that once step 5 has been completed, this process *cannot be undone*, so
make sure you know what you're doing.


### Concerning Version Numbers

Because of the nature of linter rules, almost every change to this project
could conceivably be considered a "breaking change" by producing linter
errors in other projects where there were none before. That being said, the
linter output is purely the concern of developers, not users, so there is no
need to keep strictly to semver conventions.

As such, most new versions of this package should only increment the patch
version using `npm version patch`. Minor versions are effectively meaningless
here and should not be used, while major versions should be reserved for two
situations only:

- A new major version of a `typescript-eslint` project or ESLint itself is
  released that breaks some of these rules, requiring backwards-incompatible
  changes to this project.

- Linter rule changes that are likely to produce a large amount of linter errors
  in existing code that must be fixed manually (without the `--fix` option).

In either case, a major version is appropriate so that consuming projects can
hold off on updating until they are ready.
