import { Injectable } from '@angular/core';
import { Listing } from './listing';


import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root',
})
export class ListingService {
  listingsRef: AngularFireList<any>;
  listingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  /* Create listing */
  AddListing(listing: Listing) {
    this.listingsRef
      .push({
        image_url: listing.image_url,
        title: listing.title,
        year: listing.year,
        engine: listing.engine,
        transmission: listing.transmission,
        place: listing.place,
        horse_power: listing.horse_power,
        mileage: listing.mileage,
        cubature: listing.cubature,
        category: listing.category,
        eurostandart: listing.eurostandart,
        color: listing.color,
      })
      .catch((error) => {
        this.errorMgmt(error);
      });
  }

  /* Get listing */
  GetListing(id: string) {
    this.listingRef = this.db.object('listings-list/' + id);
    return this.listingRef;
  }

  /* Get listing list */
  GetListingList() {
    this.listingsRef = this.db.list('listings-list');
    return this.listingsRef;
  }

  /* Update listing */
  UpdateListing(id, listing: Listing) {
    this.listingRef
      .update({
        image_url: listing.image_url,
        title: listing.title,
        year: listing.year,
        engine: listing.engine,
        transmission: listing.transmission,
        place: listing.place,
        horse_power: listing.horse_power,
        mileage: listing.mileage,
        cubature: listing.cubature,
        category: listing.category,
        eurostandart: listing.eurostandart,
        color: listing.color,
      })
      .catch((error) => {
        this.errorMgmt(error);
      });
  }

  /* Delete listing */
  DeleteListing(id: string) {
    this.listingRef = this.db.object('listings-list/' + id);
    this.listingRef.remove().catch((error) => {
      this.errorMgmt(error);
    });
  }

  // Error management
  private errorMgmt(error) {
    console.log(error);
  }
}
