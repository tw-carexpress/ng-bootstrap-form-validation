import { Component, OnInit } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  UntypedFormArray
} from "@angular/forms";

@Component({
  selector: "app-bootstrap-four-basic",
  templateUrl: "./bootstrap-four-basic.component.html",
  styleUrls: ["./bootstrap-four-basic.component.css"]
})
export class BootstrapFourBasicComponent implements OnInit {
  formGroup = new UntypedFormGroup({
    firstName: new UntypedFormControl("", Validators.required),
    lastName: new UntypedFormControl("", Validators.required),
    email: new UntypedFormControl("", Validators.email),
    city: new UntypedFormControl("", Validators.required),
    state: new UntypedFormControl("", Validators.required),
    zip: new UntypedFormControl("", Validators.required),
    phoneNumbers: new UntypedFormArray([
      new UntypedFormGroup({
        type: new UntypedFormControl("", Validators.required),
        number: new UntypedFormControl("", Validators.required)
      })
    ]),
    agreeToTerms: new UntypedFormControl(false, Validators.required),
    bestPet: new UntypedFormControl(null, Validators.required)
  });

  constructor() {}

  ngOnInit() {}

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

  handleReset() {
    this.formGroup.reset();
  }
}

// .custom-control-input.is-invalid~.custom-control-label
