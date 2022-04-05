import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListingService } from 'src/app/shared/services/listing.service';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css'],
})
export class AddListingComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  // languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  @ViewChild('resetListingForm') myNgForm;

  listingForm: FormGroup;

  Engine: any = [
    'Petrol',
    'Diesel',
    'Gas',
  ];

  Transmission: any = [
    'Manual',
    'Automatic',
    'Semi-Automatic',
  ];

  Category: any = [
    'Hatchback',
    'Sedan',
    'SUV',
    'MUV',
    'Crossover',
    'Coupe',
    'Convertible',
  ];

  Eurostandart: any = [
    '1',
    '2',
    '3',
    '4',
    '5',
  ];

  Color: any = [
    'Black',
    'Red',
    'Grey',
    'White'
  ]

  startDate = new Date(1990, 0, 1);

  ngOnInit() {
    this.listingApi.GetListingList();
    this.submitListingForm();
  }

  constructor(public fb: FormBuilder, private listingApi: ListingService) {}

  /* Remove dynamic languages */
  // remove(language: Language): void {
  //   const index = this.languageArray.indexOf(language);
  //   if (index >= 0) {
  //     this.languageArray.splice(index, 1);
  //   }
  // }

  /* Reactive listing form */
  submitListingForm() {
    this.listingForm = this.fb.group({
      image_url: ['', [Validators.required]],
      title: ['', [Validators.required]],
      year: ['', [Validators.required]],
      engine: ['', [Validators.required]],
      transmission: ['', [Validators.required]],
      place: ['', [Validators.required]],
      horse_power: ['', [Validators.required]],
      mileage: ['', [Validators.required]],
      cubature: ['', [Validators.required]],
      category: ['', [Validators.required]],
      eurostandart: ['', [Validators.required]],
      color: ['', [Validators.required]],
      
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.listingForm.controls[controlName].hasError(errorName);
  };

  /* Add dynamic languages */
  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //   // Add language
  //   if ((value || '').trim() && this.languageArray.length < 5) {
  //     this.languageArray.push({ name: value.trim() });
  //   }
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.listingForm.get('year').setValue(convertDate, {
      onlyself: true,
    });
  }

  /* Reset form */
  resetForm() {
    // this.languageArray = [];
    this.listingForm.reset();
    Object.keys(this.listingForm.controls).forEach((key) => {
      this.listingForm.controls[key].setErrors(null);
    });
  }

  /* Submit listing */
  submitListing() {
    if (this.listingForm.valid) {
      this.listingApi.AddListing(this.listingForm.value);
      this.resetForm();
    }
  }
}
