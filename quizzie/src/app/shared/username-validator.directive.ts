import { Directive } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  Validator,
  NG_VALIDATORS,
} from '@angular/forms';
import { usernameValidator } from './validators';

@Directive({
  selector: '[ngModel][appUsernameValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: UsernameValidatorDirective,
    },
  ],
})
export class UsernameValidatorDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors {
    return usernameValidator(control);
  }
}
