import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Country } from '../model/countries.model';
import { Department } from '../model/department.model';
import { ConfigService } from '../services/config.service';
declare var $: any;
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  editForm = this.fb.group({
    name: [null, [Validators.required]],
    abbreviation1: [null, [Validators.required]],
    abbreviation2: [null, [Validators.required]],
    codePhone: [null, [Validators.required]],
    code: [null],

    description: [null],
  });
  submitted = false;
  countries?: Country[];
  country = new Country();
  loading = false;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.getAllCountries();
  }
  get f(): any {
    return this.editForm?.controls;
  }
  save(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }
    this.submitted = false;
    console.log(this.editForm.value);
    const { name, description, abbreviation1, abbreviation2, code, codePhone } =
      this.editForm.value;
    this.country.description = description;
    this.country.name = name;
    this.country.abbreviation1 = abbreviation1;
    this.country.abbreviation2 = abbreviation2;
    this.country.code = code;
    this.country.codePhone = codePhone;

    this.loading = true;
    this.configService.createCountry(this.country).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectué!!');
        this.getAllCountries();
        this.editForm.reset();
        $('#modalDepartment').modal('hide');
      },
      error: (error) => {
        console.error('Error', error);
        this.loading = false;
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la création",
          'Error'
        );
      },
    });
  }

  getAllCountries(params = ''): void {
    this.loading = true;
    this.configService.getAllCountries(params).subscribe({
      next: (countries: any) => {
        this.loading = false;
        console.log('countries', countries);
        this.countries = countries.data;
      },
      error: (error: any) => {
        this.loading = false;
        console.error('Error', error);

        this.toastr.error(
          "Une Erreur c'est produite l'hors de la recupération des donnnées ",
          'Error'
        );
      },
    });
  }
}
