import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
@Input() title="Are you sure?";
@Input() btnCancel="Annuler";
@Input() message="Do you really want to delete these records? This process cannot be undone.";
@Input() btnConfirm="Confirmer"; 
@Output() actionConfirm = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnInit(): void {
  }

  actionC():void{
    this.actionConfirm.emit(true);
  }
}
