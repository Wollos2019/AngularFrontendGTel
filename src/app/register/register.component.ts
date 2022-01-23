import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:'',
      email:'',
      password:'',
      password_confirmation:''
    });
  }

  submitForm(): void {
    
    this.http.post(baseUrl+'register', this.form.getRawValue())
    .subscribe( () => this.router.navigate(['/login']));
  }

}
