import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailTakenValidator } from '../../validators/emailTakenValidator';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  registerForm : FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1)],
      updateOn: 'blur' //| 'submit'
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.makeEmailTakenValidator()],
      updateOn: 'blur' //| 'submit'
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
      updateOn: 'blur' //| 'submit'
    }),
    role: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'submit' //| 'submit'
    })
  });

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  makeEmailTakenValidator() {
    return new emailTakenValidator(this.authService).validate;
  }
}
