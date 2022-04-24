import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { AdService } from 'src/app/core/services/ad.service';
import { UserService } from 'src/app/core/services/user.service';
import { IAd } from 'src/app/shared/interfaces/ad';
import { IUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {

  @ViewChild('editAdForm') editAdForm: NgForm;

  ad: IAd;

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  isInEditMode = false;

  ownerId: string;
  currentUser = this.authService.currentUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adService: AdService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const adId = this.activatedRoute.snapshot.params['adId'];
      this.adService.getAdById(adId).subscribe(ad => {
        this.ad = ad;

        this.ownerId = ad?.owner.toString();
        

        if (!ad) {
          this.router.navigate['/ads'];
        }

      });
    });

    this.userService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.router.navigate(['/login'])
      }
    })
  }

  isOwner(): boolean {
    if (this.currentUser?._id == this.ownerId) {
      return true;
    } else {
      return false;
    }
  }

  enterEditMode(): void {
    this.isInEditMode = true;
    setTimeout(() => {
      this.editAdForm.form.patchValue({
        title: this.ad.title,
        img: this.ad.img,
        year: this.ad.year,
        engine: this.ad.engine,
        transmission: this.ad.transmission,
        place: this.ad.place,
        cubature: this.ad.cubature,
        mileage: this.ad.mileage,
        category: this.ad.category,
        eurostandard: this.ad.eurostandard,
        color: this.ad.color,
        description: this.ad.description,
        price: this.ad.price,
      })
    })
  }

  editAd(editAdForm: NgForm) {
    const adId = this.activatedRoute.snapshot.params['adId'];
    this.adService.editAd$(adId, editAdForm.value).subscribe((ad) => {
      this.ad = ad;
      this.router.navigate([`/ads/${adId}`])
    })
    this.isInEditMode = false
  }

  deleteAd() {
    const adId = this.activatedRoute.snapshot.params['adId'];
    this.adService.deleteAd$(adId).subscribe((ad) => {
      this.ad = ad;
      this.router.navigate(['/ads'])
    })
  }

}

