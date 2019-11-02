# FlightApp React Project

- Setup
- Project Structure
- Components
- TODO

## Setup

To setup the project run below command.

if you are using yarn:

```bash
yarn
```

if you are using npm:

```bash
npm install
```

To run the project you can run either command mentioned below based on the package manager you are using.

```bash
yarn start
npm run start
```

## Project Structure

All project specific implementations are done inside the `src` folder. 
`src` folder consist of main 4 folders along with the `App.js` and `index.js`.

1. Components
2. Layouts
3. Store
4. Utils

### Components

Project specific components should added in to this folder. Atomic level components such as UI components should added inside the UI folder inside the components folder.

### Layouts

Project specific page components should added inside this folder.

### Store

We are using `Redux-Saga` as the state management and all the action files and reducers should add to this folder.

### Utils

This folder contains two main files, `constants` and `methods`. Project specific constants and re-usable mehtods should be added to corresponding files.

## TODO

- Configure ES-Lint.
- Add proper default props.
- Component documentation.
- Better error handling for the fetch command.
- Implement clear all button for the text box.
