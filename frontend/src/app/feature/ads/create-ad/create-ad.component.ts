import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdService } from 'src/app/core/services/ad.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/user';
@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {


  constructor(private adService: AdService, private router: Router, private authService: AuthService) { }

  get currentUser(): IUser {
    return this.authService.currentUser;
  }

  ngOnInit(): void {
  }

  submitNewAd(newAdForm: NgForm): void {
    this.adService.createAd$(newAdForm.value).subscribe({
      next: (ad) => {
        ad.creator = this.currentUser;
        this.router.navigate(['/ads'])
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
