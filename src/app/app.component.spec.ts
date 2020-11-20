import { TestBed, waitForAsync } from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";

import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BootstrapThreeModule } from "./bootstrap-three/bootstrap-three.module";
import { BootstrapFourModule } from "./bootstrap-four/bootstrap-four.module";
import { RouterModule } from "@angular/router";
import { NgBootstrapFormValidationModule } from "../../projects/ng-bootstrap-form-validation/src/lib/ng-bootstrap-form-validation.module";
import { appRoutes } from "./app.routes";

describe("AppComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BootstrapThreeModule,
        BootstrapFourModule,
        RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
        NgBootstrapFormValidationModule.forRoot()
      ],
      declarations: [AppComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: "/" }]
    }).compileComponents();
  }));

  it("should create the app", waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
