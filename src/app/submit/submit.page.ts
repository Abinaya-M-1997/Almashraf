import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, ToastController, IonApp } from '@ionic/angular';
import { SqlliteProvider } from '../services/sqllite/sqllite';
import { ServiceProvider } from '../services/service/service';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnInit {

  ApplicantImg:any;
  ApplicantName:any;
  submitedShow:boolean=false;
  AppReferenceNo:any;
  lnAmountShow:any;
  NTHA:number;
  loan_EMI:number;
  refId:any;
  id:any;
  parameters:any;
  Fullvalue:any;

  constructor(public sqliteProvider: SqlliteProvider,
              public alertCtrl: AlertController,
              public service: ServiceProvider,
              public global: GlobalfunctionsProvider,
              public loadingCtrl: LoadingController,
              public toast: ToastController,
              public file: File,
              public network:Network,
              public document: DocumentViewer,
              public route:ActivatedRoute,
              public router:Router
              )
 { 
  this.route.paramMap.subscribe(data => {
    console.log(data);
    this.parameters=data;
    this.Fullvalue = JSON.parse(this.parameters.get('submitPageValue'));
    console.log(this.Fullvalue, "fullvalue in submit page");

      this.ApplicantImg   = this.Fullvalue[0].imagepath;
      this.ApplicantName  = this.Fullvalue[0].firstName + " " + this.Fullvalue[0].middleName +" " +this.Fullvalue[0].lastName;
      this.lnAmountShow   = this.Fullvalue[0].amount;
      this.NTHA           = 5.02;
      this.loan_EMI       = 50200.00;

    this.refId = this.parameters.params.refId;
    this.id= this.parameters.params.id;
  })
 }

  ngOnInit() {
   
    // setTimeout(()=>{
    //   this.sqlfunction_applicant(this.refId, this.id);
    // },2000);  instead of settimeout we can also use ionviewdidenter
    
  }

  ionViewDidEnter()
  {
    this.valuesOfSubmit(this.Fullvalue[0].refId);
  }

  valuesOfSubmit(refId)
  {
    this.sqliteProvider.getApplicationSubmitStatus(refId).then(data =>
      {
        console.log(data,"from submit page");
        if(!data[0].app_reference_number) 
          {
            this.AppReferenceNo = data[0].app_reference_number;
          }
          
          if(!data[0].app_submit_status )
          {
            this.submitedShow = true;
          }
       })
  }

}
