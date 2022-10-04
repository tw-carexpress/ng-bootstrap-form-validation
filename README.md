# @kwsoft/ng-bootstrap-form-validation

An Angular module that makes Bootstrap form validation easy. 

Check out [the demo](https://third774.github.io/ng-bootstrap-form-validation)!

## Kwsoft Fork

This repository is only for internal usage and not published to the public npm registry!

The module is forked from [creamteam-de/ng-bootstrap-form-validation](https://github.com/creamteam-de/ng-bootstrap-form-validation).
The fork

- upgrades angular to v13
- fixes bugs:
  - conflicting types for `@Input() formControl` in [this commit](https://github.com/kwsoft/ng-bootstrap-form-validation/commit/8f869e5a2b8494ccc2eb4599f8c733228b505466). ([Original Issue](https://github.com/third774/ng-bootstrap-form-validation/issues/103))
  - custom provided error messages not available in lazy loaded components in [this commit](https://github.com/kwsoft/ng-bootstrap-form-validation/commit/7ab8a9699374fdaee30a42746591fdc0940f0e79)
- configures the kwsoft npm registry 

### Build and Publish

At the moment there is no CICD build setup. Therefore, to build and publish the library to the internal @kwsoft registry follow these steps:

- Verify `npm run test`, `npm run lint` run successfully
- Verify demo application at `npm start` starts and works
- Adapt the version in the `package.json` files
- Build the library: `ng build --prod --project ng-bootstrap-form-validation`
- Go to the `dist` folder: `cd .\dist\ng-bootstrap-form-validation\` 
- Run `npm publish --access public` (use your `AD` credentials)

### Local Development and Linking

To link the library to use it in the branding module or another library follow these steps:

1. Build the library using `npm run build:watch` (this builds the library in a watch mode)
1. To link the library `npm run link`
1. Open the module in which you want to consume the library (e.g. probably `@kwsoft/common-ng-form`) and run `npm link @kwsoft/ng-bootstrap-form-validation`

## Install

1) Install by running `npm install @kwsoft/ng-bootstrap-form-validation --save`

2) Add `NgBootstrapFormValidationModule.forRoot()` to your `app.module.ts` imports:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';

import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

3) Add `NgBootstrapFormValidationModule` to other modules in your application:

```ts
import { NgModule } from '@angular/core';
import { OtherComponent } from './other.component';

import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

@NgModule({
  declarations: [
    OtherComponent
  ],
  imports: [
    NgBootstrapFormValidationModule
  ]
})
export class OtherModule { }
```

**Note:**
If you are only using a single (`app`) module, then you will need to import both:

```ts
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Basics

### Default Errors

By default, the validators found on the `Validators` class from `@angular/forms` module are handled for you out of the box. All you need to do is import the module.

### Usage
ng-bootstrap-form-validation works by using the `form-group` Bootstrap class on your divs as component selector, and projecting the content into a component which handles form validation feedback for you.

The `has-error` and `has-success` classes are automatically added or removed to your `form-group` based on whether or not the input is valid, and is both `touched` and `dirty`.

Validation messages appear when an input is `dirty`, `touched`, and has errors.

Submitting the form will iterate over all controls and mark them as `touched` and `dirty` to provide feedback to the user. Additionally, there is a `validSubmit` event on forms which you can bind to instead of `submit` to only fire off when the form is actually valid.

`basic-example.component.ts`

```ts
import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-basic-example',
  templateUrl: './basic-example.component.html',
  styleUrls: ['./basic-example.component.css']
})
export class BasicExampleComponent implements OnInit {

  formGroup: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])
    });
  }

  onSubmit() {
    console.log(this.formGroup);
  }

  onReset() {
    this.formGroup.reset();
  }

}
```

`basic-example.component.html`
```html
<div class="row">
  <div class="col-md-6 col-md-offset-3">
    <form [formGroup]="formGroup" (validSubmit)="onSubmit()">
      <div class="form-group">
        <label class="control-label">Email</label>
        <input type="text" class="form-control" formControlName="Email">
      </div>
      <div class="form-group">
        <label class="control-label">Password</label>
        <input type="password" class="form-control" formControlName="Password">
      </div>
      <button class="btn btn-default" type="button" (click)="onReset()">Reset</button>
      <button class="btn btn-primary pull-right" type="submit">Submit</button>
    </form>
  </div>
</div>
```

#### Custom error message placement

Note: the `<bfv-messsages></bfv-messages>` component still *must* be placed within the `<div class="form-group">`.

`basic-example.component.html`
```html
<div class="row">
  <div class="col-md-6 col-md-offset-3">
    <form class="form-horizontal" [formGroup]="formGroup" (validSubmit)="onSubmit()">
      <div class="form-group">
        <label class="control-label col-sm-2">Email</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" formControlName="Email">
          <bfv-messages></bfv-messages>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-2">Password</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" formControlName="Password">
          <bfv-messages></bfv-messages>
        </div>
      </div>
      <button class="btn btn-default" type="button" (click)="onReset()">Reset</button>
      <button class="btn btn-primary pull-right" type="submit">Submit</button>
    </form>
  </div>
</div>
```

## Custom Error Messages

### Module Level Custom Errors

You can provide an `ErrorMessage` array via the `CUSTOM_ERROR_MESSAGES` multi-provider in your module to provide custom errors across your module/app. In order for this to be AOT compatable, the function definitions **must** be exported. see below for an example

`custom-errors.ts`
```ts
import {ErrorMessage} from "ng-bootstrap-form-validation";

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: "required",
    format: requiredFormat
  }, {
    error: "email",
    format: emailFormat
  }
];

export function requiredFormat(label: string, error: any): string {
  return `${label} IS MOST DEFINITELY REQUIRED!`;
}

export function emailFormat(label: string, error: any): string {
  return `${label} doesn't look like a valid email address.`;
}
```

`app.module.ts`
```ts
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {
  NgBootstrapFormValidationModule,
  CUSTOM_ERROR_MESSAGES
} from "ng-bootstrap-form-validation";
import {AppComponent} from "./app.component";
import {CUSTOM_ERRORS} from "./custom-errors";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    HttpClientModule
  ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### Form Control Specific Custom Errors

In addition to providing custom errors at the top level using the `.forRoot()` method,
you can provide custom error messages to a specific control by binding to the
`customErrorMessages` directive on the `.form-group` element. Modifying the basic
example above, we can provide a one time custom error message to a specific `.form-group`. Unlike the global custom error messages, these functions do not need to be individually exported.

`custom-error-example.component.ts`
```ts
import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "../../lib/Models/ErrorMessage";

@Component({
  selector: 'app-custom-errors',
  templateUrl: './custom-errors.component.html',
  styleUrls: ['./custom-errors.component.css']
})
export class CustomErrorsComponent implements OnInit {

  formGroup: FormGroup;

  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `${label.toUpperCase()} IS DEFINITELY REQUIRED!`
    }, {
      error: 'pattern',
      format: (label, error) => `${label.toUpperCase()} DOESN'T LOOK RIGHT...`
    }
  ];

  ngOnInit() {
    this.formGroup = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])
    });
  }

  onSubmit() {
    console.log(this.formGroup);
  }

  onReset() {
    this.formGroup.reset();
  }

}
```

`custom-error-example.component.html`
```html
<div class="row">
  <div class="col-md-6 col-md-offset-3">
    <form [formGroup]="formGroup" (validSubmit)="onSubmit()">
      <div class="form-group" [customErrorMessages]="customErrorMessages">
        <label class="control-label">Email</label>
        <input type="text" class="form-control" formControlName="Email">
      </div>
      <div class="form-group">
        <label class="control-label">Password</label>
        <input type="password" class="form-control" formControlName="Password">
      </div>
      <button class="btn btn-default" type="button" (click)="onReset()">Reset</button>
      <button class="btn btn-primary pull-right" type="submit">Submit</button>
    </form>
  </div>
</div>
```

## Roadmap
* Add out of the box support for `ng2-validation` validators
