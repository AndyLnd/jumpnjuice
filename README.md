# Simple Typescript Starter

Web development using [typescript](https://www.typescriptlang.org/) for static typing, [tslint](https://palantir.github.io/tslint) for linting, [webpack](https://webpack.js.org/) for module bundling, [prettier](https://github.com/prettier/prettier) for formatting and [webpack-dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server) as live reloading static http server.

## Usage

1.  Install [nodejs](https://nodejs.org/en/). I highly recommend using [nvm](https://github.com/creationix/nvm). If you are on mac or ubuntu, you could use the following command to install nodejs. It's from my [lean-dotfiles](https://gitlab.com/seartipy/lean-dotfiles) configuration.

    On Mac

         curl -L j.mp/srtpldf > setup && bash setup web

    On Ubuntu

         wget -qO- j.mp/srtpldf > setup && bash setup web

2)  Clone this repository and install npm packages. Make sure you have [git](https://git-scm.com/) installed.

         npm install -g yarn
         git clone https://gitlab.com/pervezfunctor/typescript-simple-starter.git
         cd typescript-simple-starter && rm -rf .git
         yarn

3)  Start server

        yarn start

    Now you can edit `src/index.ts` in any editor and see your changes in browser immediately. You could use `yarn test` to run tests and `yarn run lint` for linting all files in `src` folder.

4)  Setup your editor

    If you use `visual studio code`, install `visual studio code extensions` using the following command( or use the script in Step 1).

        code --install-extension msjsdiag.debugger-for-chrome
        code --install-extension eg2.tslint
        code --install-extension esbenp.prettier-vscode

    On Mac, you might have to [install shell command](https://code.visualstudio.com/docs/setup/mac).

## License

MIT
