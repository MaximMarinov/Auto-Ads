import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return {
            email: true,
        }
    }

    return null
}

export function passwordMatch(passwordFormControl: AbstractControl) {
    return (rePassFormControl: AbstractControl) => {
        if (passwordFormControl.value !== rePassFormControl.value) {
            return {
                passwordMatch: true
            }
        }
        return null   
    }
}