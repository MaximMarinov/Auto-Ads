import { Component, OnInit } from '@angular/core';
import { IAd } from 'src/app/shared/interfaces/ad';
import { AdService } from 'src/app/core/services/ad.service';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {

  adList: IAd[];


  constructor(public adService: AdService) { }

  ngOnInit(): void {
    this.adService.getAllAds$().subscribe(adList => {
      this.adList = adList
    });
  }

  gridColumns = 4;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 4 ? 5 : 4;
  }

}
