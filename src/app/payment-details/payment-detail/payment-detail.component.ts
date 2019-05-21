import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {

  constructor(private service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm(); // calling the reset form function 
  }

  // at this point we dont have a value for form, so we have to make it nullable 

  //setting form to default values
  resetForm(form?: NgForm){  //function has the type of form. Form is made nullable (?) to
    if(form != null) // only call the function if there is a value for the form paramater
    form.resetForm();
    this.service.formData = {
      PMId: 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      CVV: ''
    }
  }

  // in the service, we returned an observable from the method 'postPaymentDetail', which we subscribe to  here.
  onSubmit(form: NgForm){  // form.value are the actual values inputted into the form
    if (this.service.formData.PMId == 0)
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }

  insertRecord(form: NgForm){
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Successfully created record');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  updateRecord(form: NgForm){
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Successfully updated record');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
}
