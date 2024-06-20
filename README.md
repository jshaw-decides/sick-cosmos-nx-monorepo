# @your-org/ui

This is a monorepo containing React UI components. It uses Nx for managing the workspace and building the packages. React Cosmos for developing.

## Development

To start developing the components locally, follow these steps:

1. Clone the repository
2. Install dependencies: `npm install` (`postinstall` will run `build-all` after `install`)
3. Build fixtures: `npm run cosmos`
4. Serve fixtures: `npm start`
5. [View Fixtures](http://localhost:5000)

This will start the Cosmos development environment where you can preview and interact with the components.

## Building

To build all packages for production, run:

```bash
npm run build-all
```

Build outputs are stored in `dist/packages/@your-org/<package>`

## Publishing

To publish the packages to a registry like npm, run:

```bash
npm run publish:nx
```

This will build and publish all affected packages to the registry.

## Scripts

This monorepo provides several npm scripts for common tasks:

- `clean`: Removes node_modules and dist folders
- `postinstall`: Runs `build-all` after installing dependencies
- `start`: Starts the Cosmos development server
- `generate:react-package`: Generates a new React package in the monorepo
- `affected`: Shows projects affected by changes since the main branch
- `build`: Builds affected projects
- `build:nx`: Builds affected projects using Nx
- `build-all`: Builds all projects
- `publish`: Publishes affected packages
- `publish:nx`: Publishes affected packages using Nx
- `cosmos`: Starts the Cosmos development server with imports exposed
- `prettier:check`: Checks code formatting with Prettier
- `prettier:fix`: Fixes code formatting with Prettier

## Dependencies

The monorepo uses the following main dependencies:

- [@nx/js](https://www.npmjs.com/package/@nx/js): Nx plugins for JavaScript projects
- [esbuild](https://www.npmjs.com/package/esbuild): A fast JavaScript bundler
- [react](https://www.npmjs.com/package/react): React library for building user interfaces
- [react-cosmos](https://www.npmjs.com/package/react-cosmos): A development environment for building scalable React UI libraries
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): A utility-first CSS framework
- [flowbite](https://www.npmjs.com/package/flowbite): A Tailwind CSS component library

## License

This project is licensed under the [MIT License](LICENSE).
