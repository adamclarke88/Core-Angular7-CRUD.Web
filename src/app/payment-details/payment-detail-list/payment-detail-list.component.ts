import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})
export class PaymentDetailListComponent implements OnInit {

  constructor(private service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();

  }

  populateForm(pd: PaymentDetail){ // we need to make a copy of the object, then assign it to pd
    this.service.formData = Object.assign({}, pd); // empty object {} can be used as the target is on th left side of the assignment (formData)
  console.log("pd", pd);
  console.log("formdata", this.service.formData);
  }

  onDelete(PMId){
    if(confirm('Are you sure you want to delete this record?')){
    this.service.deletePaymentDetail(PMId)
    .subscribe(res => {
      this.service.refreshList();
      this.toastr.warning('Deleted successfully');
    },
      err => {
        console.log(err);
      })
  }
}



}
