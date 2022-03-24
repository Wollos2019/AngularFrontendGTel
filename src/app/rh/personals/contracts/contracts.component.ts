import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contract } from 'src/app/config/model/contract.model';
import { Department } from 'src/app/config/model/department.model';
import { Fonction } from 'src/app/config/model/fonctions.model';
import { ConfigService } from 'src/app/config/services/config.service';
declare var $: any;
@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit {
  @Input() contracts?: Contract[];
  contract!: Contract;
  conct=new Contract();
  editForm = this.fb.group({
    salary: [null, [Validators.required]],
    departmentId: ['', [Validators.required]],
    fonctionId: ['', [Validators.required]],
    contractId: ['', [Validators.required]],
    dateStart: ['', [Validators.required]],
    dateEnd: [''],
  });
  submitted = false;
  loading = false;
  fonctions!: Fonction[];
  contractsData!: Fonction[];
  departemnts!: Department[];
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private configService: ConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllContracts();
    this.getAllFonctions();
    this.getAllDepartments();
  }
  get f(): any {
    return this.editForm?.controls;
  }

  getAllFonctions(): void {
    this.configService.getAllFonctions('per_page=*').subscribe({
      next: (fonctions: Fonction[]) => {
        this.fonctions = fonctions;
        this.editForm.get('fonction')?.enable();
        this.editForm.updateValueAndValidity();

        console.log(fonctions);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  getAllDepartments(): void {
    this.configService.getAllDepartments('per_page=*').subscribe({
      next: (departemnts: Department[]) => {
        this.departemnts = departemnts;
        this.editForm.get('departmentId')?.enable();
        this.editForm.updateValueAndValidity();
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  getAllContracts(): void {
    this.configService.getAllContracts('per_page=*').subscribe({
      next: (contracts: Contract[]) => {
        this.contractsData = contracts;
        this.editForm.get('contractId')?.enable();
        this.editForm.updateValueAndValidity();

        console.log(contracts);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  openContract(contract: Contract): void {
    $('#modalContract').modal('show');
    this.contract = contract;
    this.editForm.get('dateStart')?.setValue(contract.pivot?.dateStart);
    this.editForm.get('dateEnd')?.setValue(contract.pivot?.dateEnd);
    this.editForm.get('salary')?.setValue(contract.pivot?.salary);
    this.editForm.get('fonctionId')?.setValue(contract.pivot?.fonctionId);
    this.editForm.get('departmentId')?.setValue(contract.pivot?.departmentId);
    this.editForm.get('contractId')?.setValue(contract.pivot?.contractId);
  }
  update(): void {}
  openModalConfirm(): void {}
  print(contract: Contract): void {
    this.router.navigate(['/rh/personals', contract.id, 'contract']);
  }
}
