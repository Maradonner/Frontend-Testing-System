import {FormGroup, ValidatorFn} from "@angular/forms";

export function atLeastOneCheckboxCheckedValidator(minRequired = 1): ValidatorFn {
  console.log(minRequired)
  return function validate(formGroup: FormGroup) {
    let checked = 0;

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      if (control.value.isCorrect === true) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireCheckboxToBeChecked: true,
      };
    }

    return null;
  };
}
