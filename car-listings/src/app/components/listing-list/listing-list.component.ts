import { Listing } from '../../shared/services/listing';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListingService } from 'src/app/shared/services/listing.service';

@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.css'],
})
export class ListingListComponent {
  dataSource: MatTableDataSource<Listing>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ListingData: any = [];
  displayedColumns: any[] = [
    '$key',
    'image_url',
    'title',
    'year',
    'engine',
    'transmission',
    'place',
    'horse_power',
    'mileage',
    'cubature',
    'category',
    'eurostandart',
    'color',
    'action'
  ];

  constructor(private listingApi: ListingService) {
    this.listingApi
      .GetListingList()
      .snapshotChanges()
      .subscribe((listings) => {
        listings.forEach((item) => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.ListingData.push(a as Listing);
        });
        /* Data table */
        this.dataSource = new MatTableDataSource(this.ListingData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
  }

  /* Delete */
  deleteListing(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.listingApi.DeleteListing(e.$key);
    }
  }
}
