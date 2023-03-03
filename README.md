# MyStore 🛒
This is a small store app built using Angular. The app allows users to view and purchase products from the store. 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.5.

## Development server 👨🏻‍💻
For first time run `npm install ` to install all project dependencies  
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Backend API 📡

All the data is stored on the file database.json   
To start de API run `npm run start-api` it will run the backend on `http://localhost:3000`

## Usage 💡

Once the app is running, users can view the list of products available in the store. They can click on a product to view more details and add it to their cart. Users can also view their cart and checkout to purchase the items in their cart.

## Structure 🏗️

The application structure consists of several directories and files that organize the code into different parts, each with a specific responsibility.    

Here is a brief explanation of the different parts of the application structure:

`src`: This directory contains the source code for the application.    

`app`: This directory contains the main application code.    

`components`: This directory contains the reusable components used in the application. Each component has its own directory with a .ts, .html, and .css file.    

`domain`: This directory contains the TypeScript interfaces that define the structure of the data used in the application.    

`services`: This directory contains the Angular services used in the application. 

`layout`: This directory contains the shared Layout components such as Navbar    

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build 🚀

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Contributing

Contributions are welcome! If you find a bug or would like to suggest a new feature, please open an issue or submit a pull request.
