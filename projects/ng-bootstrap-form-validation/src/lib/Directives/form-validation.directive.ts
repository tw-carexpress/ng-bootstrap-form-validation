import {
  Directive,
  EventEmitter,
  Input,
  Output,
  HostListener
} from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl, FormControlStatus,
  FormGroup
} from "@angular/forms";

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "[formGroup]"
})
export class FormValidationDirective {
  @Input()
  formGroup: FormGroup;
  @Output()
  validSubmit = new EventEmitter<any>();

  @HostListener("submit")
  onSubmit() {
    this.markAsTouchedAndDirty(this.formGroup);
    if (this.formGroup.valid) {
      this.validSubmit.emit(this.formGroup.value);
    }
  }

  markAsTouchedAndDirty(control: AbstractControl) {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach(key =>
        this.markAsTouchedAndDirty(control.controls[key])
      );
    } else if (control instanceof FormArray) {
      control.controls.forEach(c => this.markAsTouchedAndDirty(c));
    } else if (control instanceof FormControl && control.enabled) {
      control.markAsDirty();
      control.markAsTouched();
      this.updateValueAndValiditySilent(control);
    }
  }

  /**
   * Custom function for updating the value and validity of a control without triggering a value change event.
   * The implementation does the following:
   *  - calls the standard `AbstractControl.updateValueAndValidity` without emitting events
   *  - manually emit the statusChange event
   *  - call the same method for the parent, if defined
   * @see angular implementation: https://github.com/angular/angular/blob/main/packages/forms/src/model/abstract_model.ts#L1045
   * @fixes https://redmine.kwsoft.ch/issues/14376
   */
  updateValueAndValiditySilent(control: AbstractControl) {
    control.updateValueAndValidity({emitEvent: false});

    (control.statusChanges as EventEmitter<FormControlStatus>).emit(control.status);
    if (control.parent) {
      this.updateValueAndValiditySilent(control.parent);
    }
  }
}
