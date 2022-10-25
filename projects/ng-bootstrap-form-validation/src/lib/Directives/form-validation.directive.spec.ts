import { FormValidationDirective } from "./form-validation.directive";
import {FormControl, FormControlStatus, FormGroup} from "@angular/forms";
import {EventEmitter} from "@angular/core";

describe("FormGroupDirective", () => {
  it("should create an instance", () => {
    const directive = new FormValidationDirective();
    expect(directive).toBeTruthy();
  });

  describe("updateValueAndValiditySilent", () => {
    let control: FormControl;
    const directive = new FormValidationDirective();

    beforeEach(() => {
      control = new FormControl("name");
    });

    it("call updateValueAndValidity without event emit", () => {
      spyOn(control, "updateValueAndValidity");

      directive.updateValueAndValiditySilent(control);

      expect(control.updateValueAndValidity).toHaveBeenCalledOnceWith({ emitEvent: false });
    });

    it("emits status change event", () => {
      const spyEmitStatusChanges = spyOn((control.statusChanges as EventEmitter<FormControlStatus>), "emit");

      directive.updateValueAndValiditySilent(control);

      expect(spyEmitStatusChanges).toHaveBeenCalledOnceWith("VALID");
    });

    it("does not emit value change event", () => {
      const spyValueChanges = spyOn((control.valueChanges as EventEmitter<any>), "emit");

      directive.updateValueAndValiditySilent(control);

      expect(spyValueChanges).not.toHaveBeenCalled();
    });

    it("call the updateValueAndValiditySilent for the parent", () => {
      const parent = new FormGroup({});
      control.setParent(parent);
      const spyUpdateValueAndValiditySilent = spyOn(directive, "updateValueAndValiditySilent").and.callThrough();

      directive.updateValueAndValiditySilent(control);

      expect(spyUpdateValueAndValiditySilent).toHaveBeenCalledTimes(2);
      expect(spyUpdateValueAndValiditySilent).toHaveBeenCalledWith(control);
      expect(spyUpdateValueAndValiditySilent).toHaveBeenCalledWith(parent);
    });
  });
});
