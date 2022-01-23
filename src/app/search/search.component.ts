import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IProduct } from '../product/product';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public product = [] as any;
  public name = new FormControl('');

  constructor(private service : ProductService) { }

  ngOnInit(): void {
    
  }

  getElement () {
    console.log(this.name.value);
    this.service.search(this.name.value)
      .subscribe(response => this.product = response);
      console.log(this.product);
  }

}
