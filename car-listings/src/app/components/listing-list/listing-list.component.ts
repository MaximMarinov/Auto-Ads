import { Listing } from '../../shared/services/listing';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListingService } from 'src/app/shared/services/listing.service';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.css'],
})
export class ListingListComponent implements OnInit {

  userData: User

  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  ListingData: any = [];

  // displayedColumns: any[] = [
  //   '$key',
  //   'image_url',
  //   'title',
  //   'year',
  //   'engine',
  //   'transmission',
  //   'place',
  //   'horse_power',
  //   'mileage',
  //   'cubature',
  //   'category',
  //   'eurostandart',
  //   'color',
  //   'action'
  // ];

  constructor(private listingApi: ListingService, public authService: AuthService) {
    this.listingApi
      .GetListingList()
      .snapshotChanges()
      .subscribe((listings) => {
        listings.forEach((item) => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.ListingData.push(a as Listing);
        });
      });
  }

  ngOnInit(): void {
  }

  isCreator(): boolean {
    const currentUserUID = this.authService.getUserUID();
    if (currentUserUID == this.ListingData.creatorUID) {
      return true;
    }
    return false
  }
}
  /* Delete */
//   deleteListing(index: number, e) {
//     if (window.confirm('Are you sure?')) {
//       const data = this.dataSource.data;
//       data.splice(
//         this.paginator.pageIndex * this.paginator.pageSize + index,
//         1
//       );
//       this.dataSource.data = data;
//       this.listingApi.DeleteListing(e.$key);
//     }
//   }
// }
