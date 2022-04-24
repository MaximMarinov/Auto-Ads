import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { IAd } from 'src/app/shared/interfaces/ad';
import { IUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  currentUser = this.authService.currentUser;

  isInEditMode: boolean = false

  adList: IAd[];

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getProfile$().subscribe({
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

  updateProfile(editProfileForm: NgForm) {
    console.log(editProfileForm.value)
    this.userService.editProfile$(editProfileForm.value).subscribe((user) => {
      this.currentUser = user;
    })
    this.isInEditMode = false
  }

}
