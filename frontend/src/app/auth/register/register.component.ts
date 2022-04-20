import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, CreateUserDto } from 'src/app/core/services/auth.service';
import { emailValidator, passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup
  }

  registerFormGroup = this.formBuilder.group({
    'fullName': new FormControl(null, [Validators.required]),
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'phone': new FormControl(null, [Validators.required, Validators.minLength(10)]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePass': new FormControl(null, [Validators.required, passwordMatch(this.passwordControl)]),
    }),
  });

  public errorHandling = (control: string, error: string) => {
    return this.registerFormGroup.controls[control].hasError(error);
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleRegister(): void {

    const body: CreateUserDto = {
      fullName: this.registerFormGroup.value.fullName,
      email: this.registerFormGroup.value.email,
      phone: this.registerFormGroup.value.phone,
      password: this.registerFormGroup.value.passwords.password,
    }

    this.authService.register$(body).subscribe(() => {
      this.router.navigate(['/'])
    });

  }
}
