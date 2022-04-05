import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListingService } from 'src/app/shared/services/listing.service';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css'],
})
export class EditListingComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editListingForm: FormGroup;
  // BindingType: any = [
  //   'Paperback',
  //   'Case binding',
  //   'Perfect binding',
  //   'Saddle stitch binding',
  //   'Spiral binding',
  // ];

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

  ngOnInit() {
    this.updateListingForm();
  }

  constructor(
    public fb: FormBuilder,
    private location: Location,
    private listingApi: ListingService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.listingApi
      .GetListing(id)
      .valueChanges()
      .subscribe((data) => {
        // this.languageArray = data.languages;
        this.editListingForm.setValue(data);
      });
  }

  /* Update form */
  updateListingForm() {
    this.editListingForm = this.fb.group({
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

  /* Add language */
  // add(event: MatChipInputEvent): void {
  //   var input: any = event.input;
  //   var value: any = event.value;
  //   // Add language
  //   if ((value || '').trim() && this.languageArray.length < 5) {
  //     this.languageArray.push({ name: value.trim() });
  //   }
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  /* Remove language */
  // remove(language: any): void {
  //   const index = this.languageArray.indexOf(language);
  //   if (index >= 0) {
  //     this.languageArray.splice(index, 1);
  //   }
  // }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.editListingForm.controls[controlName].hasError(errorName);
  };

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editListingForm.get('year').setValue(convertDate, {
      onlyself: true,
    });
  }

  /* Go to previous page */
  goBack() {
    this.location.back();
  }

  /* Submit Listing */
  updateListing() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you wanna update?')) {
      this.listingApi.UpdateListing(id, this.editListingForm.value);
      this.router.navigate(['listings-list']);
    }
  }
}
