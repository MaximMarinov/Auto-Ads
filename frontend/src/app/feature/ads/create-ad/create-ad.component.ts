import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { emailValidator } from 'src/app/auth/util';
import { AdService } from 'src/app/core/services/ad.service';
@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {

  engines: any[] = [
    {name: 'Diesel'},
    {name: 'Petrol'},
    {name: 'Gas'},
  ]

  transmissions: any[] = [
    {name: 'Manual'},
    {name: 'Semi'},
    {name: 'Automatic'},
  ]

  categories: any[] = [
    {name: 'Sedan'},
    {name: 'Coupe'},
    {name: 'Hatchback'},
    {name: 'Station Wagon'},
    {name: 'Convertible'},
    {name: 'SUV'},
    {name: 'Minivan'},
    {name: 'Pickup Truck'},
  ]

  eurostandards: any[] = [
    {name: '1'},
    {name: '2'},
    {name: '3'},
    {name: '4'},
    {name: '5'},
  ]

  selectedItem: string;

  imagePreview: string;

  createFormGroup = this.formBuilder.group({
    'title': new FormControl('', [Validators.required, Validators.minLength(5)]),
    'img': new FormControl('', [Validators.required]),
    'year': new FormControl('', [Validators.required]),
    'engine': new FormControl('', [Validators.required]),
    'transmission': new FormControl('', [Validators.required]),
    'place': new FormControl('', [Validators.required]),
    'cubature': new FormControl('', [Validators.required]),
    'mileage': new FormControl('', [Validators.required]),
    'category': new FormControl('', [Validators.required]),
    'eurostandard': new FormControl('', [Validators.required]),
    'color': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required, Validators.minLength(10)]),
    'price': new FormControl('', [Validators.required]),
  });

  constructor (
      private adService: AdService, 
      private router: Router, 
      private authService: AuthService,
      private formBuilder: FormBuilder, 
    ) { }

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  ngOnInit(): void {
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.createFormGroup.patchValue({img: file});
    this.createFormGroup.get('img').updateValueAndValidity();
    const reader = new FileReader;
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  handleCreate(): void {
    this.adService.createAd$(this.createFormGroup.value).subscribe({
          next: (ad) => {
            this.router.navigate(['/ads'])
            console.log(this.createFormGroup)
          },
          error: (err) => {
            console.error(err);
          }
        });
  }


  // submitNewAd(newAdForm: NgForm): void {
  //   this.adService.createAd$(newAdForm.value).subscribe({
  //     next: (ad) => {
  //       this.router.navigate(['/ads'])
  //       console.log(newAdForm)
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     }
  //   });
  // } 

}
