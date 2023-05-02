import { FormGroup, ValidatorFn } from '@angular/forms';

export const compareValidator: ValidatorFn = (control: FormGroup) => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value ? null : { 'mismatch': true };
};
