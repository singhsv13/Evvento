import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector : '[appFutureDate]',
  providers : [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomDateValidatorDirective,
      multi: true,
    },
  ]
})
export class CustomDateValidatorDirective implements Validators {
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; 
    }

    const inputDate = new Date(control.value);
    const currentDate = new Date();


    currentDate.setHours(0, 0, 0, 0);

    if (inputDate < currentDate) {
      return { invalidDate: true }; 
    }
    return null; 
  }
}
