import { Component, OnInit } from "@angular/core";
import {
  UntypedFormGroup,
  Validators,
  UntypedFormControl
} from "@angular/forms";

@Component({
  selector: "app-default-errors-demo",
  templateUrl: "./default-errors-demo.component.html",
  styleUrls: ["./default-errors-demo.component.css"]
})
export class DefaultErrorsDemoComponent implements OnInit {
  formGroup = new UntypedFormGroup({
    email: new UntypedFormControl("", Validators.email),
    requiredField: new UntypedFormControl("", Validators.required),
    pattern: new UntypedFormControl("", Validators.pattern(/foobar/)),
    minValue: new UntypedFormControl(0, Validators.min(10)),
    maxValue: new UntypedFormControl(10, Validators.max(5))
  });

  constructor() {}

  ngOnInit() {}

  handleValidSubmit() {
    console.log(this.formGroup.value);
  }

  handleReset() {
    this.formGroup.reset({
      minValue: 0,
      maxValue: 10
    });
  }
}
