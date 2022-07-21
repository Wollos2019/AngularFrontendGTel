import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeDetaisService } from 'src/app/Commercial/commandes/services/commande-detais.service';
import { IFacture } from '../ifacture';
import { FactureService } from '../services/facture.service';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrls: ['./facture-details.component.scss']
})
export class FactureDetailsComponent implements OnInit {

  public invoices = [] as any;
  public invoice  = <IFacture>{};
  public totals = [] as any;
  public facDet = [] as any;
  public montantT = 0;
  public rabais = 0;
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
    this.servFac.list()
      .subscribe(response => {
        if (response) {
          this.invoices = response;

          for (var val of this.invoices) {
            if (val.id == id) {
              this.invoice = val;
              console.log(this.invoice);
            }
          }
        }
    });
  }

}
