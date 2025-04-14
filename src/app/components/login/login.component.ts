import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, ModalComponent, CommonModule, IconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  @Output() closeModal = new EventEmitter<void>();

  showModalValue: boolean = false;
  successfullyLoggedIn: boolean = false;
  successMessage: string = 'Successfully logged in!';
  errorMessage: string = 'Invalid credentials.';
  gotError: boolean = false;
  gotSuccess: boolean = false;

  @Input() set showModal(value: boolean) {
    if (!value && this.showModalValue) {
      this.closeModal.emit();
    }
    this.showModalValue = value;
    console.log(this.showModalValue);
  }
  get showModal() {
    return this.showModalValue;
  }
  loginForm : FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('USER')
  });

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response?.data) {
          this.successfullyLoggedIn = true;
          this.gotSuccess = true;
          this.gotError = false;
          //close modal in 2 seconds
          setTimeout(() => {
            this.showModal = false;
            this.gotSuccess = false;
            this.gotError = false;
          }, 2000);
        }
      },
      (error) => {
        console.error(error);
        this.successfullyLoggedIn = false;
        this.gotError = true;
        this.gotSuccess = false;
      }
    );
  }
}
