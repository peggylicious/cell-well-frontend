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


export function patternvalidator(val: string):ValidatorFn{
  // const regexNum = new RegExp("(?=.*[0-9])");
  // const regexUpper = new RegExp("(?=.*[A-Z])");
  // const regexLower = new RegExp("(?=.*[a-z])");
  // const regexSpecial = new RegExp("(?=.*[$@^!%*?&])");
  return (control: AbstractControl): ValidationErrors | null => {
    // const userPassword = control.get(val)?.value
    // const passwordErrors: Record<string, any> = {}
    // if(userPassword.length > 0){ //Checks if password field is empty
    //   if(!regexNum.test(userPassword)){
    //     passwordErrors['requireNum'] = "Must contain atleast 1 digit"
    //   }
    //   if(!regexUpper.test(userPassword)){
    //     passwordErrors['requireUppercase'] = 'Must contain atleast one uppercase letter'
    //   }
    //   if(!regexLower.test(userPassword)){
    //     passwordErrors['requireLowercase'] = 'Must contain at least 1 lowercase character'
    //   }
    //   if(!regexSpecial.test(userPassword)){
    //     passwordErrors['requireSpecialCharacter'] = 'Must contain at least 1 special character'
    //   }
    // return {passwordErrors: passwordErrors}

    // }else{
    //   return null
    // }
    console.log(control.errors?.['passwordErrors'])
    return JSON.stringify(control.errors?.['passwordErrors']) === '{}'? null: checkValidity(control, val)
  }
}

function checkValidity(control: AbstractControl, val:string){
  const regexNum = new RegExp("(?=.*[0-9])");
  const regexUpper = new RegExp("(?=.*[A-Z])");
  const regexLower = new RegExp("(?=.*[a-z])");
  const regexSpecial = new RegExp("(?=.*[$@^!%*?&])");
  const userPassword = control.get(val)?.value
    const passwordErrors: Record<string, any> = {}
      if(!regexNum.test(userPassword)){
        passwordErrors['requireNum'] = "Must contain atleast 1 digit"
      }
      if(!regexUpper.test(userPassword)){
        passwordErrors['requireUppercase'] = 'Must contain atleast one uppercase letter'
      }
      if(!regexLower.test(userPassword)){
        passwordErrors['requireLowercase'] = 'Must contain at least 1 lowercase character'
      }
      if(!regexSpecial.test(userPassword)){
        passwordErrors['requireSpecialCharacter'] = 'Must contain at least 1 special character'
      }
    return {passwordErrors: passwordErrors}
}
