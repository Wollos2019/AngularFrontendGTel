import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Contract, Measure } from '../model/contract.model';
import { ConfigService } from '../services/config.service';
declare var $: any;
@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {
  submitted = false;
  contracts?: Contract[];
  contract = new Contract();
  loading = false;
  measure=Measure;
  contractId?: number;
  editForm = this.fb.group({
    name: [null, [Validators.required]],
    test: [null, [Validators.required]],
    term: [null, [Validators.required]],
    termMeasure: ['', [Validators.required]],
    description: [null],
  });
  constructor(private configService:ConfigService, private toastr: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllContracts();
  }

  getAllContracts():void{
    this.loading = true;
    this.configService.getAllContracts().subscribe({
      next: (contracts: any) => {
        this.loading = false;
        console.log(contracts);
        this.contracts = contracts.data;
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
    const { name, description,term,test,termMeasure } = this.editForm.value;
    this.contract.description = description;
    this.contract.name = name;
    this.contract.term=term;
    this.contract.test=test;
    this.contract.termMeasure=termMeasure;
    this.loading = true;
    this.configService.createContract(this.contract).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Enregistrement effectué!!');
        this.getAllContracts();
        this.editForm.reset();
        $('#modalContract').modal('hide');
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
}
