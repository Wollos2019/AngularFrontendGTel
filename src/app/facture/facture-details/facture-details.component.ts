import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeDetaisService } from 'src/app/Commercial/commandes/services/commande-detais.service';
import { Facture, IFacture } from '../ifacture';
import { FactureService } from '../services/facture.service';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrls: ['./facture-details.component.scss']
})
export class FactureDetailsComponent implements OnInit {

  public invoices = [] as any;
  public invoice  = <Facture>{};
  public totals = [] as any;
  public facDet = [] as any;
  public montantT = 0;
  public reducPro = 0;
  public rabaisPro = 0;
  public rabaisT = 0;
  public tva = 0;
  public totalN = 0;
  public products = [] as any;

  constructor(private route: ActivatedRoute, private servFac : FactureService,
    private serviceDet : CommandeDetaisService) { }

  ngOnInit(): void {
    this.getOneInvoice();
  }

  getOneInvoice() {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    // const id: any = this.route.snapshot.paramMap.get('id');
    console.log('id:', id);
    this.servFac.getOneFacture(id)
      .subscribe(response => {
        if (response) {
          this.invoice = response;
          console.log(this.invoice);
          for(var val of this.invoice.commandes_detail){
            this.montantT = this.montantT + val.prix;
            this.rabaisT = (this.montantT*20 / 100);
            this.tva = ((this.montantT-this.rabaisT)*18)/100;
            this.totalN = this.montantT-this.rabaisT+this.tva;
          }
        }
    });
  }



}
