import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData: PaymentDetail
  readonly rootURL = 'http://localhost:62266/api';
  list: PaymentDetail[];
  results: PaymentDetail;
  test: PaymentDetail[];

  constructor(private http:HttpClient) { }

  testMessage = "hi";

  postPaymentDetail(){
   return this.http.post(this.rootURL + '/PaymentDetail', this.formData) //passing the form data in to be send to web api
    // return is used to return this function as an observable that we can subscribe to elsewhere (paymentDetail component)
  }
  putPaymentDetail(){
   return this.http.put(this.rootURL + '/PaymentDetail/' + this.formData.PMId, this.formData) //passing the form data in to be send to web api
    // return is used to return this function as an observable that we can subscribe to elsewhere (paymentDetail component)
  }

  deletePaymentDetail(id){
   return this.http.delete(this.rootURL + '/PaymentDetail/' + id) //passing the form data in to be send to web api
    // return is used to return this function as an observable that we can subscribe to elsewhere (paymentDetail component)
  }

  refreshList(){
    this.http.get(this.rootURL + '/PaymentDetail')
    .toPromise()
    .then( res => this.list = res as PaymentDetail[])
    
    var results = this.list as PaymentDetail[]
    
    console.log("this is the list", results);
    console.log("list length:", this.list.length);
    console.log("stringify:", JSON.stringify(results));
    console.log("card owner name at index 1", results[1].CardOwnerName);

    results.forEach(function(result) {
      var count = 0;
      if (result.CardOwnerName == "Adam Clarke", count++)
          console.log("When name == Adam Clarke", result.CardOwnerName, result.CVV); 
          console.log("this is the count ", count + 1);  
      });
    // console.log(this.results[1].CVV);

    // var test = results.find(x => x.PMId == 1);
    // console.log(test);
  }

  dashBoardCount(){
    this.http.get(this.rootURL + '/PaymentDetail')
    .toPromise()
    .then( res => this.list = res as PaymentDetail[])
  }

}
