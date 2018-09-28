# OocxNg

**Im currently preparing to publish this project as open source (moving the code to github, creating the npm package, adding documentation, cleaning up my code, ...). As long as you see this text here, it means I'm not ready to officially announce and publish this project, so everything you see so far is work in progress.**

This project contains a collection of lightweight Angular components and directives.

I use these components for one of my own projects. I published them here because I think they may be useful for other projects as well.

The components in this library require a modern, evergreen browser (Chrome, Firefox, Edge, Safari, ...). Older browsers like Internet Explorer 11 are NOT supported.

## Components included in OocxNg

* Calendar
* Date picker
* Autocomplete
* Autocomplete with multiple selection
* Selection list
* Number input
* Label
* Checkbox
* Spinner (loading animation)

## Directives

* Number input
* Label
* History-back navigation

## Pipes

* Duration (converts a number to hour:minutes format)

# Using OocxNg in your Angular project

Install the package: `npm install oocx-ng --save` or `yarn install --save`.

Import OocxNgModule in your own module:

```
import { OocxNgModule } from './../../projects/oocx-ng/src/lib/oocx-ng.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OocxNgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


# Building the project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
