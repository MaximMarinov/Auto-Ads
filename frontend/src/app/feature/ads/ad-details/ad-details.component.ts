import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdService } from 'src/app/core/services/ad.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IAd } from 'src/app/shared/interfaces/ad';
import { IUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {

  ad: IAd;

  isLogged: boolean = this.authService.isLogged;

  get currentUser(): IUser {
    return this.authService.currentUser;
  }

  get isOwner(): boolean {
    if (this.currentUser === this.ad.creator) {
      return true
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private adService: AdService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const adId = this.activatedRoute.snapshot.params['adId'];
      this.adService.getAdById(adId).subscribe(ad => {
        this.ad = ad;
      });
    });
  }

}
