import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { AdService } from 'src/app/core/services/ad.service';
@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {


  constructor (
      private adService: AdService, 
      private router: Router, 
      private authService: AuthService, 
    ) { }

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  ngOnInit(): void {
  }

  submitNewAd(newAdForm: NgForm): void {
    this.adService.createAd$(newAdForm.value).subscribe({
      next: (ad) => {
        this.router.navigate(['/ads'])
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
