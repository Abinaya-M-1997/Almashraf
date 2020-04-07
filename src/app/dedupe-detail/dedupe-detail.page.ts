import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dedupe-detail',
  templateUrl: './dedupe-detail.page.html',
  styleUrls: ['./dedupe-detail.page.scss']
})
export class DedupeDetailPage implements OnInit {
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
      creditbureau: '120',
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
      address: 'No:12, 3rd Avenue, Masco Lao Road, AbuDhabi'
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
    public modalCtrl: ModalController,
    public router: Router,
    public loadingCtrl: LoadingController,
    public camera: Camera,
    public file: File,
    public filePath: FilePath,
    public webView: WebView
  ) { }

  ngOnInit() { }
  closeModal() {
    this.modalCtrl.dismiss();
  }

  dedupeNo() {
    this.loadingfun('Please Wait..').then(_ => {
      this.loading.dismiss();
      this.modalCtrl.dismiss();
      this.router.navigate(['user-details', { usertype: 'A', typetitle: 'New Applicant', skipLocationChange: true }]);
    });
  }

  async loadingfun(msg) {
    this.loading = await this.loadingCtrl.create({
      message: msg,
      duration: 1500
    });
    await this.loading.present();
  }
  onClick() {

  }

  dedupeProceed() {
    this.loadingfun('Please wait... Rendering Details').then(_ => {
      this.loading.dismiss();
      this.modalCtrl.dismiss();
      this.router.navigate([
        'user-details',
        {
          dedupevalue: JSON.stringify(this.ded_value_populated),
          usertype: 'A',
          typetitle: 'Existing Applicant',
          skipLocationChange: true
        }
      ]);
    });
  }
}
