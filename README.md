# OocxNg - Lightweight Angular components

![npm version](https://img.shields.io/npm/v/oocx-ng.svg)
![npm license](https://img.shields.io/npm/l/oocx-ng.svg)
![build status](https://dev.azure.com/oocx/oocx-ng/_apis/build/status/1?api-version=5.0-preview.1)

This project contains a collection of lightweight Angular components and directives.

I use these components for one of my own projects. I published them here because I think they may be useful for other projects as well.

The components in this library require a modern, evergreen browser (Chrome, Firefox, Edge, Safari, ...). Older browsers like Internet Explorer 11 are NOT supported.

## Demo

The [demo application](https://oocxng.z6.web.core.windows.net/index.html) shows most of the components.

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

Run `ng serve` for a dev server that hosts the demo application. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name --project oocx-ng` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build oocx-ng` to build the library project. The build artifacts will be stored in the `dist/oocx-ng` directory.

Run `ng build` to build the demo project. The build artifacts will be stored in the `dist/oocx-ng-demo` directory.

## Running unit tests

Run `ng test oocx-ng` to execute the unit tests via [Karma](https://karma-runner.github.io).

