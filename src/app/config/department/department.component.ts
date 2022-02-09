import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../model/department.model';
import { ConfigService } from '../services/config.service';
declare var $:any;
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
 editForm = this.fb.group({
    name: [null, [Validators.required]],
    description: [null],
  });
  submitted=false;
  departments?:Department[];
  department=new Department();
  loading=false;
  constructor(private toastr: ToastrService,
    private fb: FormBuilder,
    private configService:ConfigService
    ) { }

  ngOnInit(): void {
    this.getAllDepartments();

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
    const { name, description } = this.editForm.value;
    this.department.description=description;
    this.department.name=name;
    this.loading = true;
    this.configService.createDepartment(this.department).subscribe({
      next:()=>{
        this.loading = false;
        this.toastr.success('Enregistrement effectué!!');
        this.getAllDepartments();
        this.editForm.reset();
        $('#modalDepartment').modal('hide');
      },
      error:(error)=>{
        console.error('Error', error);
        this.loading = false;
        this.toastr.error(
          "Une Erreur c'est produite l'hors de la création",
          'Error'
        );
      }
    })

  }

  getAllDepartments(params=''):void{
    this.loading = true;
    this.configService.getAllDepartments(params).subscribe({
      next: (departments: any) => {
        this.loading = false;
        console.log(departments);
        this.departments = departments.data;
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
