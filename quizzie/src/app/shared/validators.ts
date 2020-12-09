import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function usernameValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value as string;
  if (!value) {
    return null;
  }
  const isValidUsername = /[a-zA-Z0-9]+/g.test(value);
  return isValidUsername ? null : { usernameValidator: true };
}

export function rePasswordValidatorFactory(
  targetControl: AbstractControl
): ValidatorFn {
  return function rePasswordValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const areTheSame = targetControl.value === control.value;
    return areTheSame ? null : { rePasswordValidator: true };
  };
}
