import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commande } from 'src/app/Commercial/commandes/commandes';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.scss']
})
export class ClientHistoryComponent implements OnInit {

  orders : Commande[] = [];
  loading = false;
  paramsPage : any;
  commande = new Commande();

  constructor(private servCli : ClientService, 
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCommande();
  }

  getAllCommande() {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    console.log('id:', id);
    this.servCli.getAllCommande().subscribe({
      next: (response : Commande[]) => {
        this.orders = response;
        console.log(this.orders);
      },
      error: (error : HttpErrorResponse) => {
        console.log('Error', error);
      },
    });
  }

  getPage(data: any): void {
    console.log(data);
    this.getAllCommande();
  }

  comDetails(id: any) {}
}
