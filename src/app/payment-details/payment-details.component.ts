import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { HttpClient } from '@angular/common/http'
import { PaymentDetail } from '../shared/payment-detail.model';


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  constructor(private service: PaymentDetailService, private http:HttpClient) { }
  
  readonly rootURL = 'http://localhost:62266/api';
  list: PaymentDetail[];
  
  message = "hello from payment details component";


  ngOnInit() {
    console.log("on init message from payment-details component");
  }

  showConsoleMessage(){
    console.log("button click worked");
    var test = this.service.refreshList();
    console.log("this is the object results from payment details component");
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

}
