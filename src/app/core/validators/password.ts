import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;




export function checkPasswordEqual(val1: string, val2:string): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const valueA = formGroup.get(val1)?.value
    const valueB = formGroup.get(val2)?.value

    if(valueA === valueB){
      return null
    }else{
      return {valuesDoNotMatch: true}
    }
  }
}

export function checkPasswordType(val:string): ValidatorFn{
  return (controls: AbstractControl): ValidationErrors | null => {
    if(typeof(val)){
      return {
        isString: typeof(val)
      }
    }else{
      return null
    }

  }
}
