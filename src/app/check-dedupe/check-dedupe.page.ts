import { DedupeDetailPage } from './../dedupe-detail/dedupe-detail.page';
import { Component, OnInit } from '@angular/core';
import {NavController,NavParams,LoadingController,AlertController,ModalController} from '@ionic/angular';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-dedupe',
  templateUrl: './check-dedupe.page.html',
  styleUrls: ['./check-dedupe.page.scss']
})
export class CheckDedupePage implements OnInit {
  dedupeDetails: FormGroup;
  loading: any;

  ded_value_populated = {
    customerdetails: {
      title: '01',
      firstname: 'Udhaya',
      middlename: 'Suriya',
      lastname: 'Charles',
      gender: 'M',
      dob: '2020-01-12',
      mobileno: '9789874013',
      email: 'suriya@gmail.com',
      companyname: 'SIDCO',
      custcategeory: 'E',
      nationality: 'B',
      STLCustomer: 'Y',
      customertype: 'S',
      bankingwith: '1',
      VIPflag: 'Y',
      incomeassignment: 'A',
      CBRBresult: '4',
      creditbureau: '620',
      accountno: '603000100006474',
      passportno: 'T1001234',
      EIDAno: '111122223333',
      RIMno: '66664',
      POBoxno: '967999',
      employmentcategory: 'G',
      employername: 'Udhaya Suriya',
      dateofjoin: '2020-01-12',
      esob: '456',
      lengthinservice: '46',
      incometype: 'E',
      grossincome: '65000',
      address: 'No:12, 3rd Avenue, Masco Lao Road,AbuDhabi'
    },

    loandetails: {
      product: '90',
      amountreq: '950000',
      interesttype: 'Floating',
      installment: '36',
      moratorium: '68',
      repaymenttype: '1',
      proposaltype: 'F',
      amortizationchart: 'Y',
      modeofrepayment: 'E'
    }
  };

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public global: GlobalfunctionsProvider
  ) {
    this.dedupeDetails = formBuilder.group({
      eidano: ['',Validators.compose([Validators.required,Validators.minLength(12), Validators.maxLength(12), Validators.pattern('[0-9]*')])],
      firstname: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      lastname: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      mobileno: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')])]
    });
  }

  ngOnInit() {}

  openUsePage() {
    //this.navCtrl.push(UserDetailsPage,{usertype: "A",typetitle: "New Applicant"});
    this.router.navigate(['user-details',{ usertype: 'A', typetitle: 'New Applicant', skipLocationChange: true }]);
  }

  async alertfunction(msg) {
    let alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: msg,
      buttons: [
        {
          text: 'YES',
          role: 'destructive',
          handler: () => {
            this.newEIDA();
          }
        },
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await alert.present();
  }

  newEIDA() {
    
    this.router.navigate(['user-details',{ usertype: 'A', typetitle: 'New Applicant', eidaDetails: JSON.stringify(this.dedupeDetails.value), newEidaCheck:'Y', skipLocationChange: true }]);
  }

  async loadingfun(msg) {
    this.loading = await this.loadingCtrl.create({
      message: msg,
      duration: 1000
    });
    await this.loading.present();
  }

  checkDedupe(value) {
    console.log(value);
    if(!value.eidano)
    {
      this.global.showAlert("Alert", "Must Enter EIDA No.");
    }

    else if (value.eidano == '111122223333') {
      this.loadingfun('Checking Details...!').then(async _ => {
        const dedupemodal = await this.modalCtrl.create({
          component: DedupeDetailPage,
          showBackdrop: true,
          backdropDismiss: true
        });
        return await dedupemodal.present();
      });

      //this.router.navigate(['user-details', { dedupevalue:JSON.stringify(this.ded_value_populated),usertype: "A", typetitle: "Existing Applicant", skipLocationChange: true }]);
    } else {
      this.alertfunction('Would you like to create applicant for this EIDA?');
    }
  }
  fetchEIDA(value) {
    console.log(value, " from fetchEida");
    if(!value.eidano)
    {
      this.global.showAlert("Alert", "Must Enter EIDA No.");
    }
    else if(value.eidano ==="111122223333")
    {
    this.global.globalLodingPresent('Please Wait... Rendering Details').then(_ => {
        this.global.globalLodingDismiss();
        
        this.router.navigate(['/user-details',{ usertype: 'A', typetitle: 'New Applicant', eida: 'Y' }]);
      });
    }

    else
    {
      this.global.showAlert("Alert", "No Service for this EIDA Value");
    }
  }
}
