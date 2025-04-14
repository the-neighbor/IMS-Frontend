import { Component, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from "../modal/modal.component";
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, map, of } from 'rxjs';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, ModalComponent, CommonModule, IconComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  emailTakenValidator: AsyncValidatorFn = (control: AbstractControl) => {
    return this.authService.checkEmail(control.value).pipe(
      map((response) => (response.data === 'true' ? { emailTaken: true } : null)),
      catchError(() => of(null))
    );
  }

  registerForm : FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1)],
      updateOn: 'blur' //| 'submit'
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.emailTakenValidator],
      updateOn: 'blur' //| 'submit'
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
      updateOn: 'blur' //| 'submit'
    }),
    role: new FormControl('USER', {
      validators: [Validators.required],
      updateOn: 'blur'//'submit' //| 'submit'
    })
  });

  showModalValue: boolean = false;
  @Input()set showModal(value: boolean) {
    if (!value && this.showModalValue) {
      this.closeModal.emit();
    }
    this.showModalValue = value;
    // console.log(this.showModalValue);
    // if (value) {
    //   this.registerForm.reset();
    // }
  }
  get showModal() {
    return this.showModalValue;
  }
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

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

    
}
