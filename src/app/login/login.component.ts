import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private authService:AuthServiceService,
              
              private router:Router,
            
            
              ) { }

  ngOnInit(): void {
    this.formInit();
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('sidebar-mini');
    body.classList.add('login-page');
  }
  ngAfterViewInit(): void {
 
  }

  formInit() {
    this.formGroup = new FormGroup ({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    // this.formGroup = this.formBuilder.group({
      
    //   email:'',
    //   password:''
      
    // });
  }
  
  loginProcess() {
    this.router.navigate(['/dashbord']);
    if(this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(result=>{
        if(result) {
          
          //alert(result.message);
          this.router.navigate(['/dashbord']);
        } else {
          alert(result);
        }
      });
    }
  }

  // submit(): void {
  //   this.http.post(baseUrl+'login', this.formGroup.getRawValue(), {withCredentials: true})
  //   .subscribe( () => this.router.navigate(['/home']));
  // }
}
