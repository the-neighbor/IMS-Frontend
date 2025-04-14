import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { catchError, map, Observable, of } from "rxjs";

export class emailTakenValidator implements AsyncValidator {
    constructor(private authService: AuthService) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        console.log('validating email ' + control.value);
        return this.authService.checkEmail(control.value).pipe(
            map((response) => {
                if (response.data === "true") {
                    return { emailTaken: true };
                }
                return null;
            }),
            catchError(() => of(null))
        );
    }
    boundValidator() {
        return this.validate.bind(this);
    }
}