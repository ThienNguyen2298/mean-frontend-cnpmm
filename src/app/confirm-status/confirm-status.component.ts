import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-confirm-status',
  templateUrl: './confirm-status.component.html',
  styleUrls: ['./confirm-status.component.scss']
})
export class ConfirmStatusComponent implements OnInit {
  billId: any;
  bill: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {

    this.billId = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        params.get('billId'))
    );
    this.bill = this.billId.destination.source._value.billId;
    this.orderService.confirmOrder(this.bill);
  }

}