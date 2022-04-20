import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  currentUser: IUser;

  isInEditMode: boolean = false

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.router.navigate(['/login'])
      }
    })
  }

  enterEditMode(): void {
    this.isInEditMode = true;
    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        fullName: this.currentUser.fullName,
        email: this.currentUser.email,
        phone: this.currentUser.phone
      })
    })
  }

  updateProfile() {
    console.log(this.editProfileForm.value)

    this.isInEditMode = false
  }

}
