import { async } from '@angular/core/testing';
import { Component, OnInit, NgZone, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { AlertController, IonicModule, NavController, IonSlides, LoadingController, ActionSheetController, ModalController, Platform, IonContent } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SqlliteProvider } from '../services/sqllite/sqllite';
import { ServiceProvider } from '../services/service/service';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { OcrAPIService } from '../services/ocrApi/ocr-api.service';
import { Device } from '@ionic-native/device/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Network } from '@ionic-native/network/ngx';

import { IonApp } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';

import { PanModalPage } from '../pan-modal/pan-modal.page';
import { AadharModalPage } from '../aadhar-modal/aadhar-modal.page';
import { ProofModalPage } from '../proof-modal/proof-modal.page';
import { EmiModalPage } from '../emi-modal/emi-modal.page';
import { DoclistPage } from '../doclist/doclist.page';
import { StatemodelsPage } from '../statemodels/statemodels.page';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
//import { resolve } from 'dns';
import { ShowImagePage } from '../show-image/show-image.page';
import { ModelDocImagePage } from '../model-doc-image/model-doc-image.page';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss']
})
export class UserDetailsPage implements OnInit {
  @HostListener('sumbitFromView') onload() {
    console.log('evnt');
  }
  side_menu: true;

  PCityData: any[];
  gudisableScope: string = 'false';
  Base64Img: any;

  hide: boolean = true;

  type_income: any;

  boolean_income: boolean = false;
  boolean_expense: boolean = false;
  ocr: boolean = false;
  kycImgdata: any;

  loanPurpose: any[];
  ProofModel: FormGroup;
  GlobalMclrList: any;
  showMclr: boolean;
  refvalue: any;
  AppReferenceNo: any;
  stacheck: boolean = false;

  @ViewChild('mySlider', { static: true }) slider: IonSlides;
  @ViewChild(IonContent, { static: true }) content: IonContent;

  selectedSegment: string;
  slides: any;
  photos: any;
  public slisho = false;
  public sigshow = false;
  users = [];

  viewdata: boolean = true;

  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  };

  edit_emi: boolean = true;

  personalDetails: FormGroup;
  loanDetails: FormGroup;
  kyc: FormGroup;
  addProof: FormGroup;
  income: FormGroup;
  expences: FormGroup;
  otherdoc: FormGroup;
  eligibilityform: FormGroup;
  userdetail: string = 'userdetail';
  UserData: any = {};
  profImg: boolean = false;
  docImg: boolean = false;
  public base64Image: string;
  public docImage: string;
  public usertype: any;
  public dummyusertype: any;
  public doctype = 'kyc';
  public crefId: any;
  public id: any;
  public loanid: any;
  public kycid: any;
  public incomeid: any;
  public expenceid: any;
  public panId: any;
  public adstate: any;
  public adcity: any;
  public adpincode: any;
  public adaddress: any;
  public adaddress2: any;
  public panImageName: any;
  public extotal: number;
  public emitotal: number;
  public newExpenseTotal: number = 0;
  public typetitle: any;
  public parameters: any;
  public docdescription: any = {};
  public addressswitch = 'caddress';
  productInfo = [
    { productName: 'Home Loan' },
    { productName: 'Vehicle Loan' },
    { productName: 'Education Loan' },
    { productName: 'Personal Loan' }
  ];

  genderInfo = [
    { genderName: 'Male' },
    { genderName: 'Female' },
    { genderName: 'Others' }
  ];

  otherdocinfo = [{ otherdocname: 'Other' }, { otherdocname: 'Field-Visit' }];

  idProof = [
    { proofName: 'Voter ID', value: 'Voter ID', code: "I_VOTER" },
    { proofName: 'Pan Card', value: 'Pan Card', code: 'I_PAN' },
    { proofName: 'Driving Licence', value: 'Driving Licence', code: "I_DL" },
    // { proofName: 'Ration Card', value: 'Ration Card',code:"I_RATION" },
    { proofName: 'Aadhar Card', value: 'Aadhar Card', code: "I_AA" }
  ];
  custCategory = [
    { Name: 'EXPATRIATE', value: 'E' },
    { Name: 'LOCAL', value: 'L' }
  ];

  nationality = [
    { Name: 'ABUDHABI', value: '1' },
    { Name: 'INDIA', value: 'IND' },
    { Name: 'AFGHANISTAN', value: 'A' },
    { Name: 'ALBANIA', value: 'B' },
    { Name: 'AUSTRALIA', value: 'C' },
    { Name: 'FRANCE', value: 'D' },
    { Name: 'GREECE', value: 'E' }
  ];

  stlCustomer = [
    { Name: 'No', value: 'N' },
    { Name: 'Yes', value: 'Y' }
  ];

  bankingWith = [
    { Name: 'Al Masraf', value: '1' },
    { Name: 'Others', value: '2' }
  ];
  VIPflag = [
    { Name: 'No', value: 'N' },
    { Name: 'Yes', value: 'Y' }
  ];

  incomeAssign = [
    { Name: 'Al Masraf', value: 'A' },
    { Name: 'Others', value: 'O' }
  ];

  CBRBdata = [
    { Name: 'DELETED', value: '1' },
    { Name: 'DOUBTFUL', value: '2' },
    { Name: 'LOSS', value: '3' },
    { Name: 'NORMAL', value: '4' },
    { Name: 'REPORTED', value: '5' },
    { Name: 'O.L.E.M', value: '6' },
    { Name: 'SUBSTANDARD', value: '7' }
  ];

  Customertype = [
    { Name: 'SAL + PENSION', value: 'P' },
    { Name: 'SALARIED', value: 'S' },
    { Name: 'SELF EMPLOYED/ BUSINESS', value: 'B' },
    { Name: 'UNEMPLOYED', value: 'U' }
  ];

  Repaymentmode = [
    { Desc: 'Cash', llvOptionVal: 'P' },
    { Desc: 'EMI', llvOptionVal: 'E' },
    { Desc: 'Others', llvOptionVal: 'D' }
  ];

  ProductType = [{ Desc: '90', code: '1' }];

  Repaymenttype = [
    { Desc: 'Weekly', llvOptionVal: '1' },
    { Desc: 'Monthly', llvOptionVal: '2' },
    { Desc: 'Yearly', llvOptionVal: '12' }
  ];

  Proposal = [
    { Desc: 'Business', llvOptionVal: 'B' },
    { Desc: 'Finance', llvOptionVal: 'F' },
    { Desc: 'Government', llvOptionVal: 'G' },
    { Desc: 'Regional', llvOptionVal: 'R' },
    { Desc: 'Terms of Service', llvOptionVal: 'T' }
  ];

  Amortization = [
    { Desc: 'Yes', llvOptionVal: 'Y' },
    { Desc: 'No', llvOptionVal: 'N' }
  ];

  // EligibleParameter = [
  //   {Name:"Customer Age", }

  // ]

  GlobalTitleList = [
    { llvOptionDesc: 'MR', llvOptionVal: '01' },
    { llvOptionDesc: 'MRS', llvOptionVal: '02' },
    { llvOptionDesc: 'M/S', llvOptionVal: '03' }
  ];

  GlobalProductList = [{ lpdPrdDesc: 'Personal Loan', lpdProdNewId: '90' }];

  GlobalIncomeList = [
    { llvOptionDesc: 'Agriculture', llvOptionVal: '1' },
    { llvOptionDesc: 'Business', llvOptionVal: '2' },
    { llvOptionDesc: 'Rent', llvOptionVal: '3' },
    { llvOptionDesc: 'Others', llvOptionVal: '4' }
  ];

  GlobalInterestType = [
    { llvOptionDesc: 'Fixed', llvOptionVal: 'Fixed' },
    { llvOptionDesc: 'Floating', llvOptionVal: 'Floating' }
  ];

  GlobalEmploymentList = [
    { llvOptionDesc: 'Government', llvOptionVal: 'G' },
    { llvOptionDesc: 'Private', llvOptionVal: 'P' },
    { llvOptionDesc: 'Self-employed', llvOptionVal: 'S' }
  ];

  GlobalRelationShip = [
    { llvOptionDesc: 'Mother', llvOptionVal: 'M' },
    { llvOptionDesc: 'Father', llvOptionVal: 'F' },
    { llvOptionDesc: 'Son', llvOptionVal: 'S' }
  ];

  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    targetWidth: 500,
    targetHeight: 500,
    allowEdit: true
  };

  AddressIdInfo: any = {};
  public deviceid = 'KUMARH776T';
  public userid: any;
  public dummyvalue = 'no';
  public refId: any;
  public lrefId: any;
  public krefId: any;
  public irefId: any;
  public erefId: any;
  public orefId: any;
  public refinfo: any;
  public fgf = '04/05/2018';
  personalData: any;
  panData: any;
  panImgData: any;
  loanData: any;
  kycData: any;
  incomeData: any;
  expenceData: any;
  otherData: any;
  otherincomeData: any;
  obligationData: any;
  otherexpenceData: any;
  lat: any;
  lng: any;

  locationData: any;
  checkshow: boolean = false;
  incomeshow: boolean = false;
  incomeyesno: any;
  otherincomearray: any;
  otherexpencearray: any;
  otheremiarray: any;
  obligatinsarray: any;
  userinfo: any;
  genderSelect: any;
  status: any;

  /* Nidheesh */
  GlobalStateList: any;
  // GlobalTitleList: any;
  // GlobalProductList: any;
  // GlobalInterestType: any;
  // GlobalRelationShip: any;
  //GlobalIncomeList: any;
  GlobalDocumentList: any;
  // GlobalEmploymentList: any;
  _SelectedProduct: any;
  _SelPrdInterestRate: any;
  _ProductList: any = {};
  CityData: any;

  InterestFrom: any;
  InterestTo: any;
  TenorFrom: any;
  TenorTo: any;
  TenorFlag: boolean = false;
  ProperAmount: boolean = true;
  lnErrorMsg: any;
  MorotoriamMax: any;
  MorotoriamFlag: boolean = false;
  disableScope: any;

  public personaltik: boolean = false;
  public loantik: boolean = false;
  public incometik: boolean = false;
  public expencetik: boolean = false;
  public kyctik: boolean = false;
  public otherdoctik: boolean = false;
  public eligibilitytik: boolean = false;
  public ionCheck: boolean = false;
  public perDisable: any;
  public addressData: any = {};
  public google_city_name: any;
  public loading: any;

  checkdedupe: any;

  finalSubmitData = {
    customerdetails: [],
    loandetails: {
      product: '',
      amountreq: '',
      interesttype: '',
      installment: '',
      moratorium: '',
      repaymenttype: '',
      proposaltype: '',
      amortizationchart: '',
      modeofrepayment: ''
    }
  };

  finalSubmitCustomerDetail = {
    apptype: '',
    customerid: '',
    title: '',
    firstname: '',
    middlename: '',
    lastname: '',
    gender: '',
    dob: '',
    mobileno: '',
    email: '',
    companyname: '',
    custcategeory: '',
    nationality: '',
    STLCustomer: '',
    customertype: '',
    bankingwith: '',
    VIPflag: '',
    incomeassignment: '',
    CBRBresult: '',
    creditbureau: '',
    accountno: '',
    passportno: '',
    EIDAno: '',
    RIMno: '',
    POBoxno: '',
    employmentcategory: '',
    employername: '',
    dateofjoin: '',
    esob: '',
    lengthinservice: '',
    incometype: '',
    netincome: '',
    address: '',
    udf1: '',
    udf2: '',
    udf3: '',
    udf4: ''
  };

  eidaPopulate: any;
  finalObject = {};
  eidaPopulate_usertype: any;
  eidaPopulate_title: any;
  eidaSearchInput: any;
  newEidaCheck: any;

  constructor(
    private camera: Camera,
    public ionicApp: IonicModule,
    public zone: NgZone,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public sqliteProvider: SqlliteProvider,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public actionsheetCtrl: ActionSheetController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public router: Router,
    public global: GlobalfunctionsProvider,
    public device: Device,
    public service: ServiceProvider,
    public route: ActivatedRoute,
    public network: Network,
    public file: File,
    public webview: WebView,
    // public events: Events,
    public ocrApi: OcrAPIService
  ) {
  /*  this.events.subscribe('pageEvent', data => {

      console.log(data.refId, data.id);

      this.finalsubmit(data.refId, data.id);

    });*/

    this.addressswitch === 'caddress';
    this.status = 'No';
    this.genderSelect = 'M';
    this.statusChng();

    this.route.paramMap.subscribe(data => {
      console.log(data);
      this.parameters = data;
      this.refvalue = JSON.parse(this.parameters.get('refvalue'));
      this.checkdedupe = JSON.parse(this.parameters.get('dedupevalue'));
      this.eidaPopulate = this.parameters.get('eida');
      this.eidaPopulate_usertype = this.parameters.get('usertype');
      this.eidaSearchInput = JSON.parse(this.parameters.get('eidaDetails'));
      this.newEidaCheck = this.parameters.get('newEidaCheck');


      if (this.newEidaCheck == "Y") {
        this.personalDetails.get('eidaNo').setValue(this.eidaSearchInput.eidano);
        this.personalDetails.get("firstName").setValue(this.eidaSearchInput.firstname);
        this.personalDetails.get('lastName').setValue(this.eidaSearchInput.lastname);
        this.personalDetails.get('phone').setValue(this.eidaSearchInput.mobileno);

      }

      if (this.eidaPopulate == 'Y') {
        this.usertype = this.eidaPopulate_usertype;
        this.personalDetails.get('title').setValue(this.service.eida_value_populated.title);
        this.personalDetails.get('firstName').setValue(this.service.eida_value_populated.firstname);
        this.personalDetails.get('middleName').setValue(this.service.eida_value_populated.middlename);
        this.personalDetails.get('lastName').setValue(this.service.eida_value_populated.lastname);
        this.genderSelect = this.service.eida_value_populated.gender;
        this.personalDetails.get('dob').setValue(this.service.eida_value_populated.dob);
        this.personalDetails.get('phone').setValue(this.service.eida_value_populated.mobileno);
        this.personalDetails.get('email').setValue(this.service.eida_value_populated.email);
        this.personalDetails.get('company').setValue(this.service.eida_value_populated.companyname);
        this.personalDetails.get('custNationality').setValue(this.service.eida_value_populated.nationality);
        this.personalDetails.get('eidaNo').setValue(this.service.eida_value_populated.EIDAno);
        this.personalDetails.get('poBoxNo').setValue(this.service.eida_value_populated.POBoxno);
        this.personalDetails.get('address').setValue(this.service.eida_value_populated.address);
        this.personalDetails.get('permaddress1').setValue(this.service.eida_value_populated.permaddress1);
      }
      console.log(this.checkdedupe, 'value checking dedupe');

      if (this.checkdedupe) {
        this.personalDetails.get('title').setValue(this.checkdedupe.customerdetails.title);
        this.personalDetails.get('firstName').setValue(this.checkdedupe.customerdetails.firstname);
        this.personalDetails.get('lastName').setValue(this.checkdedupe.customerdetails.lastname);
        this.genderSelect = this.checkdedupe.customerdetails.gender;
        this.personalDetails.get('dob').setValue(this.checkdedupe.customerdetails.dob);
        this.personalDetails.get('phone').setValue(this.checkdedupe.customerdetails.mobileno);
        this.personalDetails.get('email').setValue(this.checkdedupe.customerdetails.email);
        this.personalDetails.get('middleName').setValue(this.checkdedupe.customerdetails.middlename);
        this.personalDetails.get('company').setValue(this.checkdedupe.customerdetails.companyname);
        this.personalDetails.get('customerCategory').setValue(this.checkdedupe.customerdetails.custcategeory);
        this.personalDetails.get('custNationality').setValue(this.checkdedupe.customerdetails.nationality);
        this.personalDetails.get('stlCustomer').setValue(this.checkdedupe.customerdetails.STLCustomer);
        this.personalDetails.get('custType').setValue(this.checkdedupe.customerdetails.customertype);
        this.personalDetails.get('bankingWith').setValue(this.checkdedupe.customerdetails.bankingwith);
        this.personalDetails.get('vipFlag').setValue(this.checkdedupe.customerdetails.VIPflag);
        this.personalDetails.get('incomeAssign').setValue(this.checkdedupe.customerdetails.incomeassignment);
        this.personalDetails.get('cbrbResult').setValue(this.checkdedupe.customerdetails.CBRBresult);
        this.personalDetails.get('alEthiadBureau').setValue(this.checkdedupe.customerdetails.creditbureau);
        this.personalDetails.get('accNo').setValue(this.checkdedupe.customerdetails.accountno);
        this.personalDetails.get('passportNo').setValue(this.checkdedupe.customerdetails.passportno);
        this.personalDetails.get('eidaNo').setValue(this.checkdedupe.customerdetails.EIDAno);
        this.personalDetails.get('rimNo').setValue(this.checkdedupe.customerdetails.RIMno);
        this.personalDetails.get('poBoxNo').setValue(this.checkdedupe.customerdetails.POBoxno);
        this.income.get('category').setValue(this.checkdedupe.customerdetails.employmentcategory);
        this.income.get('empName').setValue(this.checkdedupe.customerdetails.employername);
        this.income.get('doj').setValue(this.checkdedupe.customerdetails.dateofjoin);
        this.income.get('eosb').setValue(this.checkdedupe.customerdetails.esob);
        this.income.get('lengthService').setValue(this.checkdedupe.customerdetails.lengthinservice);
        this.income.get('incometype').setValue(this.checkdedupe.customerdetails.incometype);
        this.income.get('grossincome').setValue(this.checkdedupe.customerdetails.grossincome);
        this.personalDetails.get('address').setValue(this.checkdedupe.customerdetails.address);
        this.loanDetails.get('product').setValue(this.checkdedupe.loandetails.product);
        this.loanDetails.get('amount').setValue(this.checkdedupe.loandetails.amountreq);
        this.loanDetails.get('interesttype').setValue(this.checkdedupe.loandetails.interesttype);
        this.loanDetails.get('tenure').setValue(this.checkdedupe.loandetails.installment);
        this.loanDetails.get('moratorium').setValue(this.checkdedupe.loandetails.moratorium);
        this.loanDetails.get('repaymentType').setValue(this.checkdedupe.loandetails.repaymenttype);
        this.loanDetails.get('proposalType').setValue(this.checkdedupe.loandetails.proposaltype);
        this.loanDetails.get('amortization').setValue(this.checkdedupe.loandetails.amortizationchart);
        this.loanDetails.get('repaymentMode').setValue(this.checkdedupe.loandetails.modeofrepayment);
      }

      if (this.refvalue) {
        this.refId = this.refvalue.refId;
        this.id = this.refvalue.id;
      }

      console.log('TCL: UserDetailsPage -> this.refvalue', this.refvalue);

      this.usertype = this.parameters.get('usertype');
      console.log('TCL: UserDetailsPage -> this.usertype', this.usertype);
      this.userinfo = this.parameters.get('userval');
      console.log('TCL: UserDetailsPage -> this.userinfo', this.userinfo);
      this.typetitle = this.parameters.get('typetitle');
      console.log('TCL: UserDetailsPage -> this.typetitle', this.typetitle);

      if (this.refId) {
        if (this.usertype != 'C' && this.usertype != 'G') {
          this.typetitle = 'Applicant';
          console.log(this.typetitle);
        }
      }

      if (this.usertype == 'C' || this.usertype == 'G') {
        this.crefId = this.parameters.get('crefId');
      } else {
        if (this.refvalue) {
          this.refId = this.refvalue.refId;
          this.id = this.refvalue.id;
        }
      }

      if (this.refvalue) {
        this.refinfo = this.refvalue;
        this.refId = this.refinfo.refId;
        this.lrefId = this.refinfo.refId;
        this.krefId = this.refinfo.refId;
        this.irefId = this.refinfo.refId;
        this.erefId = this.refinfo.refId;
        this.id = this.refinfo.id;
        this.loanid = this.refinfo.id;
        this.incomeid = this.refinfo.id;
        this.expenceid = this.refinfo.id;
        this.kycid = '';
        this.panId = '';
        this.orefId = '';
      } else {
        this.refId = '';
        this.lrefId = '';
        this.krefId = '';
        this.irefId = '';
        this.erefId = '';
        this.orefId = '';
        this.id = '';
        this.loanid = '';
        this.kycid = '';
        this.panId = '';
        this.incomeid = '';
        this.expenceid = '';
      }


    });

    if (this.usertype) {
      if (this.usertype == 'G') {
        this.gudisableScope = 'true';
      }
      this.dummyusertype = this.parameters.get('usertype');
    } else {
      this.usertype = '';
    }

    let activePortal;
    /*   this.platform.backButton.subscribe(() => {
   
      activePortal = this.ionicApp._loadingPortal.getActive() || this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();
      if (activePortal) { activePortal.dismiss(); } else {
        this.navCtrl.pop();
      }

    },1000); */

    if (this.global.getApplicationSubStatus() == 'Y') {
      this.disableScope = 'true';
      this.zone.run(() => {
        this.perDisable = 'true';
      });
    } else {
      this.disableScope = 'false';
    }


    let relation_flg;
    if (this.usertype === 'A') {
      relation_flg = ['M', Validators.compose([Validators.required])];
    } else {
      relation_flg = [''];
    }

    this.personalDetails = formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      email: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(50), Validators.pattern('^[A-Z0-9a-z\\._%+-]+@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$'), Validators.required])],
      middleName: ['', Validators.compose([Validators.pattern('[a-zA-Z]*')])],
      address: ['', Validators.compose([Validators.maxLength(80), Validators.required])],
      address2: ['', Validators.compose([Validators.maxLength(40)])],
      district: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')])],
      permaddress1: ['', Validators.compose([Validators.maxLength(80), Validators.required])],
      permaddress2: ['', Validators.compose([Validators.maxLength(40)])],
      permdistrict: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*')])],
      permpincode: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')])],
      relationship: relation_flg,
      //relationship: ['M', Validators.compose([Validators.required])],
      company: ['', Validators.compose([Validators.pattern('[0-9a-zA-Z ]*'), Validators.required])],
      pincode: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')])],
      customerCategory: ['', Validators.compose([Validators.required])],
      custNationality: ['', Validators.compose([Validators.required])],
      stlCustomer: ['', Validators.compose([Validators.required])],
      custType: ['', Validators.compose([Validators.required])],
      bankingWith: ['', Validators.compose([Validators.required])],
      vipFlag: ['', Validators.compose([Validators.required])],
      incomeAssign: ['', Validators.compose([Validators.required])],
      cbrbResult: ['', Validators.compose([Validators.required])],
      alEthiadBureau: ['', Validators.compose([Validators.required])],
      accNo: ['', Validators.compose([Validators.required])],
      passportNo: ['', Validators.compose([Validators.required])],
      eidaNo: ['', Validators.compose([Validators.required])],
      rimNo: ['', Validators.compose([Validators.required])],
      poBoxNo: ['', Validators.compose([Validators.required])]
    });

    this.loanDetails = formBuilder.group({
      product: ['', Validators.compose([Validators.required])],
      interesttype: ['', Validators.compose([Validators.required])],
      producttype: ['1', Validators.compose([Validators.required])],
      loan_amount_range: ['', Validators.compose([Validators.min(250000), Validators.max(25000000)])],
      amount: ['', Validators.compose([Validators.required, Validators.min(1000), Validators.pattern('[0-9]*')])],
      tenure: ['', Validators.compose([Validators.maxLength(3), Validators.minLength(1), Validators.pattern('[0-9]*'), Validators.required])],
      moratorium: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.required])],
      // rio: ['', Validators.compose([Validators.required])],
      // cost: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      // priority: ['', Validators.compose([Validators.required])],
      mclr: '',
      loanpurpose: '',
      repaymentMode: ['', Validators.compose([Validators.required])],
      repaymentType: ['', Validators.compose([Validators.required])],
      proposalType: ['', Validators.compose([Validators.required])],
      amortization: ['', Validators.compose([Validators.required])]
    });

    this.kyc = formBuilder.group({
      pancard: ['', Validators.compose([Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}'), Validators.required])],
      aadhaar: ['', Validators.compose([Validators.maxLength(12), Validators.minLength(12), Validators.pattern('[0-9]*'), Validators.required])]
    });

    this.addProof = formBuilder.group({
      kycDesc: ['Driving Licence', Validators.compose([Validators.required])],
      kycNum: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(20), Validators.required])]
    });
    this.ProofModel = formBuilder.group({
      proof: ['', Validators.compose([Validators.required])],
      kycNum: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(20), Validators.required])]
    });

    this.income = formBuilder.group({
      category: ['', Validators.compose([Validators.required])],
      incometype: ['E', Validators.compose([Validators.required])],
      grossincome: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(13), Validators.pattern('[0-9]*'), Validators.required])],
      statutory: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      other: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      netincome: ['', Validators.compose([Validators.required])],
      empName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      doj: ['', Validators.compose([Validators.required])],
      eosb: ['', Validators.compose([Validators.required])],
      lengthService: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      otherincomes: this.formBuilder.array([
        //this.initIncomeFields()
      ])
    });

    this.expences = formBuilder.group({
      obligatins: this.formBuilder.array([this.initObligationFields()])
    });

    this.otherdoc = formBuilder.group({
      otherdes: ['', Validators.compose([Validators.required, Validators.pattern('[0-9a-zA-Z ]*')])]
    });
  }
  onEvent() {
    console.log('Called from view page event');
  }

  getProofDetail(kycuser) {
    this.addProof = this.formBuilder.group({
      kycDesc: [kycuser.kycDesc, Validators.compose([Validators.required])],
      kycNum: [kycuser.kycNum, Validators.compose([Validators.minLength(1), Validators.maxLength(20), Validators.required])],
      doctype: kycuser.doctype
    });

    this.kycid = kycuser.kycid;
  }

  genderChng() {
    if (this.genderSelect === 'Male') {
      this.genderSelect = 'M';
      // console.log(this.global.getGenderList())
    } else if (this.genderSelect === 'F') {
      this.genderSelect = 'F';
    } else if (this.genderSelect === 'N') {
      this.genderSelect = 'N';
    }
  }

  slectGender() {
    let Title = this.personalDetails.controls.title.value;
    console.log(this.personalDetails.controls);
    if (Title == '01') {
      this.genderSelect = 'M';
    } else if (Title == '02' || Title == '03' || Title == '04') {
      this.genderSelect = 'F';
    }
  }

  /*  getcity(value,city_type) {
      
     //this.global.globalLodingPresent('Please wait...');
     this.sqliteProvider.getCityDetails(value).then(cityvalue => {
 
      if(cityvalue.length>0){
       if(city_type=='c_city'){
         this.CityData = [];
     
         this.CityData = cityvalue;
       }
       if(city_type=='p_city'){
          this.PCityData=[];
         this.PCityData=cityvalue
       }
      }
       
       
       if (cityvalue.length > 0) {
         console.log(this.addressData)
         this.global.globalLodingDismiss();
       }
      
 
 
      if (cityvalue.length==0) {
         this.global.globalLodingPresent('Please wait...');
 
     let data = {
       "username"    : this.sqliteProvider.getName(),
       "stateid"     : value
     }
 
         this.service.soapApiCall("LOSbosmplpWebServices","getCityMasterData", data).subscribe((result) => {
           
           if (!this.isEmpty(result)) {
            if ((<any>result).success['#text'] === "true") {
               if((<any>result).citylist!=undefined){
 
               this.sqliteProvider.deleteCityEntrybyId(value);
               if((<any>result).citylist.length==undefined){
                 this.sqliteProvider.InserCityValue((<any>result).citylist.sgmStateCode['#text'],
                                                 (<any>result).citylist.sgmCityCode['#text'],
                                               (<any>result).citylist.sgmCityName['#text']);
                 this.getcity(value,city_type);
               }else{
                    for (var i = 0; i < (<any>result).citylist.length; i++) {
                 this.sqliteProvider.InserCityValue((<any>result).citylist[i].sgmStateCode['#text'],
                                                 (<any>result).citylist[i].sgmCityCode['#text'],
                                               (<any>result).citylist[i].sgmCityName['#text']);
                 if (i == (<any>result).citylist.length - 1) {
                  
                   this.getcity(value,city_type);
                 }
 
               }
               }
            }else{
               
              this.global.globalLodingDismiss();
            }
             } else {
               this.global.globalLodingDismiss();
               this.global.globalAlert("Alert", `Request could not be processed due to a server error. The request may succeed if you try again.`);
 
             }
 
 
           }
           console.log(result);
          
 
         }, (err) => {
           this.global.globalLodingDismiss();
           this.global.globalAlert("Alert", `Request could not be processed due to a server error. The request may succeed if you try again.`);
           console.log(err);
         });
       } 
 
     }).catch(error => {
       //console.log(error);
       this.global.globalLodingDismiss();
     })
   } */

  addressSwitch(value) {
    this.addressswitch = value;

    if (this.addressswitch === 'caddress') {
      this.addressswitch = 'caddress';
    } else if (this.addressswitch === 'paddress') {
      this.addressswitch = 'paddress';
      if (this.ionCheck == true) {
        if (
          this.personalDetails.value.address != undefined &&
          this.personalDetails.value.address != '' &&
          this.addressData.state != undefined &&
          this.addressData.state != '' &&
          this.addressData.city != undefined &&
          this.addressData.city != '' &&
          this.personalDetails.value.pincode != undefined &&
          this.personalDetails.value.pincode != '' &&
          this.personalDetails.value.district != undefined &&
          this.personalDetails.value.district != ''
        ) {
          this.perDisable = 'true';
          this.personalDetails
            .get('permaddress1')
            .setValue(this.personalDetails.value.address);
          this.personalDetails
            .get('permaddress2')
            .setValue(this.personalDetails.value.address2);
          this.personalDetails
            .get('permstate')
            .setValue(this.addressData.perstate);
          this.personalDetails
            .get('permcity')
            .setValue(this.addressData.percity);
          this.personalDetails
            .get('permpincode')
            .setValue(this.personalDetails.value.pincode);
          this.personalDetails
            .get('permdistrict')
            .setValue(this.personalDetails.value.district);
        } else {
          this.ionCheck = false;
          if (this.global.getApplicationSubStatus() == 'Y') {
            this.perDisable = 'true';
          } else {
            this.perDisable = 'false';
          }

          this.personalDetails.get('permaddress1').setValue('');
          this.personalDetails.get('permaddress2').setValue('');
          this.addressData.perstate = '';
          this.addressData.percity = '';
          this.personalDetails.get('permpincode').setValue('');
          this.personalDetails.get('permdistrict').setValue('');
        }
      } else {
        if (this.global.getApplicationSubStatus() == 'Y') {
          this.perDisable = 'true';
        }
      }
    }
  }

  ngOnInit() {
    //this.events.subscribe('FinalSubmit',i=>{console.log(i,'sjhfjfhsfihsufhsu')});
    this.leftMenu();
    this.type_income = 'income';
    this.onChangeType();
    this.incomeshow = true;

    this.userdetail = 'userinfo';
    this.slides = [
      {
        id: 'userinfo'
      },
      {
        id: 'kyc'
      },
      {
        id: 'expences'
      },
      {
        id: 'income'
      },
      {
        id: 'eligibility'
      } /* ,
      {
        id: "360",
      } */
    ];

    if (this.usertype == 'A') {
      this.checkshow = false;
      this.incomeshow = true;
      this.slisho = true;
      this.sigshow = true;
      this.slides = [
        {
          id: 'userinfo'
        },
        {
          id: 'loan'
        },
        {
          id: 'kyc'
        },
        {
          id: 'expences'
        },
        {
          id: 'income'
        },
        {
          id: 'eligibility'
        } /* ,
        {
          id: "360",
        } */
      ];
    } else {
    }
    if (this.usertype == 'C' || this.usertype == 'G') {
      this.checkshow = true;
      this.incomeshow = false;
    } else {
    }


  }

  currentSlide = 0;

  onSegmentChanged(segmentButton) {
    const selectedIndex = this.slides.findIndex(slide => {
      return slide.id === segmentButton.detail.value;
    });
    this.slider.slideTo(selectedIndex);
    console.log(selectedIndex, segmentButton.detail.value);
  }

  async onSlideChanged(slider) {
    console.log('sli', slider);
    //const currentSlide = await this.slides[slider.getActiveIndex()];
    this.currentSlide = await this.slider.getActiveIndex();
    const currentSlide = await this.slides[this.currentSlide];
    console.log(currentSlide, 'slide num');
    this.userdetail = currentSlide.id;
    if (this.currentSlide == 2) {
      this.pushToArray();
      this.obligatinsArray();
      this.otherexpenceArray();
    }
    this.scrollToTop();
  }

  pushToArray() {
    // if (this.otherincomeData != undefined) {

    this.sqliteProvider
      .getotherincomeDetails(this.refId, this.incomeid)
      .then(otherincomegetdata => {
        this.otherincomeData = otherincomegetdata;
        //console.log("other income==>", this.otherincomeData);
      })
      .then(() => {
        if (this.otherincomeData.length) {
          const control = <FormArray>this.income.controls.otherincomes;
          control.controls = [];
          for (let i = 0; i < this.otherincomeData.length; i++) {
            const repocontributors = this.income.get('otherincomes');
            // console.log(this.otherincomeData.length);
            (repocontributors as FormArray).push(
              this.formBuilder.group({
                otherincomeid: this.otherincomeData[i].otherincomeid,
                iname: [
                  this.otherincomeData[i].otherincome,
                  Validators.compose([
                    Validators.minLength(1),
                    Validators.maxLength(30),
                    Validators.required
                  ])
                ],
                iotamount: [
                  this.otherincomeData[i].amount,
                  Validators.compose([
                    Validators.minLength(1),
                    Validators.maxLength(13),
                    Validators.pattern('[0-9]*'),
                    Validators.required
                  ])
                ]
              })
            );
          }
        }
      })
      .catch(Error => {
        console.log(Error);
      });
  }

  getToday(): string {
    // var yesterday = new Date(Date.now() - 567648e6);
    // console.log(yesterday.toISOString().split('T')[0]);
    // return yesterday.toISOString().split('T')[0]

    var yesterday = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0];
    return yesterday;
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  ionViewDidEnter() {
    if (this.refId !== '') {
      this.getpersonalDetail();
      this.getloanDetail();
      this.getkycDetail();
      this.getPANDetail();
      this.getOtherDetail();
      this.getIncomeDetail();
      this.getExpenceDetail();
      this.getIncomeExpenseforCoGuApp();
    }

    this.GlobalStateList = this.global.getFullStateMaster();
    //this.GlobalTitleList = this.global.getTitleList();
    //this.GlobalProductList = this.global.getFullProductList();
    // this.GlobalInterestType = this.global.getInterestRateType();
    // this.GlobalRelationShip = this.global.getRelationShipList();
    // this.GlobalIncomeList = this.global.getIncomeTypeList();
    // this.GlobalDocumentList = this.global.getDocumentList();
    // this.GlobalEmploymentList = this.global.getEmployementList();
    // this.GlobalMclrList = this.global.getMclrList();
  }

  getCheckedStatus() {
    if (this.ionCheck == true) {
      if (
        this.personalDetails.value.address != undefined &&
        this.personalDetails.value.address != ''
      ) {
        this.perDisable = 'true';
        this.personalDetails
          .get('permaddress1')
          .setValue(this.personalDetails.value.address);
        this.personalDetails
          .get('permaddress2')
          .setValue(this.personalDetails.value.address2);
        this.addressData.perstate = this.addressData.state;
        this.addressData.percity = this.addressData.city;
        this.personalDetails
          .get('permpincode')
          .setValue(this.personalDetails.value.pincode);
        this.personalDetails
          .get('permdistrict')
          .setValue(this.personalDetails.value.district);
      } else {
        this.showAlert('Alert!', 'Please Add the Current Address!').then(() => {
          this.zone.run(() => {
            this.ionCheck = false;
          });
        });
      }
    } else {
      this.zone.run(() => {
        this.ionCheck = false;
      });
      this.perDisable = 'false';
      this.personalDetails.get('permaddress1').setValue('');
      this.personalDetails.get('permaddress2').setValue('');
      this.addressData.perstate = '';
      this.addressData.percity = '';
      this.personalDetails.get('permpincode').setValue('');
      this.personalDetails.get('permdistrict').setValue('');
    }
  }

  getpersonalDetail() {
    if (this.usertype === 'A') {
      this.personalDetails.get('relationship').clearValidators();
      this.personalDetails.get('relationship').updateValueAndValidity();
    } else if (this.usertype != 'A') {
      this.personalDetails
        .get('relationship')
        .setValidators(Validators.compose([Validators.required]));
    }
    this.sqliteProvider
      .getpersonalDetails(this.refId, this.id)
      .then(data => {
        this.personalData = data;
        if (this.personalData.length > 0) {
          // let selectedState = this.global.getFullStateMaster().find((f) => {
          //   return f.sgmStateCode === this.personalData[0].stateName;
          // });
          // let selectedCity = this.global.getFullCityMaster().find((f) => {
          //   return f.sgmCityCode === this.personalData[0].cityName;
          // });
          // let selectedPerCity = this.global.getFullCityMaster().find((f) => {
          //   return f.sgmCityCode === this.personalData[0].permcity;
          // });
          // let selectedPerState = this.global.getFullStateMaster().find((f) => {
          //   return f.sgmStateCode === this.personalData[0].permstate;
          // });
          // this.sqliteProvider.getCityDetails(this.personalData[0].stateName).then(cityvalue => {
          //   if (cityvalue.length > 0) {
          //     this.CityData = cityvalue;
          //   } else {
          //     this.CityData = [];
          //   }
          // }).then(() => {
          //   this.sqliteProvider.getCityDetails(this.personalData[0].permstate).then(cityvalue => {
          //     if (cityvalue.length > 0) {
          //       this.PCityData = cityvalue;
          //     } else {
          //       this.PCityData = [];
          //     }
          //   })
          // })

          this.personalDetails = this.formBuilder.group({
            title: [
              this.personalData[0].title,
              Validators.compose([Validators.required])
            ],
            firstName: [
              this.personalData[0].firstName,
              Validators.compose([
                Validators.maxLength(30),
                Validators.pattern('[a-zA-Z ]*'),
                Validators.required
              ])
            ],
            lastName: [
              this.personalData[0].lastName,
              Validators.compose([
                Validators.maxLength(30),
                Validators.pattern('[a-zA-Z ]*'),
                Validators.required
              ])
            ],
            gender: [
              this.personalData[0].gender,
              Validators.compose([Validators.required])
            ],
            dob: [
              this.personalData[0].dob,
              Validators.compose([Validators.required])
            ],
            phone: [
              this.personalData[0].phone,
              Validators.compose([
                Validators.minLength(10),
                Validators.maxLength(10),
                Validators.pattern('[0-9]*'),
                Validators.required
              ])
            ],
            email: [
              this.personalData[0].email,
              Validators.compose([
                Validators.minLength(6),
                Validators.maxLength(50),
                Validators.pattern(
                  '^[A-Z0-9a-z\\._%+-]+@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$'
                ),
                Validators.required
              ])
            ],
            middleName: [
              this.personalData[0].middleName,
              Validators.compose([Validators.pattern('[a-zA-Z]*')])
            ],
            address: [
              this.personalData[0].address,
              Validators.compose([Validators.required])
            ],
            address2: [this.personalData[0].address2],
            pincode: [
              this.personalData[0].pincode,
              Validators.compose([
                Validators.minLength(6),
                Validators.maxLength(6),
                Validators.pattern('[0-9]*')
              ])
            ],
            /* relationship: [this.personalData[0].app_relationship,Validators.compose([relation_flg])], */
            relationship: this.personalData[0].app_relationship,
            company: [
              this.personalData[0].company,
              Validators.compose([
                Validators.pattern('[0-9a-zA-Z ]*'),
                Validators.required
              ])
            ],
            permaddress1: [
              this.personalData[0].permaddress1,
              Validators.compose([Validators.required])
            ],
            permaddress2: [this.personalData[0].permaddress2],
            permpincode: [
              this.personalData[0].permpincode,
              Validators.compose([
                Validators.minLength(6),
                Validators.maxLength(6),
                Validators.pattern('[0-9]*')
              ])
            ],
            permdistrict: [
              this.personalData[0].perdistrict,
              Validators.compose([Validators.pattern('[a-zA-Z ]*')])
            ],
            district: [
              this.personalData[0].districtName,
              Validators.compose([Validators.pattern('[a-zA-Z ]*')])
            ],
            customerCategory: [
              this.personalData[0].custCategory,
              Validators.compose([Validators.required])
            ],
            custNationality: [
              this.personalData[0].nationality,
              Validators.compose([Validators.required])
            ],
            stlCustomer: [
              this.personalData[0].stlCust,
              Validators.compose([Validators.required])
            ],
            custType: [
              this.personalData[0].CustType,
              Validators.compose([Validators.required])
            ],
            bankingWith: [
              this.personalData[0].bankingWith,
              Validators.compose([Validators.required])
            ],
            vipFlag: [
              this.personalData[0].vipFlag,
              Validators.compose([Validators.required])
            ],
            incomeAssign: [
              this.personalData[0].incomeAssg,
              Validators.compose([Validators.required])
            ],
            cbrbResult: [
              this.personalData[0].cbrbRes,
              Validators.compose([Validators.required])
            ],
            alEthiadBureau: [
              this.personalData[0].alEthiadBureau,
              Validators.compose([Validators.required])
            ],
            accNo: [
              this.personalData[0].accNo,
              Validators.compose([Validators.required])
            ],
            passportNo: [
              this.personalData[0].passportNo,
              Validators.compose([Validators.required])
            ],
            eidaNo: [
              this.personalData[0].eidaNo,
              Validators.compose([Validators.required])
            ],
            rimNo: [
              this.personalData[0].rimNo,
              Validators.compose([Validators.required])
            ],
            poBoxNo: [
              this.personalData[0].poBoxNo,
              Validators.compose([Validators.required])
            ]
          });
          console.log(this.personalDetails, 'value from personal details');
          // this.addressData.state = selectedState.sgmStateName;
          // this.addressData.city = selectedCity.sgmCityName;
          // this.addressData.percity = selectedPerCity.sgmCityName;
          // this.addressData.perstate = selectedPerState.sgmStateName

          this.dummyusertype = this.personalData[0].userType;
          this.adstate = this.personalData[0].stateName;
          this.adcity = this.personalData[0].cityName;
          this.genderSelect = this.personalData[0].gender;
          this.profImg = true;
          this.base64Image = this.personalData[0].imagepath;
          this.id = this.personalData[0].id;
          this.personaltik = true;
          let ionCheck = this.personalData[0].addresscheck;

          if (ionCheck == 'true') {
            this.ionCheck = true;
            this.perDisable = 'true';
          } else {
            this.ionCheck = false;
            this.perDisable = 'false';
          }

          /* if(this.personalData[0].sameValue == "true") {
          this.ionCheck = true;
          // this.perDisable = "true";
        } else {
          this.ionCheck = false;
          // this.perDisable = "false";
        } */
        }
      })
      .catch(Error => { });
  }

  dummyincomesave() {
    if (this.refId != '') {
      if (this.irefId !== '') {
        this.sqliteProvider.getdummyincomeDetails(this.refId, this.id)
          .then(data => {
            if (data.length > 0) {
              this.sqliteProvider.clearallIncome(this.refId, this.id)
                .then(d => {
                  this.sqliteProvider.updatedummyincomedetails(this.refId, this.id, this.dummyvalue)
                    .then(data => {
                      this.incometik = true;
                      this.complete();
                      this.getIncomeDetail();
                      this.getExpenceDetail();
                      this.showAlert(
                        'Alert!',
                        'Income Details Successfully Updated!'
                      );

                      this.slider.slideTo(4);
                    });
                });
            }
          });
      } else {
        this.sqliteProvider.clearallIncome(this.refId, this.id).then(d => {
          this.sqliteProvider.DummyIncomeDetails(this.refId, this.id, this.dummyvalue, this.usertype)
            .then(data => {
              this.incometik = true;
              this.complete();
              this.showAlert('Alert!', 'Income Details Successfully Added!');
              if (this.usertype != 'A') {
                this.slider.slideTo(4);
              } else {
                this.slider.slideTo(5);
              }
              this.getIncomeDetail();
              this.getExpenceDetail();
            })
            .catch(Error => { });
        });
      }
    } else {
      this.showAlert('Alert!', 'Please Save Personal Details First..');
      this.slider.slideTo(0);
    }
  }

  fetchLoanproduct(val) {
    this.sqliteProvider.getProductListById(val.product).then(data => {
      if (data.length > 0) {
        this.global.setLoanProduct(val.product);
        this._SelectedProduct = data;
        this.InterestFrom = '';
        this.InterestTo = '';
        this.ProperAmount = true;

        this.loanDetails = this.formBuilder.group({
          product: [val.product, Validators.compose([Validators.required])],
          interesttype: ['', Validators.compose([Validators.required])],
          amount: [
            '',
            Validators.compose([
              Validators.required,
              Validators.pattern('[0-9]*')
            ])
          ],
          tenure: [
            '',
            Validators.compose([
              Validators.required,
              Validators.pattern('[0-9]*'),
              Validators.maxLength(3),
              Validators.minLength(1)
            ])
          ],
          moratorium: [
            '',
            Validators.compose([
              Validators.required,
              Validators.pattern('[0-9]*')
            ])
          ],
          // rio: ['', Validators.compose([Validators.required])],
          // cost: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
          // priority: ['', Validators.compose([Validators.required])],
          mclr: '',
          loan_amount_range: [''],
          repaymentMode: ['', Validators.compose([Validators.required])],
          repaymentType: ['', Validators.compose([Validators.required])],
          proposalType: ['', Validators.compose([Validators.required])],
          amortization: ['', Validators.compose([Validators.required])],
          loanpurpose: ['', Validators.compose([Validators.required])]
        });
        this.ProperAmount = false;
        this.lnErrorMsg =
          'Loan Amount (' + data[0].lpdAmtFrom + ' - ' + data[0].lpdAmtTo + ')';
        this.TenorFlag = true;
        this.TenorFrom = data[0].lpdTenorFrom;
        this.TenorTo = data[0].lpdTenorTo;
        this.getDocListByLoanProduct(val, this._SelectedProduct[0].lpdPrdType);
      }
    });
  }

  getLoanPurposeByProduct(producttype) {
    this.sqliteProvider
      .getallStaticvalue('LoanPurpose_' + producttype)
      .then(loan => {
        if (loan.length > 0) {
          this.loanPurpose = [];
          this.loanPurpose = loan;
          //this.loanDetails.get('loanpurpose').setValidators(Validators.compose([Validators.required]));
          this.global.globalLodingDismiss();
        } else {
          /* this.service.restApiCall("LOSRestFulServices", "loanpurposeData", producttype).then((result) => {
           if (!this.isEmpty(result)) {
             var lnPurpose = JSON.parse((<any>result)._body);
             /* for (var i = 0; i < (<any>result).MclrResponseDetails.length; i++) {
               this.sqliteProvider.insertStaticData("LoanPurpose_"+producttype,(<any>result).MclrResponseDetails[i].llvOptionDesc['#text'],(<any>result).MclrResponseDetails[i].llvOptionVal['#text']);                                    
             
               if()
             
             } */
          /*  lnPurpose.MclrResponseDetails.forEach((element, index) => {
            this.sqliteProvider.insertStaticData("LoanPurpose_" + producttype, element.mclrData, element.mclrValue);
            if (index == lnPurpose.MclrResponseDetails.length - 1) {
              this.getLoanPurposeByProduct(producttype);
            }
          });



        }

      }, (err) => {
        this.global.globalAlert("Alert", `Request could not be processed due to a server error. The request may succeed if you try again.`);
        this.global.globalLodingDismiss();
      });*/
        }
      });
  }

  valudateMclr(loan) {
    if (this.ProperAmount == true) {
      if (
        loan.product != undefined &&
        loan.product != '' &&
        loan.interesttype == '2' &&
        loan.mclr != undefined &&
        loan.mclr != '' &&
        loan.tenure != undefined &&
        loan.tenure != '' &&
        loan.amount != undefined &&
        loan.amount != ''
      ) {
        this.fetchInterestRateMaster(loan);
      }
    } else {
      this.loanDetails.get('rio').setValue('');
      this.showAlert('Alert', 'Enter Valid Loan Amount.');
    }
  }

  ValidateLoanAmount(loan) {
    this.showMclr = false;
    if (loan.interesttype == '1') {
      this.showMclr = false;
      this.loanDetails.get('mclr').setValue('');
      this.loanDetails.get('mclr').clearValidators();
      this.loanDetails.get('mclr').updateValueAndValidity();
      if (this.ProperAmount == true) {
        if (
          loan.product != undefined &&
          loan.product != '' &&
          loan.interesttype == '1' &&
          loan.tenure != undefined &&
          loan.tenure != '' &&
          loan.amount != undefined &&
          loan.amount != ''
        ) {
          this.fetchInterestRateMaster(loan);
        }
      } else {
        this.loanDetails.get('rio').setValue('');
        this.showAlert('Alert', 'Enter Valid Loan Amount.');
      }
    }
    if (loan.interesttype == '2') {
      this.showMclr = true;
      this.loanDetails
        .get('mclr')
        .setValidators(Validators.compose([Validators.required]));
      if (this.ProperAmount == true) {
        if (
          loan.product != undefined &&
          loan.product != '' &&
          loan.interesttype == '2' &&
          loan.mclr != undefined &&
          loan.mclr != '' &&
          loan.tenure != undefined &&
          loan.tenure != '' &&
          loan.amount != undefined &&
          loan.amount != ''
        ) {
          this.fetchInterestRateMaster(loan);
        }
      } else {
        this.loanDetails.get('rio').setValue('');
        this.showAlert('Alert', 'Enter Valid Loan Amount.');
      }
    }

    /*  let flag = false;
     this.sqliteProvider.getInterestRateOfProductByType(loan.interesttype, loan.product).then(data => {
       for (var i = 0; i < data.length; i++) {
         this.InterestFrom = data[0].lirAmtFrom;
         this.InterestTo = data[data.length - 1].lirAmtTo;
         if (loan.interesttype == data[i].lirIntType && parseInt(loan.amount) >= parseInt(data[i].lirAmtFrom) && parseInt(data[i].lirAmtTo) >= parseInt(loan.amount)) {
           flag = false;
           this.ProperAmount = true;
           
           break;
         } else {
           flag = true;
         }
       }
       let type_Value;
       if (loan.interesttype == "1") {
         type_Value = 'Fixed';
       } else {
         type_Value = 'Floating';
       }
       if (flag === true) {
         this.ProperAmount = false;
 
         this.lnErrorMsg = 'For ' + type_Value + ' Type :' + 'Loan Amount (' + this.InterestFrom + ' - ' + this.InterestTo + ')'
       }
     })
     this.loanDetails.get('rio').setValue("");
     let dummyPriority = loan.priority;
     this.loanDetails.get('priority').setValue(dummyPriority);
     this.validatePriority(loan); */
  }

  ValidateLoan(loan) {
    this.sqliteProvider.getProductListById(loan.product).then(data => {
      if (
        parseInt(data[0].lpdAmtFrom) > parseInt(loan.amount) ||
        parseInt(data[0].lpdAmtTo) < parseInt(loan.amount)
      ) {
        this.ProperAmount = false;
        this.lnErrorMsg =
          'Loan Amount (' + data[0].lpdAmtFrom + ' - ' + data[0].lpdAmtTo + ')';
      } else {
        this.ProperAmount = true;
      }
      if (this.ProperAmount == true) {
        if (
          loan.product != undefined &&
          loan.product != '' &&
          loan.interesttype == '1' &&
          loan.tenure != undefined &&
          loan.tenure != '' &&
          loan.amount != undefined &&
          loan.amount != ''
        ) {
          this.fetchInterestRateMaster(loan);
        }
        if (
          loan.product != undefined &&
          loan.product != '' &&
          loan.interesttype == '2' &&
          loan.mclr != undefined &&
          loan.mclr != '' &&
          loan.tenure != undefined &&
          loan.tenure != '' &&
          loan.amount != undefined &&
          loan.amount != ''
        ) {
          this.fetchInterestRateMaster(loan);
        }
      } else {
        this.loanDetails.get('rio').setValue('');
        this.showAlert('Alert', 'Enter Valid Loan Amount.');
      }
    });
  }

  checkTenorPeriod(tenor) {
    this.sqliteProvider.getProductListById(tenor.product).then(data => {
      if (
        parseInt(data[0].lpdTenorFrom) > parseInt(tenor.tenure) ||
        parseInt(data[0].lpdTenorTo) < parseInt(tenor.tenure)
      ) {
        this.TenorFlag = true;
        this.TenorFrom = data[0].lpdTenorFrom;
        this.TenorTo = data[0].lpdTenorTo;
        this.loanDetails.get('rio').setValue('');
      } else {
        this.TenorFlag = false;
        if (this.ProperAmount == true) {
          this.fetchInterestRateMaster(tenor);
        } else {
          this.loanDetails.get('rio').setValue('');
          this.showAlert('Alert', 'Enter Valid Loan Amount.');
        }
      }
    });
  }

  checkMoratoriamPeriod(mrtm) {
    this.sqliteProvider.getProductListById(mrtm.product).then(data => {
      if (
        data[0].lpdMoratoriumMax !== null &&
        data[0].lpdMoratoriumMax !== ''
      ) {
        if (
          0 > parseInt(mrtm.moratorium) ||
          parseInt(data[0].lpdMoratoriumMax) < parseInt(mrtm.moratorium)
        ) {
          this.MorotoriamFlag = true;
          this.MorotoriamMax = data[0].lpdMoratoriumMax;
        } else {
          this.MorotoriamFlag = false;
        }
      }
    });
  }

  fetchInterestRateMaster(loan) {
    this.global.globalLodingPresent('Loading');
    if (this.network.type == 'none') {
      this.global.globalLodingDismiss();
      this.showAlert('Alert', 'Please Check Your Network Connection.');
    } else {
      let data;
      if (this.showMclr == true) {
        data = {
          prdcode: loan.product,
          Amount: loan.amount,
          TenorPeriod: loan.tenure,
          InterestType: loan.interesttype,
          mclrType: loan.mclr
        };
      } else {
        data = {
          prdcode: loan.product,
          Amount: loan.amount,
          TenorPeriod: loan.tenure,
          InterestType: loan.interesttype
        };
      }

      /*  this.service.soapApiCall("LOSbosmplpWebServices", "getInterestRateCalculation", data).subscribe((result) => {
 
         if (!this.isEmpty(result)) {
           if ((<any>result).success['#text'] == "true") {
             if ((<any>result).lirTrPrefr['#text'] !== undefined && (<any>result).lirTrPrefr['#text'] !== "") {
               this.loanDetails.get('rio').setValue(parseFloat((<any>result).lirTrPrefr['#text']).toFixed(2));
             } else {
               this.loanDetails.get('rio').setValue("");
             }
             this.global.globalLodingDismiss();
           } else {
             this.loanDetails.get('rio').setValue("");
             this.global.globalLodingDismiss();
             this.global.globalAlert("Alert", `No Interest Rate found this range`);
 
           }
 
         } else {
           this.loanDetails.get('rio').setValue("");
           this.global.globalLodingDismiss();
           this.global.globalAlert("Alert", `No Interest Rate found this range`);
 
         }
 
       }, (err) => {
         this.loanDetails.get('rio').setValue("");
         this.global.globalAlert("Alert", `Request could not be processed due to a server error. The request may succeed if you try again.`);
         this.global.globalLodingDismiss();
       }); */
    }
  }

  /* async openStateModal(type: string) {
 
    switch (type) {
      case 's':
        let statemodal = await this.modalCtrl.create({
          component:StatemodelsPage
        });
        statemodal.onDidDismiss().then( (data) => {
          this.addressData.state =  data.sgmStateName;
          this.addressData.city = "";
          this.getcity(data.sgmStateCode,'c_city');

        });

        statemodal.onDidDismiss().then()
        statemodal.present();
        break;
      case 'c': */
  /*  if(this.CityData.length > 0){ */
  /*    let citymodal = this.modalCtrl.create(CitymodelsPage, { 'data': this.CityData });
     citymodal.onDidDismiss(data => {
       if(data!=undefined && data!=""){
          this.addressData.city = data.sgmCityName;
       }
      
     });
     citymodal.present();
  
     break;
   case 'ps':
     let pstatemodal = this.modalCtrl.create(StatemodelsPage);
     pstatemodal.onDidDismiss(data => {
       this.addressData.perstate = data.sgmStateName;
       this.addressData.percity = "";
       this.getcity(data.sgmStateCode,'p_city');
     });
     pstatemodal.present();
     break;
   case 'pc':
     let pcitymodal = this.modalCtrl.create(CitymodelsPage, { 'data': this.PCityData });
     pcitymodal.onDidDismiss(data => {
       console.log(this.addressData);
       this.addressData.percity = data.sgmCityName;
     });
     pcitymodal.present();
     break;
 }


} */
  public incomedes: any;

  getDocListByLoanProduct(productCode, productType) {
    /*  this.docdescription.docdes = "";
     this.sqliteProvider.getAllDocumentListbyID(productCode.product).then(prd_data => {
       if (prd_data.length > 0) {
 
         this.global.setDocumentList(prd_data);
 
         this.getLoanPurposeByProduct(productType);
       } else {
         this.global.globalLodingPresent("");
         if (this.network.type == 'none') {
           this.global.globalLodingDismiss();
           this.showAlert("Alert", "Please Check Your Network Connection.");
         } else {
 
           let data = {
             "username": this.sqliteProvider.getName(),
             "prdcode": productCode.product
           }
           this.service.soapApiCall("LOSbosmplpWebServices", "getDocumentsdetailList", data).subscribe((result) => {
             if (!this.isEmpty(result)) {
               if ((<any>result).success['#text'] == "true") {
                 this.sqliteProvider.removedocumentList(productCode.product).then(data => {
                   for (var i = 0; i < (<any>result).documentList.length; i++) {
                     this.sqliteProvider.InsertDocumentList(
                       productCode.product,
                       (<any>result).documentList[i].ldDocActive['#text'],
                       (<any>result).documentList[i].ldDocId['#text'],
                       (<any>result).documentList[i].ldDocDesc['#text'],
                       (<any>result).documentList[i].ldDocType['#text'],
                       (<any>result).documentList[i].ldLegalDocActive['#text'],
                     );
                     if (i == (<any>result).documentList.length - 1) {
 
                       this.getDocListByLoanProduct(productCode, productType);
                     }
 
                   }
                 })
               } else {
                 this.global.globalAlert("Alert", `Request could not be processed due to a server error. The request may succeed if you try again.`);
                 this.global.globalLodingDismiss();
               }
             }
 
           }, (err) => {
             this.global.globalAlert("Alert", `Request could not be processed due to a server error. The request may succeed if you try again.`);
             this.global.globalLodingDismiss();
           });
         }
       }
     })
 
  */
  }

  async openDocModel() {
    console.log('openDocModel Function', this);
    if (this.disableScope !== 'true') {
      this.GlobalDocumentList = this.global.getDocumentList();
      let docmodal = await this.modalCtrl.create({
        component: DoclistPage
      }); //{ 'data': this.GlobalDocumentList });
      docmodal.onDidDismiss().then(data => {
        if (data != undefined && data != '') {
          console.log(
            data.data.doc_description,
            'opendoc mode function data from doclist'
          );
          this.docdescription.docdes = data.data.doc_description;
          this.docdescription.docid = data.data.doc_docId;
        }
      });
      await docmodal.present();
    }
  }

  eligibility() {
    this.slider.slideTo(0);
  }

  expencessave(expense) {
    if (this.refId !== '') {
      if (this.erefId !== '') {
        this.obligatinsarray = this.expences.controls.obligatins.value;
        for (var i = 0; i < this.obligatinsarray.length; i++) {
          this.sqliteProvider
            .updateObligationDetails(
              this.refId,
              this.id,
              this.obligatinsarray[i].bankname,
              this.obligatinsarray[i].emiamount,
              this.obligatinsarray[i].bankid,
              this.usertype
            )
            .then(data => {
              if (i == this.obligatinsarray.length - 1) {
                this.obligatinsArray();
              }
            });
        }
        this.showAlert('Alert!', 'Expense Details Successfully Updated!');
        this.expencetik = true;
        this.complete();
        this.slider.slideTo(5);
        if (this.usertype === 'C' || this.usertype === 'G') {
          this.slider.slideTo(4);
        }
      } else {
        this.erefId = this.refId;
        this.obligatinsarray = this.expences.controls.obligatins.value;

        for (var i = 0; i < this.obligatinsarray.length; i++) {
          this.sqliteProvider
            .addobligatinDetails(
              this.refId,
              this.id,
              this.obligatinsarray[i].bankname,
              this.obligatinsarray[i].emiamount,
              this.usertype
            )
            .then(data => {
              if (i == this.obligatinsarray.length - 1) {
                this.obligatinsArray();
              }
            });
        }
        this.showAlert('Alert!', 'Expense Details Successfully Added!');
        this.expencetik = true;
        this.complete();
        this.slider.slideTo(5);
        if (this.usertype === 'C' || this.usertype === 'G') {
          this.slider.slideTo(4);
        }
      }
    } else {
      this.showAlert('Alert!', 'Please Save Personal Details First..');
      this.slider.slideTo(0);
    }
  }

  getloanDetail() {
    this.sqliteProvider
      .getloanDetails(this.refId, this.id)
      .then(data => {
        this.loanData = data;
        this.loanDetails = this.formBuilder.group({
          product: [
            this.loanData[0].product,
            Validators.compose([Validators.required])
          ],
          interesttype: [
            this.loanData[0].interesttype,
            Validators.compose([Validators.required])
          ],
          producttype: [
            this.loanData[0].producttype,
            Validators.compose([Validators.required])
          ],
          loan_amount_range: [this.loanData[0].loan_amount_range],
          amount: [
            this.loanData[0].amount,
            Validators.compose([
              Validators.required,
              Validators.pattern('[0-9]*')
            ])
          ],
          tenure: [
            this.loanData[0].tenure,
            Validators.compose([
              Validators.required,
              Validators.pattern('[0-9]*'),
              Validators.maxLength(3),
              Validators.minLength(1)
            ])
          ],
          moratorium: [
            this.loanData[0].moratorium,
            Validators.compose([
              Validators.required,
              Validators.pattern('[0-9]*')
            ])
          ],
          //rio: [this.loanData[0].rio, Validators.compose([Validators.required])],
          // cost: [this.loanData[0].cost, Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
          //  priority: [this.loanData[0].priority, Validators.compose([Validators.required])],
          mclr: this.loanData[0].mclr,
          repaymentMode: [
            this.loanData[0].repaymentMode,
            Validators.compose([Validators.required])
          ],
          repaymentType: [
            this.loanData[0].repaymentType,
            Validators.compose([Validators.required])
          ],
          proposalType: [
            this.loanData[0].proposalType,
            Validators.compose([Validators.required])
          ],
          amortization: [
            this.loanData[0].amortization,
            Validators.compose([Validators.required])
          ],
          loanpurpose: [
            this.loanData[0].loanpurpose,
            Validators.compose([Validators.required])
          ]
        });
        if (this.loanData[0].interesttype == '2') {
          this.showMclr = true;
          this.loanDetails
            .get('mclr')
            .setValidators(Validators.compose([Validators.required]));
        } else {
          this.showMclr = false;
          this.loanDetails.get('mclr').clearValidators();
          this.loanDetails.get('mclr').updateValueAndValidity();
        }
        this.loanid = this.loanData[0].loanid;
        this.loantik = true;
        this.sqliteProvider
          .getAllDocumentListbyID(this.loanData[0].product)
          .then(prd_data => {
            if (prd_data.length > 0) {
              this.global.setDocumentList(prd_data);
              this.global.setLoanProduct(this.loanData[0].product);
            } else {
              this.global.setDocumentList('');
              this.global.setLoanProduct(this.loanData[0].product);
            }
          });
        // this.sqliteProvider.getProductListById(this.loanData[0].product).then(data => {
        //   let producttype = data[0].lpdPrdType;
        //   this.sqliteProvider.getallStaticvalue("LoanPurpose_" + producttype).then(loan => {
        //     if (loan.length > 0) {
        //       this.loanPurpose = [];
        //       this.loanPurpose = loan;
        //     } else {
        //       /*
        //       this.service.restApiCall("LOSRestFulServices", "loanpurposeData", producttype).then((result) => {
        //         if (!this.isEmpty(result)) {
        //           var lnPurpose = JSON.parse((<any>result)._body);

        //           lnPurpose.MclrResponseDetails.forEach((element, index) => {
        //             this.sqliteProvider.insertStaticData("LoanPurpose_" + producttype, element.mclrData, element.mclrValue);
        //             if (index == lnPurpose.MclrResponseDetails.length - 1) {
        //               //this.getLoanPurposeByProduct(producttype);

        //               this.sqliteProvider.getallStaticvalue("LoanPurpose_" + producttype).then(loan => {
        //                 if (loan.length > 0) {
        //                   this.loanPurpose = [];
        //                   this.loanPurpose = loan;
        //                 }
        //               })
        //             }
        //           });

        //         }

        //       }, (err) => {
        //         //this.global.globalAlert("Alert", `Request could not be processed due to a server error. The request may succeed if you try again.`);
        //         // this.global.globalLodingDismiss();
        //       });*/
        //     }
        //   })
        // })
      })
      .catch(Error => { });
  }

  getkycDetail() {
    this.sqliteProvider.getKycDetails(this.refId, this.id)
      .then(data => {
        console.log("loc get kyc data: ", data);
        this.kycData = [];
        this.kycData = data;
        //console.log("Array KYCDATA: " + JSON.stringify(this.kycData));
      })
      .catch(error => {
        //console.log(error);
      });
  }

  getIncomeDetail() {
    //this.refinfo.refId, this.incomeid

    this.sqliteProvider
      .getincomeDetails(this.refId, this.id)
      .then(data => {
        this.incomeData = data;
        if (this.incomeData.length === 0) {
        }
        this.sqliteProvider
          .getotherincomeDetails(this.refId, this.id)
          .then(otherincomegetdata => {
            if (otherincomegetdata.length > 0) {
              this.otherincomeData = otherincomegetdata;
            }
          })
          .then(() => {
            if (this.incomeData.length === 0) {
            } else {
              this.income = this.formBuilder.group({
                category: this.incomeData[0].category,
                incometype: this.incomeData[0].incometype,
                grossincome: [
                  this.incomeData[0].grossincome,
                  Validators.compose([
                    Validators.minLength(1),
                    Validators.maxLength(10),
                    Validators.pattern('[0-9]*'),
                    Validators.required
                  ])
                ],
                //giamount:"",['', Validators.compose([Validators.minLength(1), Validators.maxLength(13), Validators.required])],
                statutory: [
                  this.incomeData[0].statutory,
                  Validators.compose([
                    Validators.minLength(1),
                    Validators.maxLength(10),
                    Validators.pattern('[0-9]*'),
                    Validators.required
                  ])
                ],
                // sdamount:"",
                other: [
                  this.incomeData[0].other,
                  Validators.compose([
                    Validators.minLength(1),
                    Validators.maxLength(10),
                    Validators.pattern('[0-9]*'),
                    Validators.required
                  ])
                ],
                //odamount:"",
                netincome: [
                  this.incomeData[0].netincome,
                  Validators.compose([
                    Validators.minLength(1),
                    Validators.maxLength(10),
                    Validators.pattern('[0-9]*'),
                    Validators.required
                  ])
                ],
                // niamount:"",
                empName: this.incomeData[0].empName,
                doj: [this.incomeData[0].doj, Validators.compose([Validators.required])],
                eosb: this.incomeData[0].eosb,
                lengthService: this.incomeData[0].lengthService,
                otherincomes: this.formBuilder.array([])
              });
              this.grossincome = this.incomeData[0].grossincome;
              this.statutory_deductions = this.incomeData[0].statutory;
              this.other_deductions = this.incomeData[0].other;
              this.net_income = this.incomeData[0].netincome;

              (this.incomeyesno = this.incomeData[0].incomeyesno),
                (this.incomeid = this.incomeData[0].id);
              this.incometik = true;
            }

            this.incomeshowhide();
          });
      })
      .catch(Error => { });
  }

  incomeshowhide() {
    if (this.incomeyesno === 'yes') {
      this.checkshow = true;
      this.incomeshow = true;
    }

    if (this.incomeyesno === 'no' || this.incomeyesno === 'undefined') {
      this.checkshow = true;
      this.incomeshow = false;
    }
  }

  async takedoc() {
    if (!this.docImg) {
      this.camera.getPicture(this.options).then(
        imageData => {
          this.docImage = this.webview.convertFileSrc(imageData);
          this.docImg = true;
        },
        err => { }
      );
    } else {
      // let Profilemodal =await this.modalCtrl.create("ShowImagePage", { 'pic': this.base64Image });
      let docModal = await this.modalCtrl.create({
        component: ShowImagePage
      });
      docModal.onDidDismiss().then(data => {
        if (data == 'updateProfileIMAGE') {
          this.camera.getPicture(this.options).then(
            imageData => {
              this.base64Image = this.webview.convertFileSrc(imageData);
              this.profImg = true;
            },
            err => { }
          );
        }
      });
      await docModal.present();
    }
  }

  async takepic() {
    if (this.profImg == false) {
      this.camera.getPicture(this.options).then(
        imageData => {
          this.base64Image = this.webview.convertFileSrc(imageData);
          this.profImg = true;
        },
        err => { }
      );
    } else {
      // let Profilemodal =await this.modalCtrl.create("ShowImagePage", { 'pic': this.base64Image });
      let Profilemodal = await this.modalCtrl.create({
        component: ShowImagePage,
        componentProps: {
          imageSrc: this.base64Image
        }
      });
      Profilemodal.onDidDismiss().then(data => {
        console.log(data);
        if (data.data == 'updateProfileIMAGE') {
          this.camera.getPicture(this.options).then(
            imageData => {
              this.base64Image = this.webview.convertFileSrc(imageData);
              this.profImg = true;
            },
            err => { }
          );
        }
      });
      await Profilemodal.present();
    }
  }

  async showAlert(tittle, subtitle) {
    let alert = await this.alertCtrl.create({
      header: tittle,
      subHeader: subtitle,
      buttons: [
        {
          text: 'ok',
          role: 'destructive',
          handler: () => { }
        }
      ]
    });
    await alert.present();
  }

  async removeKycDoc(value) {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert(
        'Alert!',
        "Application is already Submitted. Can't delete the document Image"
      );
    } else {
      let alertq = await this.alertCtrl.create({
        header: 'Delete?',
        subHeader: 'Do you want to delete?',
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            handler: () => {
              //console.log("cancelled");
            }
          },
          {
            text: 'yes',
            handler: () => {
              //console.log("u r click yes");
              //alert(this.refId);
              //alert(value.kycid);
              this.sqliteProvider
                .removeKYCDetails(this.refId, value.kycid)
                .then(data => {
                  //console.log(data);
                  this.getkycDetail();
                })
                .catch(err => {
                  //console.log(err);
                });
            }
          }
        ]
      });
      await alertq.present();
    }
  }

  dummypansave() {
    this.sqliteProvider
      .DummyPanDetails(this.refId, this.id)
      .then(data => {
        //console.log(data);
        this.panId = data.insertId;
      })
      .catch(Error => {
        //console.log("Dummy Save Failed!");
      });
  }

  async kycModal(others) {
    // let contactModal = this.modalCtrl.create(ModelDocImagePage, { otherval: others });
    // contactModal.present();
    if (this.refId != '' && this.refId != undefined) {
      let contactModal = await this.modalCtrl.create({
        component: ModelDocImagePage,
        componentProps: { otherval: others },
        showBackdrop: true,
        backdropDismiss: true
      });
      contactModal.dismiss(data => {
        if (data == 0) {
          this.kyctik = false;
          this.complete();
        }
        this.modalCtrl.dismiss({ dismissed: true });
      });
      await contactModal.present();
    }
    else {
      this.showAlert('Alert!', 'Please Fill Personal Information!');
    }
  }

  async kycProofModal(kycuser) {

    if (this.refId != '' && this.refId != undefined) {
      if (this.kycid == '' || this.kycid == undefined || this.kycid == null) {
        let proofModal = await this.modalCtrl.create({
          component: ProofModalPage,
          componentProps: { proofImgVal: kycuser, REFID: this.refId, IDEN: this.id, imgData: this.kycImgdata },
          showBackdrop: true,
          backdropDismiss: true
        });

        proofModal.dismiss(data => {
          if (data == 0) {
            this.kyctik = false;
            this.complete();
          }
          this.modalCtrl.dismiss({ dismissed: true });
        });
        await proofModal.present();
      }
      else {
        let proofModal = await this.modalCtrl.create({
          component: ProofModalPage,
          componentProps: { proofImgVal: kycuser, REFID: this.refId, IDEN: this.id },
          showBackdrop: true,
          backdropDismiss: true
        });

        proofModal.dismiss(data => {
          if (data == 0) {
            this.kyctik = false;
            this.complete();
          }
          this.modalCtrl.dismiss({ dismissed: true });
        });
        await proofModal.present();
      }
    }
    else {
      this.showAlert('Alert!', 'Please Fill Personal Information!');
    }

  }
  async kycPanModal() {
    console.log('inside kyc');
    if (this.refId != '' && this.refId != undefined) {
      if (this.panId == '' || this.panId == undefined || this.panId == null) {
        this.sqliteProvider.DummyPanDetails(this.refId, this.id)
          .then(async data => {
            console.log(data);
            this.panId = data.insertId;
            //let panModal =await this.modalCtrl.create(PanModalPage, { panImgVal: this.panId, REFID: this.refId, IDEN: this.id });
            let panModal = await this.modalCtrl.create({
              component: PanModalPage,
              componentProps: {
                panImgVal: this.panId,
                REFID: this.refId,
                IDEN: this.id
              }
            });
            // panModal.onDidDismiss(data => {
            //   if(data==0){
            //     this.kyctik=false;
            //     this.complete();
            //   }
            // });

            panModal.dismiss(data => {
              if (data == 0) {
                this.kyctik = false;
                this.complete();
              }
              this.modalCtrl.dismiss({ dismissed: true });
            });

            await panModal.present();
          })
          .catch(Error => {
            //console.log("Dummy Save Failed!");
          });
        //alert("Save the Pan details and try agin later.");
      } else {
        // let panModal = await this.modalCtrl.create(PanModalPage, { panImgVal: this.panId, REFID: this.refId, IDEN: this.id });
        let panModal = await this.modalCtrl.create({
          component: PanModalPage,
          componentProps: {
            panImgVal: this.panId,
            REFID: this.refId,
            IDEN: this.id
          }
        });
        //  panModal.onDidDismiss(data => {
        //     if(data==0){
        //       this.kyctik=false;
        //       this.complete();
        //     }
        //   });

        panModal.dismiss(data => {
          if (data == 0) {
            this.kyctik = false;
            this.complete();
          }
          this.modalCtrl.dismiss({ dismissed: true });
        });

        await panModal.present();
      }
    } else {
      this.showAlert('Alert!', 'Please Fill Personal Information!');
    }
  }

  async kycAadharModal() {
    if (this.refId != '' && this.refId != undefined) {
      if (this.panId == '' || this.panId == undefined || this.panId == null) {
        this.sqliteProvider
          .DummyPanDetails(this.refId, this.id)
          .then(async data => {
            //console.log(data);
            this.panId = data.insertId;
            //let panModal = this.modalCtrl.create(AadharModalPage, { aadharImgVal: this.panId, AREFID: this.refId, AIDEN: this.id });

            let panModal = await this.modalCtrl.create({
              component: AadharModalPage,
              componentProps: {
                aadharImgVal: this.panId,
                AREFID: this.refId,
                AIDEN: this.id
              }
            });

            /* panModal.onDidDismiss(data => {
            if(data==0){
              this.kyctik=false;
              this.complete();
            }
          }); */

            panModal.dismiss(data => {
              if (data == 0) {
                this.kyctik = false;
                this.complete();
              }
              this.modalCtrl.dismiss({ dismissed: true });
            });

            await panModal.present();
          })
          .catch(Error => {
            //console.log("Dummy Save Failed!");
          });
        //alert("Save the Pan details and try agin later.");
      } else {
        //let panModal = await this.modalCtrl.create(AadharModalPage, { aadharImgVal: this.panId, AREFID: this.refId, AIDEN: this.id });

        let panModal = await this.modalCtrl.create({
          component: AadharModalPage,
          componentProps: {
            aadharImgVal: this.panId,
            AREFID: this.refId,
            AIDEN: this.id
          }
        });

        /*  panModal.onDidDismiss(data => {
             if(data==0){
               this.kyctik=false;
               this.complete();
             }
           }); */

        panModal.dismiss(data => {
          if (data == 0) {
            this.kyctik = false;
            this.complete();
          }
          this.modalCtrl.dismiss({ dismissed: true });
        });

        await panModal.present();
      }
    } else {
      this.showAlert('Alert!', 'Please Fill Personal Information!');
    }
  }

  async removeDoc(other) {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert(
        'Alert',
        "Application is Already Submitted. Can't add Images"
      );
    } else {
      let alertq = await this.alertCtrl.create({
        header: 'Delete?',
        subHeader: 'Do you want to delete?',
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            handler: () => { }
          },
          {
            text: 'yes',
            handler: () => {
              this.sqliteProvider
                .removeotherDetails(other.refId, other.otherid)
                .then(data => {
                  this.getOtherDetail();
                })
                .catch(err => { });
            }
          }
        ]
      });
      await alertq.present();
    }
  }
  ConvertToInt(val) {
    return parseFloat(val);
  }
  grossincome: any;
  statutory_deductions: any;
  other_deductions: any;
  net_income: any;
  deductions: any;

  //incomedummyvalue:any;

  complete() {
    if (this.dummyusertype === 'A' || this.usertype == "A") {
      if (this.personaltik === true && this.loantik === true && this.incometik === true && this.kyctik === true) {
        let filled = 'F';
        this.sqliteProvider.updateCompleteDetails(this.refId, this.id, filled).then(data => { console.log(data, "from complete function"); })
          .catch(Error => { console.log(Error, "not filled updated"); });
      }
    } else if (this.dummyusertype === 'C' || this.usertype == "C" || this.usertype == "G" || this.dummyusertype === 'G') {
      if (this.incomeyesno === 'yes') {
        if (this.personaltik === true && this.incometik === true && this.kyctik === true) {
          let filled = 'F';
          this.sqliteProvider.updateCompleteDetails(this.refId, this.id, filled).then(data => { })
            .catch(Error => { this.showAlert('Alert!', 'Failed!'); });
        }
      } else if (this.incomeyesno === 'no' || this.incomeyesno === undefined || this.incomeyesno === '' || this.incomeyesno === null) {
        if (this.personaltik === true && this.kyctik === true) {
          let filled = 'F';
          this.sqliteProvider.updateCompleteDetails(this.refId, this.id, filled).then(data => { })
            .catch(Error => {
              this.showAlert('Alert!', 'Failed!');
            });
        }
      }
    }
  }

  othervaluepass(others) {
    let selectedPro = this.GlobalDocumentList.find(f => {
      return f.doc_docId === others.otherdocid;
    });
    this.otherdoc = this.formBuilder.group({
      otherdes: [others.otherdes, Validators.compose([Validators.required])]
      //otherdoctype: [others.otherdoctype, Validators.compose([Validators.required])],
    });
    this.docdescription = {
      docdes: selectedPro.doc_description,
      docid: selectedPro.doc_docId
    };
    //console.log(others.otherid);
    this.orefId = others.otherid;
  }

  async addressalert() {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    await loading.present();
    let posOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
    this.geolocation.getCurrentPosition(posOptions).then(
      pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        // var l_this=this;
        this.global
          .reverseGeocode(this.lat, this.lng)
          .then((results: any) => {
            let populateAddress = results[0].formatted_address.split(',');
            if (populateAddress.length > 0) {
              // loading.dismiss();
              let googleRes_country = populateAddress.splice(populateAddress.length - 1, 1);
              let googleRes_state = populateAddress.splice(populateAddress.length - 1, 1);
              let googleRes_city = populateAddress.splice(populateAddress.length - 1, 1);
              this.adaddress = populateAddress.join(',');
              this.adaddress2 = googleRes_city[0];
              let i: any = 0;
              let count: any = 0;
              let selectedState;
              for (i in results[0].address_components) {
                if (results[0].address_components[i].types[0] === 'administrative_area_level_1') {
                  this.addressData.state = results[0].address_components[i].long_name.toUpperCase();
                  selectedState = this.global.getFullStateMaster().find(f => {
                    return (f.sgmStateCode === results[0].address_components[i].short_name.toUpperCase());
                  });
                }
                /* SET PINCODE FROM GOOGLE RESPONSE */

                if (results[0].address_components[i].types[0] === 'postal_code') {
                  this.personalDetails.get('pincode').setValue(results[0].address_components[i].long_name);
                }
                /* SET DISTRICT FROM GOOGLE RESPONSE */
                if (results[0].address_components[i].types[0] === 'administrative_area_level_2') {
                  this.personalDetails.get('district').setValue(results[0].address_components[i].long_name);
                }
                /* SET CITY FROM GOOGLE RESPONSE */
                if (results[0].address_components[i].types[0] === 'locality') {
                  this.google_city_name = results[0].address_components[i].long_name.toUpperCase();
                }
                count = count + 1;
                if (count == results[0].address_components.length) {
                  if (selectedState != undefined && selectedState.sgmStateCode) {
                    loading.dismiss();
                    // this.getcity(selectedState.sgmStateCode,'c_type');
                  } else {
                    this.addressData.state = '';
                    loading.dismiss();
                  }
                }
              }
            } else {
              loading.dismiss();
              this.showAlert('Location', 'Could not get Proper Address for your location and could not auto-populate address!');
            }
          })
          .catch((error: any) => {
            loading.dismiss();
            //console.log(error)
            this.showAlert('Location', 'Unable To Get Your Location!');
          });
      },
      err => {
        loading.dismiss();
        this.showAlert('Location', 'Unable To Get Your Location.Please check your Location and Internet'
        );
      }
    );
  }



  async accessGallery(sourceType: number) {
    let actionSheet = await this.actionsheetCtrl.create({
      header: 'Option',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Take photo',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'ios-camera-outline' : null,
          handler: () => {
            this.captureImage(false);
          }
        },
        {
          text: 'Choose photo from Gallery',
          icon: !this.platform.is('ios') ? 'ios-images-outline' : null,
          handler: () => {
            this.captureImage(true);
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async captureImage(useAlbum: boolean) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500,
      ...(useAlbum ? { sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM } : {})
    };

    const imageData = await this.camera.getPicture(options);

    this.base64Image = `data:image/jpeg;base64,${imageData}`;

    this.photos.unshift(this.base64Image);
  }

  initTechnologyFields(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  kyc_addNewInputField(): void {
    const control = <FormArray>this.kyc.controls.technologies;
    control.push(this.initTechnologyFields());
  }

  kyc_removeInputField(i: number): void {
    const control = <FormArray>this.kyc.controls.technologies;
    control.removeAt(i);
  }

  kycAddProof(know) {

    console.log(know, 'raesdfaf');

    if (this.refId) {
      if (this.kycid) {
        this.sqliteProvider.updateProofDetails(this.refId, this.id, know.kycDesc, know.kycNum, this.kycid)
          .then(data => {
            //  console.log("Update Proof: " + JSON.stringify(data));
            this.kycid = '';
            this.getkycDetail();
            /*  this.docdescription={
           docdes: "",
           docid: ""
         } */
            this.showAlert('Alert!', 'Successfully Updated!');
          })
          .catch(Error => {
            //console.log("Failed!");
            this.showAlert('Alert!', 'Failed!');
          });
        this.addProof.reset();
      } else {
        this.sqliteProvider.getKycallreadyadded(this.refId, this.id, know.kycDesc)
          .then(res => {
            if (res.length > 0) {
              this.showAlert('Alert!', 'Document Already Added!');
            } else {
              this.sqliteProvider.addKYCDetails(this.refId, this.id, know.kycDesc, know.kycNum, this.kycImgdata)
                .then(data => {

                  this.getkycDetail();
                  //this.showAlert("Alert!", "Successfully Added!");
                })
                .catch(Error => {
                  //        console.log("KYC Adding Failed!");
                  this.showAlert('Alert!', 'Failed!');
                });
              this.addProof.reset();
            }
          });
      }
    } else {
      this.showAlert('Alert!', 'Please Save Personal Details First..');
      this.slider.slideTo(0);
    }
  }

  checkGrossValue(grossincome, statutorydeductions, otherdeductions) {
    this.income.get('statutory').setValidators(Validators.compose([Validators.max(parseInt(grossincome))]));
    this.income.get('other').setValidators(Validators.compose([Validators.max(parseInt(grossincome))]));
  }

  incomecal() {
    let grossincome = this.grossincome;
    let statutorydeductions = this.statutory_deductions;
    let otherdeductions = this.other_deductions;

    let netincome = this.net_income;

    if (grossincome === null || grossincome === undefined || grossincome === '') {
      //alert("works");
      grossincome = 0;
    }
    if (statutorydeductions === null || statutorydeductions === undefined || statutorydeductions === '') {
      //alert("works");
      statutorydeductions = 0;
    }
    if (otherdeductions === null || otherdeductions === undefined || otherdeductions === '') {
      otherdeductions = 0;
    }

    this.checkGrossValue(grossincome, statutorydeductions, otherdeductions);

    let deductions = this.ConvertToInt(statutorydeductions) + this.ConvertToInt(otherdeductions);
    let incometot = this.ConvertToInt(grossincome) - this.ConvertToInt(deductions);
    //this.net_income = incometot.toFixed(2);
    this.net_income = incometot;
  }

  otherexptot() {
    this.extotal = 0;
    //console.log(this.expences.controls.otherexpences.value);
    this.otherexpencearray = this.expences.controls.otherexpences.value;

    //console.log(this.otherexpencearray.length);
    //console.log(this.otherexpencearray);
    for (var i = 0; i < this.otherexpencearray.length; i++) {
      if (this.otherexpencearray[i].otiamount === null || this.otherexpencearray[i].otiamount === undefined || this.otherexpencearray[i].otiamount === '') {
        this.otherexpencearray[i].otiamount = 0;
      }
      //console.log("amount==>" + this.otherexpencearray[i].otiamount);
      let exptotal: number;
      exptotal = this.ConvertToInt(this.otherexpencearray[i].otiamount) + this.ConvertToInt(this.extotal);
      //console.log("exptotal==>" + exptotal);
      this.extotal = exptotal;
      //console.log("total==>" + this.extotal);
    }
    if (this.emitotal !== undefined) {
      this.expensesTotal();
    } else {
      this.otherEMItot();
    }
  }

  async removeObligationField(i) {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert('Alert', 'Application is Already Submitted.');
    } else {
      let idCheck = i.obgid == undefined || i.obgid == '' || i.obgid == null ? false : true;

      if (idCheck) {
        let alertq = await this.alertCtrl.create({
          header: 'Delete?',
          subHeader: 'Do you want to delete?',
          buttons: [
            {
              text: 'NO',
              role: 'cancel',
              handler: () => { }
            },
            {
              text: 'yes',
              handler: () => {
                this.sqliteProvider
                  .removeotherObligationDetails(i.obgid)
                  .then(data => {
                    const control = <FormArray>(
                      this.expences.controls.obligatins
                    );
                    control.removeAt(i.i);
                    this.otherEMItot();
                  })
                  .catch(err => { });
              }
            }
          ]
        });
        await alertq.present();
        this.otherEMItot();
      } else {
        const control = <FormArray>this.expences.controls.obligatins;
        control.removeAt(i.i);
        this.otherEMItot();
      }
    }
  }

  convertouppercase(value) {
    this.kyc.get('pancard').setValue(value.pancard.toUpperCase());
  }

  otherEMItot() {
    this.emitotal = 0;
    /* console.log("this.emitotal" + this.emitotal); */
    this.otheremiarray = this.expences.controls.obligatins.value;
    if (this.otheremiarray.length == 0) {
      this.expences = this.formBuilder.group({
        obligatins: this.formBuilder.array([
          // this.initObligationFields()
        ])
      });
      this.newExpenseTotal = 0;
    } else {
      for (var i = 0; i < this.otheremiarray.length; i++) {
        if (
          this.otheremiarray[i].emiamount === null ||
          this.otheremiarray[i].emiamount === undefined ||
          this.otheremiarray[i].emiamount === ''
        ) {
          this.otheremiarray[i].emiamount = 0;
        }
        let emiTotal: number;

        emiTotal =
          this.ConvertToInt(this.otheremiarray[i].emiamount) +
          this.ConvertToInt(this.emitotal);

        let oextotal = this.extotal;
        if (oextotal === null || oextotal === undefined) {
          oextotal = 0;
        }
        this.emitotal = emiTotal;
        if (i == this.otheremiarray.length - 1) {
          this.expensesTotal();
        }
      }
    }
  }

  onChangeType() {
    if (this.type_income === 'income') {
      this.boolean_income = true;
      this.boolean_expense = false;
    }
    if (this.type_income === 'expense') {
      this.boolean_income = false;
      this.boolean_expense = true;
    }
  }

  obligatinsArray() {
    /*   if (this.obligationData != undefined) { */
    this.newExpenseTotal = 0;
    this.sqliteProvider
      .getobligationDetails(this.refId, this.id)
      .then(obligationtdata => {
        this.obligationData = obligationtdata;
        //console.log("obligation data==>", this.obligationData);
      })
      .then(() => {
        const control = <FormArray>this.expences.controls.obligatins;
        control.controls = [];
        let emiAmt = 0;
        for (let i = 0; i < this.obligationData.length; i++) {
          const obligationvalue = this.expences.get('obligatins');
          //console.log(this.obligationData.length);
          emiAmt = emiAmt + parseInt(this.obligationData[i].emiamount);
          (obligationvalue as FormArray).push(
            this.formBuilder.group({
              bankid: this.obligationData[i].bankid,
              bankname: [
                this.obligationData[i].bname,
                Validators.compose([
                  Validators.minLength(1),
                  Validators.maxLength(13),
                  Validators.pattern('[a-zA-Z ]*'),
                  Validators.required
                ])
              ],
              emiamount: [
                this.obligationData[i].emiamount,
                Validators.compose([
                  Validators.minLength(1),
                  Validators.maxLength(10),
                  Validators.pattern('[0-9]*'),
                  Validators.required
                ])
              ]
            })
          );
          if (i == this.obligationData.length - 1) {
            this.newExpenseTotal = emiAmt;
          }
        }
      })
      .catch(Error => { });
  }

  otherexpenceArray() {
    if (this.otherexpenceData != undefined) {
      this.sqliteProvider
        .getotherexpenceDetails(this.refinfo.refId, this.expenceid)
        .then(otherexpencedata => {
          this.otherexpenceData = otherexpencedata;
          //console.log("otherexpence data==>", this.otherexpenceData);
        })
        .then(() => {
          const control = <FormArray>this.expences.controls.otherexpences;
          control.controls = [];
          for (let i = 0; i < this.otherexpenceData.length; i++) {
            const expencesvalue = this.expences.get('otherexpences');
            //console.log(this.otherexpenceData.length);
            (expencesvalue as FormArray).push(
              this.formBuilder.group({
                otherexpenceid: this.otherexpenceData[i].otherexpenceid,
                otherex: [
                  this.otherexpenceData[i].otherexpence,
                  Validators.compose([Validators.required])
                ],
                otiamount: [
                  this.otherexpenceData[i].amount,
                  Validators.compose([
                    Validators.pattern('[0-9]*'),
                    Validators.required
                  ])
                ]
              })
            );
          }
        })
        .catch(Error => { });
    }
  }

  expensesTotal() {
    this.newExpenseTotal = 0;
    let newEmiTotal = this.emitotal;

    this.newExpenseTotal = this.newExpenseTotal + newEmiTotal;
    /* this.sqliteProvider.getexpenceDetails(this.refId, this.id).then(data => {
      if(data.length>0){
        this.sqliteProvider.updateexpense(this.refId,this.id,this.newExpenseTotal);
      }
    }) */
  }

  getExpenceDetail() {
    this.obligationData = [];
    this.sqliteProvider
      .getobligationDetails(this.refId, this.id)
      .then(obligationtdata => {
        if (obligationtdata.length > 0) {
          this.obligationData = obligationtdata;
          this.obligatinsArray();
        }
      });
  }

  getOtherDetail() {
    this.sqliteProvider
      .getotherDetails(this.refId, this.id)
      .then(data => {
        //console.log(data);
        this.otherData = data;
        if (this.otherData.length >= 1) {
          this.otherdoctik = true;
        } else {
          this.otherdoctik = false;
        }
      })
      .catch(Error => { });
  }

  othersave(other) {
    if (this.refId) {
      if (this.orefId) {
        this.sqliteProvider
          .updateOtherdocDetails(
            this.refId,
            other.otherdes,
            this.docdescription.docdes,
            this.docdescription.docid,
            this.global.getLoanProduct(),
            this.orefId
          )
          .then(data => {
            this.orefId = '';
            this.docdescription = {
              docdes: '',
              docid: ''
            };
            this.getOtherDetail();
            this.showAlert('Alert!', 'Other Details Successfully Updated!');
            this.otherdoctik = true;
          })
          .catch(Error => {
            this.showAlert('Alert!', 'Failed!');
          });
        this.otherdoc.reset();
      } else {
        this.sqliteProvider
          .getotherdocadded(this.refId, this.docdescription.docid, this.id)
          .then(res => {
            if (res.length > 0) {
              this.showAlert('Alert!', 'Document Already added!');
            } else {
              this.sqliteProvider
                .addOtherDetails(
                  this.refId,
                  this.id,
                  other.otherdes,
                  this.docdescription.docdes,
                  this.docdescription.docid,
                  this.global.getLoanProduct()
                )
                .then(data => {
                  this.getOtherDetail();
                  this.docdescription = {
                    docdes: '',
                    docid: ''
                  };
                  this.showAlert('Alert!', 'Other Details Successfully Added!');
                  this.otherdoctik = true;
                })
                .catch(Error => {
                  this.showAlert('Alert!', 'Failed!');
                });
              this.otherdoc.reset();
              this.docImg = false;
              this.docImage = '';
            }
          });
      }

      if (this.usertype !== 'A') {
        this.slider.slideTo(3);
      } else {
        this.slider.slideTo(4);
      }
    } else {
      this.showAlert('Alert!', 'Please Save Personal Details First..');
      this.slider.slideTo(0);
    }
  }

  getPANDetail() {
    this.sqliteProvider
      .getPANDetails(this.refId, this.id)
      .then(data => {
        if (data.length > 0) {
          this.panData = data;
          console.log(this.panData, 'value f kyc details');
          this.kyc = this.formBuilder.group({
            pancard: [
              this.panData[0].pancard,
              Validators.compose([
                Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}'),
                Validators.required
              ])
            ],
            aadhaar: [
              this.panData[0].aadhaar,
              Validators.compose([
                Validators.maxLength(12),
                Validators.minLength(12),
                Validators.pattern('[0-9]*'),
                Validators.required
              ])
            ]
          });
          this.panId = this.panData[0].panId;
          if (
            this.panData[0].pancard != null &&
            this.panData[0].pancard != undefined &&
            this.panData[0].aadhaar != undefined &&
            this.panData[0].aadhaar != null
          ) {
            this.kyctik = true;
          }
        }
      })
      .catch(error => { });
  }

  getIncomeExpenseforCoGuApp() {
    this.sqliteProvider
      .getdummyincomeDetails(this.refId, this.id)
      .then(data => {
        if (data.length > 0) {
          if (data[0].incomeyesno == 'no') {
            this.incometik = true;
            this.expencetik = true;
          }
        }
      });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  statusChng() {
    if (this.status === 'Yes') {
      this.status = 'Yes';
    } else if (this.status === 'No') {
      this.status = 'No';
    }
  }

  public startdate: any;
  public enddate: any;
  public emiamountnew: any;

  async moreinfo_openmodal() {
    /* const emimodal = this.modalCtrl.create(EmiModalPage,{showBackdrop:true});
     emimodal.present();*/

    const emimodal = await this.modalCtrl.create({
      component: EmiModalPage,
      //componentProps: { index: i },
      showBackdrop: true,
      backdropDismiss: true
    });
    emimodal.onDidDismiss().then(data => {
      console.log(data, 'value of emi modal in user page');
      this.emiamountnew = data.data.emiamount_new;
      this.startdate = data.data.startdate;
      this.enddate = data.data.enddate;
    });
    return await emimodal.present();
  }

  addobligationfield(): void {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert('Alert', 'Application is Already Submitted.');
    } else {
      const control = <FormArray>this.expences.controls.obligatins;
      control.push(this.initObligationFields());
      console.log(control, 'checking');
    }
  }

  initObligationFields(): FormGroup {
    return this.formBuilder.group({
      bankid: '',
      bankname: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(13),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required
        ])
      ],
      emiamount: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.pattern('[0-9]*'),
          Validators.required
        ])
      ],
      emiamount_new: [
        '4560',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(10),
          Validators.pattern('[0-9]*')
        ])
      ],
      startdate: ['2020-01-20'],
      enddate: ['2021-01-20']
    });
  }

  addincomefield(): void {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert('Alert', 'Application is Already Submitted.');
    } else {
      const control = <FormArray>this.income.controls.otherincomes;
      if (control.length == 3) {
        this.showAlert('Alert', 'Maximum Of Other Income details reached.');
      } else {
        control.push(this.initIncomeFields());
      }
    }
  }

  initIncomeFields(): FormGroup {
    return this.formBuilder.group({
      otherincomeid: '',
      iname: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(30),
          Validators.required
        ])
      ],
      iotamount: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(13),
          Validators.pattern('[0-9]*'),
          Validators.required
        ])
      ]
    });
  }

  async removeIncomeField(i) {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert('Alert', 'Application is Already Submitted.');
    } else {
      let idCheck =
        i.incid == undefined || i.incid == '' || i.incid == null ? false : true;

      if (idCheck) {
        let alertq = await this.alertCtrl.create({
          header: 'Delete?',
          subHeader: 'Do you want to delete?',
          buttons: [
            {
              text: 'NO',
              role: 'cancel',
              handler: () => { }
            },
            {
              text: 'yes',
              handler: () => {
                this.sqliteProvider
                  .removeotherincomeDetails(i.incid)
                  .then(data => {
                    const control = <FormArray>(
                      this.income.controls.otherincomes
                    );
                    control.removeAt(i.i);
                  })
                  .catch(err => { });
              }
            }
          ]
        });
        await alertq.present();
      } else {
        const control = <FormArray>this.income.controls.otherincomes;
        control.removeAt(i.i);
      }
    }
  }

  public writeFile(
    base64Data,
    folderName,
    value,
    selectedState,
    selectedCity,
    selectedPerState,
    selectedPerCity
  ) {
    let contentType = this.getContentType(base64Data);
    let Name = new Date().getTime().toString() + '.jpg';
    let DataBlob = this.base64toBlob(base64Data, contentType);
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.
    let filePath =
      this.file.externalApplicationStorageDirectory + 'files/' + folderName;
    this.file
      .writeFile(filePath, Name, DataBlob, contentType)
      .then(success => {
        this.base64Image =
          this.file.externalApplicationStorageDirectory +
          'files/' +
          folderName +
          '/' +
          Name;
        console.log('File Writed Successfully', success);
        this.personalsave(value);
      })
      .catch(err => {
        console.log('Error Occured While Writing File', err);
      });
  }

  public getContentType(base64Data: any) {
    let block = base64Data.split(';');
    let contentType = block[0].split(':')[1];
    return contentType;
  }

  public base64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    let byteCharacters = atob(this.Base64Img);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, {
      type: contentType
    });
    return blob;
  }

  personalsave(value) {
    let app_relation_value;
    let c_Name;
    if (!this.base64Image) {
      this.showAlert('Alert', 'Please Update Profile Pic');
    } else {
      if (value.relationship == '' || value.relationship == undefined) {
        app_relation_value = '';
      } else {
        app_relation_value = value.relationship;
      }
      if (value.company == '' || value.company == undefined) {
        c_Name = '';
      } else {
        c_Name = value.company;
      }
      if (this.usertype == 'C' || this.usertype == 'G') {
        this.sqliteProvider.coapplicantcheck(this.refId, this.usertype)
          .then(data => {
            let cglength = data;
            if (cglength < 4) {
              this.sqliteProvider.getDetailsbyid(this.refId, this.id)
                .then(data => {
                  if (data.length > 0) {
                    console.log('TCL: this.base64Image', this.base64Image);
                    //this.sqliteProvider.updatepersonalDetails(this.refId, value.title, value.firstName, value.middleName, value.lastName, value.gender, value.dob, value.phone, value.email, value.address, value.address2, selectedState.sgmStateCode, selectedCity.sgmCityCode, value.district, value.pincode, value.permaddress1, value.permaddress2, selectedPerState.sgmStateCode, selectedPerCity.sgmCityCode, value.permdistrict, value.permpincode, this.ionCheck, this.id, this.base64Image, app_relation_value, c_Name).then(data => {
                    this.sqliteProvider.updatepersonalDetails(this.refId, value, this.ionCheck, this.base64Image, this.id)
                      .then(data => {
                        this.showAlert('Alert!', 'Personal Details Successfully Updated!');
                      })
                      .catch(Error => {
                        this.showAlert('Alert!', 'Failed!');
                      });
                  } else {
                    //this.sqliteProvider.addDetails(this.crefId, value.title, value.firstName, value.middleName, value.lastName, value.gender, value.dob, value.phone, value.email, value.address, value.address2, selectedState.sgmStateCode, selectedCity.sgmCityCode, value.district, value.pincode, value.permaddress1, value.permaddress2, selectedPerState.sgmStateCode, selectedPerCity.sgmCityCode, value.permdistrict, value.permpincode, this.ionCheck, this.base64Image, app_relation_value, c_Name, this.usertype).then(data => {

                    this.sqliteProvider
                      .addDetails(
                        this.crefId,
                        value,
                        this.ionCheck,
                        this.base64Image,
                        this.usertype
                      )
                      .then(data => {
                        this.id = data.insertId;
                        this.refId = this.crefId;
                        //this.usertype = '';
                        this.showAlert(
                          'Alert!',
                          'Personal Details Successfully Added!'
                        );
                      })
                      .catch(Error => {
                        this.showAlert('Alert!', 'Failed!');
                      });
                  }
                });

              this.slider.slideTo(1);
            } else {
              if (this.usertype === 'C') {
                this.showAlert('Alert!', 'Co-Applicant Maximum Limit reached!');
              } else {
                this.showAlert('Alert!', 'Guarantor Maximum Limit reached!');
              }
            }
          })
          .catch(error => { });
      } else if (this.refId) {
        // this.sqliteProvider.updatepersonalDetails(this.refId, value.title, value.firstName, value.middleName, value.lastName, value.gender, value.dob, value.phone, value.email, value.address, value.address2, selectedState.sgmStateCode, selectedCity.sgmCityCode, value.district, value.pincode, value.permaddress1, value.permaddress2, selectedPerState.sgmStateCode, selectedPerCity.sgmCityCode, value.permdistrict, value.permpincode, this.ionCheck, this.id, this.base64Image, app_relation_value, c_Name).then(data => {
        this.sqliteProvider
          .updatepersonalDetails(
            this.refId,
            value,
            this.ionCheck,
            this.base64Image,
            this.id
          )
          .then(data => {
            this.showAlert('Alert!', 'Personal Details Successfully Updated!');
          })
          .catch(Error => {
            this.showAlert('Alert!', 'Failed!');
          });
        this.slider.slideTo(1);
      } else {
        this.sqliteProvider
          .addRootDetails(
            this.global.getSystemDate(),
            this.device.uuid,
            this.sqliteProvider.getName()
          )
          .then(data => {
            this.refId = data.insertId;

            //this.sqliteProvider.addDetails(this.refId, value.title, value.firstName, value.middleName, value.lastName, value.gender, value.dob, value.phone, value.email, value.address, value.address2, selectedState.sgmStateCode, selectedCity.sgmCityCode, value.district, value.pincode, value.permaddress1, value.permaddress2, selectedPerState.sgmStateCode, selectedPerCity.sgmCityCode, value.permdistrict, value.permpincode, this.ionCheck, this.base64Image, app_relation_value, c_Name, this.usertype).then(data => {

            this.sqliteProvider
              .addDetails(
                this.refId,
                value,
                this.ionCheck,
                this.base64Image,
                this.usertype
              )
              .then(data => {
                this.id = data.insertId;
                this.incomeid = data.insertId;
                this.expenceid = data.insertId;
                this.showAlert(
                  'Alert!',
                  'Personal Details Successfully Added!'
                );
              })
              .catch(Error => {
                this.showAlert('Alert!', 'Failed!');
              });
          });
        this.slider.slideTo(1);
      }
      /* Indicating Personal Information is completed */
      this.personaltik = true;
    }
  }

  // personalcheck(value) {
  //   this.sqliteProvider.addRootDetails(this.global.getSystemDate(), this.device.uuid, this.sqliteProvider.getName()).then(data => {
  //     this.refId = data.insertId;

  //   console.log(value,"teeeeeessssst");

  //   this.sqliteProvider.addDetails(this.refId, value,this.base64Image);
  //   this.showAlert("Alert", "Personal Details saved successfully");

  //   })
  // }

  initExpenceFields(): FormGroup {
    return this.formBuilder.group({
      otherexpenceid: '',
      otherex: ['', Validators.compose([Validators.required])],
      otiamount: [
        '',
        Validators.compose([Validators.required, Validators.pattern('[0-9]*')])
      ]
    });
  }

  viewuserapplicant(userinfo) {
    this.navCtrl.pop();
  }

  addexpencefield(): void {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert('Alert', 'Application is Already Submitted.');
    } else {
      const control = <FormArray>this.expences.controls.otherexpences;
      control.push(this.initExpenceFields());
    }
  }

  async removeExpenceField(i) {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert('Alert', 'Application is Already Submitted.');
    } else {
      let idCheck =
        i.oexid == undefined || i.oexid == '' || i.oexid == null ? false : true;
      if (idCheck) {
        let alertq = await this.alertCtrl.create({
          header: 'Delete?',
          subHeader: 'Do you want to delete?',
          buttons: [
            {
              text: 'NO',
              role: 'cancel',
              handler: () => { }
            },
            {
              text: 'yes',
              handler: () => {
                this.sqliteProvider
                  .removeotherExpencesDetails(i.oexid)
                  .then(data => {
                    this.getOtherDetail();
                    const control = <FormArray>(
                      this.expences.controls.otherexpences
                    );
                    control.removeAt(i.i);
                  })
                  .catch(err => { });
              }
            }
          ]
        });
        await alertq.present();
        this.otherexptot();
      } else {
        const control = <FormArray>this.expences.controls.otherexpences;
        control.removeAt(i.i);
        this.otherexptot();
      }
    }
  }

  /*   checkotherincomeexists(incometype) {
    var a = this.income.controls.otherincomes.value.find(
      item => item.iname == incometype
    );
    //console.log(a);
  } */

  checkExists(val, i) {
    //console.log(val);
    var a = this.income.controls.otherincomes.value.find(
      item => item.iname == val
    );
    //console.log(a);
    if (a !== undefined) {
      if (a.iname == val) {
        this.showAlert('Alert', 'Other Income type is Already Selected.');
        const control = <FormArray>this.income.controls.otherincomes;
        control.removeAt(i.i);
      }
    }
  }

  showSave() {
    this.edit_emi = !this.edit_emi;
  }

  checkLoanSaveValues(loanDetails) {
    var mclr;
    if (loanDetails.mclr == '' || loanDetails.mclr == undefined) {
      mclr = '';
    } else {
      mclr = loanDetails.mclr;
    }
    if (this.refId) {
      if (this.lrefId) {
        /* Added New Field : Interest Type */

        //this.sqliteProvider.updateloanDetails(this.refId, loanDetails.product, loanDetails.amount, loanDetails.tenure, loanDetails.moratorium, loanDetails.rio, loanDetails.cost, this.loanid, loanDetails.interesttype, loanDetails.priority, mclr, loanDetails.loanpurpose).then(data => {
        this.sqliteProvider.updateloanDetails(this.refId, loanDetails, this.loanid).then(data => {
          this.showAlert('Alert!', 'Loan Details Successfully Updated!');
          this.global.setLoanProduct(loanDetails.product);
          this.sqliteProvider.deleteotherdocproof(loanDetails.product);
          this.getOtherDetail();
          this.loantik = true;
          this.complete();
        })
          .catch(Error => {
            this.showAlert('Alert!', 'Failed!');
          });
        this.slider.slideTo(2);
      } else {
        /* Added New Field : Interest Type */

        // this.sqliteProvider.addLoanDetails(this.refId, this.id, loanDetails.product, loanDetails.amount, loanDetails.tenure, loanDetails.moratorium, loanDetails.rio, loanDetails.cost, loanDetails.interesttype, loanDetails.priority, mclr, loanDetails.loanpurpose).then(data => {
        this.sqliteProvider
          .addLoanDetails(this.refId, loanDetails, this.id)
          .then(data => {
            this.loanid = data.insertId;
            this.lrefId = this.refId;
            this.global.setLoanProduct(loanDetails.product);
            this.sqliteProvider.deleteotherdocproof(loanDetails.product);
            this.getOtherDetail();
            this.showAlert('Alert!', 'Loan Details Successfully Added!');
            this.loantik = true;
            this.complete();
          })
          .catch(Error => {
            this.showAlert('Alert!', 'Failed!');
          });
        this.slider.slideTo(2);
      }
    } else {
      this.showAlert('Alert!', 'Please Save Personal Details First..');
      this.slider.slideTo(0);
    }
  }

  incomesave(income) {
    if (this.refId) {
      if (this.irefId) {
        this.sqliteProvider.updateincomeDetails(this.refId, income.category, income.incometype, income.grossincome, income.statutory, income.other, income.netincome, this.incomeyesno, income.empName, income.doj, income.eosb, income.lengthService, this.id)
          .then(data => {
            this.otherincomearray = this.income.controls.otherincomes.value;
            for (var i = 0; i < this.otherincomearray.length; i++) {
              this.sqliteProvider.updateOtherincomeDetails(this.refId, this.id, this.otherincomearray[i].iname, this.otherincomearray[i].iotamount, this.otherincomearray[i].otherincomeid)
                .then(data => {
                  this.pushToArray();
                });
            }
            this.showAlert('Alert!', 'Income Details Successfully Updated!');
            this.incometik = true;
            this.complete();
          })
          .catch(Error => {
            this.showAlert('Alert!', 'Failed!');
          });
        this.type_income = 'expense';
        this.onChangeType();
        this.complete();
      } else {
        this.sqliteProvider.addIncomeDetails(this.refId, this.id, income.category, income.incometype, income.grossincome, income.statutory, income.other, income.netincome, this.incomeyesno, income.empName, income.doj, income.eosb, income.lengthService, this.usertype)
          .then(data => {
            this.incomeid = data.insertId;
            this.irefId = this.refId;

            this.otherincomearray = this.income.controls.otherincomes.value;
            for (var i = 0; i < this.otherincomearray.length; i++) {
              this.sqliteProvider.addOtherincomeDetails(this.refId, this.id, this.otherincomearray[i].iname, this.otherincomearray[i].iotamount)
                .then(data => {
                  this.pushToArray();
                });
            }
            this.showAlert('Alert!', 'Income Details Successfully Added!');
            this.incometik = true;
            this.complete();
          })
          .catch(Error => {
            this.showAlert('Alert!', 'Failed!');
          });

        this.type_income = 'expense';
        this.onChangeType();
        this.complete();
      }
    } else {
      this.showAlert('Alert!', 'Please Save Personal Details First..');
      this.slider.slideTo(0);
    }
  }

  // checkLoanSaveValues(value){
  //   console.log(value,"loanDetails")
  //   this.sqliteProvider.addLoanDetails(this.refId,value);
  //   this.showAlert("Alert", "Loan Detail values are saved successfully ");
  // }

  // kycPanDetails(value){
  //   console.log(value,"kycdetails")
  //   this.sqliteProvider.addPANDetails(this.refId, value.id, value.pancard, value.aadhaar);
  // }

  kycPanDetails(panAadhar) {
    if (this.refId) {
      // this.sqliteProvider.checkidProof(this.refId, this.id).then(id => {
      // if (id.length > 0) {
      //   this.showAlert("Alert!", "Please add Id Proof Document Images!");
      // } else {

      // this.sqliteProvider.CheckPanImg(this.refId, this.id).then(data => {

      // let panimglength = data;
      // if (panimglength > 0) {
      // this.sqliteProvider.CheckAadharImg(this.refId, this.id).then(data => {
      //   let addahrimglength = data;
      //   if (addahrimglength > 0) {
      if (this.panId) {
        this.sqliteProvider.updatePANDetails(this.refId, panAadhar.pancard, panAadhar.aadhaar, this.id)
          .then(data => {
            this.getPANDetail();
            this.showAlert('Alert!', 'KYC Details Successfully Updated!');
            this.kyctik = true;
            this.complete();
          })
          .catch(Error => {
            this.showAlert('Alert!', 'Failed!');
          });
        if (this.usertype === 'A') {
          this.slider.slideTo(3);
        } else {
          this.slider.slideTo(2);
        }
      } else {
        this.sqliteProvider.addPANDetails(this.refId, this.id, panAadhar.pancard, panAadhar.aadhaar)
          .then(data => {
            this.panId = data.insertId;
            this.getPANDetail();
            this.showAlert('Alert!', 'KYC Details Successfully Added!');
            this.kyctik = true;
            this.complete();
          })
          .catch(Error => {
            this.showAlert('Alert!', 'Failed!');
          });
        if (this.usertype === 'A') {
          this.slider.slideTo(3);
        } else {
          this.slider.slideTo(2);
        }
      }

      // }
      // else {
      //   this.showAlert("Alert!", "Please Add Aadhar Document.");
      // }
      // }).catch(error => {

      // })
      // }
      // else {
      //   this.showAlert("Alert!", "Please Add PAN Document.");
      // }
      // }).catch(error => {
      // })
      // }
      // })
    } else {
      this.showAlert('Alert!', 'Please Save Personal Details First..');
      this.slider.slideTo(0);
    }
  }
  pagetoView() {
    if (this.usertype === 'A') {
      if (this.global.getApplicationSubStatus() == 'Y') {
        this.showAlert('Alert', 'Applicant Already Submitted')
      }
      else {
        this.showAlert('Alert', 'Applicant Values are saved Successfully');
      }
    } else if (this.usertype === 'C') {
      if (this.global.getApplicationSubStatus() == 'Y') {
        this.showAlert('Alert', 'CoApplicant Already Submitted');
      }
      else {
        this.showAlert('Alert', 'Co-Applicant Values are saved Successfully');
      }
    } else if (this.usertype === 'G') {
      if (this.global.getApplicationSubStatus() == 'Y') {
        this.showAlert('Alert', 'Guarantor Already Submitted');
      }
      else {
        this.showAlert('Alert', 'Guarantor Values are saved Successfully');
      }
    }

    this.router.navigate(['home']);
  }



  async loadingPresent(msg) {
    this.loading = await this.loadingCtrl.create({
      message: msg,
    });
    await this.loading.present();
  }

  // public async finalsubmit(refId, id) {

  //   this.loadingPresent('Please Wait...');

  //   this.finalSubmitCustomerDetail = {
  //     apptype: '',
  //     customerid: '',
  //     title: '',
  //     firstname: '',
  //     middlename: '',
  //     lastname: '',
  //     gender: '',
  //     dob: '',
  //     mobileno: '',
  //     email: '',
  //     companyname: '',
  //     custcategeory: '',
  //     nationality: '',
  //     STLCustomer: '',
  //     customertype: '',
  //     bankingwith: '',
  //     VIPflag: '',
  //     incomeassignment: '',
  //     CBRBresult: '',
  //     creditbureau: '',
  //     accountno: '',
  //     passportno: '',
  //     EIDAno: '',
  //     RIMno: '',
  //     POBoxno: '',
  //     employmentcategory: '',
  //     employername: '',
  //     dateofjoin: '',
  //     esob: '',
  //     lengthinservice: '',
  //     incometype: '',
  //     netincome: '',
  //     address: '',
  //     udf1: '',
  //     udf2: '',
  //     udf3: '',
  //     udf4: ''
  //   };
  //   this.finalSubmitData = {
  //     customerdetails: [],
  //     loandetails: {
  //       product: '',
  //       amountreq: '',
  //       interesttype: '',
  //       installment: '',
  //       moratorium: '',
  //       repaymenttype: '',
  //       proposaltype: '',
  //       amortizationchart: '',
  //       modeofrepayment: ''
  //     }
  //   };
  //   await this.sqliteProvider.getSubmittedDetails(refId, id).then(data => {
  //       console.log('Applicant ASUbmittee', JSON.stringify(data));

  //       this.finalSubmitCustomerDetail.apptype = data[0].userType;
  //       this.finalSubmitCustomerDetail.customerid = data[0].refId;
  //       this.finalSubmitCustomerDetail.title = data[0].title;
  //       this.finalSubmitCustomerDetail.firstname = data[0].firstName;
  //       this.finalSubmitCustomerDetail.middlename = data[0].middleName;
  //       this.finalSubmitCustomerDetail.lastname = data[0].lastName;
  //       this.finalSubmitCustomerDetail.gender = data[0].gender;
  //       this.finalSubmitCustomerDetail.dob =data[0].dob.substring(8) +'/' +data[0].dob.substring(5, 7) +'/' +data[0].dob.substring(0, 4);
  //       this.finalSubmitCustomerDetail.mobileno = data[0].phone;
  //       this.finalSubmitCustomerDetail.email = data[0].email;
  //       this.finalSubmitCustomerDetail.companyname = data[0].company;
  //       this.finalSubmitCustomerDetail.custcategeory = data[0].custCategory;
  //       this.finalSubmitCustomerDetail.nationality = data[0].nationality;
  //       this.finalSubmitCustomerDetail.STLCustomer = data[0].stlCust;
  //       this.finalSubmitCustomerDetail.customertype = data[0].CustType;
  //       this.finalSubmitCustomerDetail.bankingwith = data[0].bankingWith;
  //       this.finalSubmitCustomerDetail.VIPflag = data[0].vipFlag;
  //       this.finalSubmitCustomerDetail.incomeassignment = data[0].incomeAssg;
  //       this.finalSubmitCustomerDetail.CBRBresult = data[0].cbrbRes;
  //       this.finalSubmitCustomerDetail.creditbureau = data[0].alEthiadBureau;
  //       this.finalSubmitCustomerDetail.accountno = data[0].accNo;
  //       this.finalSubmitCustomerDetail.passportno = data[0].passportNo;
  //       this.finalSubmitCustomerDetail.EIDAno = data[0].eidaNo;
  //       this.finalSubmitCustomerDetail.RIMno = data[0].rimNo;
  //       this.finalSubmitCustomerDetail.POBoxno = data[0].poBoxNo;
  //       this.finalSubmitCustomerDetail.employmentcategory =data[0].category || '';
  //       this.finalSubmitCustomerDetail.employername = data[0].employname || '';
  //       this.finalSubmitCustomerDetail.dateofjoin="";
  //       //this.finalSubmitCustomerDetail.dateofjoin =data[0].doj.substring(8) +'/' +data[0].doj.substring(5, 7) +'/' +data[0].doj.substring(0, 4) ||'';
  //       this.finalSubmitCustomerDetail.esob = data[0].esob || '';
  //       this.finalSubmitCustomerDetail.lengthinservice =data[0].lengthinservice || '';
  //       this.finalSubmitCustomerDetail.incometype = data[0].incometype || '';
  //       this.finalSubmitCustomerDetail.netincome = data[0].netincome || 100;
  //       this.finalSubmitCustomerDetail.address = data[0].address;
  //       this.finalSubmitCustomerDetail.udf1 = '';
  //       this.finalSubmitCustomerDetail.udf2 = '';
  //       this.finalSubmitCustomerDetail.udf3 = '';
  //       this.finalSubmitCustomerDetail.udf4 = '';

  //       this.finalSubmitData.loandetails.product = data[0].product;
  //       this.finalSubmitData.loandetails.amountreq = data[0].amount;
  //       this.finalSubmitData.loandetails.interesttype = data[0].interesttype;
  //       this.finalSubmitData.loandetails.installment = data[0].tenure;
  //       this.finalSubmitData.loandetails.moratorium = data[0].moratorium;
  //       this.finalSubmitData.loandetails.repaymenttype =data[0].repaymentType;
  //       this.finalSubmitData.loandetails.proposaltype = data[0].proposalType;
  //       this.finalSubmitData.loandetails.amortizationchart =data[0].amortization;
  //       this.finalSubmitData.loandetails.modeofrepayment =data[0].repaymentMode;

  //       if (this.finalSubmitCustomerDetail.apptype == 'A') {

  //         this.finalSubmitData.customerdetails.push(this.finalSubmitCustomerDetail);

  //         this.coApplicantfinalSubmit(refId, id);

  //       }
  //     });


  //   console.log(this.finalSubmitData, 'Final.69887');

  //   this.service.testapi(this.finalSubmitData).then(
  //     result => {

  //       let res = JSON.parse((<any>result).data);

  //       this.loading.dismiss();

  //       if (res.status == 'Success') {
  //         this.global.globalLodingPresent('Your Application has been submitted. Your Reference Number is ' +res.LAPSAppno);
  //         let status = 'Y';
  //         this.AppReferenceNo = res.LAPSAppno;
  //         this.sqliteProvider.UpdateApplicationStatus(this.AppReferenceNo,status,this.global.getSystemDate(),refId,this.finalSubmitData);
  //         this.global.setApplicationSubStatus('Y');
  //         this.disableScope = 'true';

  //         setTimeout(() => {
  //           this.global.globalLodingDismiss();
  //           this.router.navigate(['/home']);
  //         }, 2000);
  //       }
  //       else if(res.status == "Failure"){
  //         //this.global.globalAlert('Alert','Request Failed due to Server Error. Try Later');
  //       }

  //       else {
  //         this.global.globalAlert('Alert',`Request could not be processed. The request may succeed if you try again.`);
  //       }
  //     },
  //     err => { 
  //       this.loading.dismiss();    
  //       this.global.globalAlert('Alert',`Request could not be processed due to a server error. The request may succeed if you try again.`);        
  //     }
  //   );

  // }

  public async finalsubmit(refId, id) {
    await this.sqliteProvider.searchByRefId(refId).then(async data => {
      console.log('data before submit', data, refId);
      this.finalSubmitCustomerDetail = {
        apptype: '',
        customerid: '',
        title: '',
        firstname: '',
        middlename: '',
        lastname: '',
        gender: '',
        dob: '',
        mobileno: '',
        email: '',
        companyname: '',
        custcategeory: '',
        nationality: '',
        STLCustomer: '',
        customertype: '',
        bankingwith: '',
        VIPflag: '',
        incomeassignment: '',
        CBRBresult: '',
        creditbureau: '',
        accountno: '',
        passportno: '',
        EIDAno: '',
        RIMno: '',
        POBoxno: '',
        employmentcategory: '',
        employername: '',
        dateofjoin: '',
        esob: '',
        lengthinservice: '',
        incometype: '',
        netincome: '',
        address: '',
        udf1: '',
        udf2: '',
        udf3: '',
        udf4: ''
      };
      this.finalSubmitData = {
        customerdetails: [],
        loandetails: {
          product: '',
          amountreq: '',
          interesttype: '',
          installment: '',
          moratorium: '',
          repaymenttype: '',
          proposaltype: '',
          amortizationchart: '',
          modeofrepayment: ''
        }
      };
      let applicantIndex = data.findIndex(i => i.userType);
      console.log(applicantIndex, 'appIndex');
      let applicant = data.find(i => i.userType == 'A');
      let coApplicant = data.find(i => i.userType == 'C');
      let guarantor = data.find(i => i.userType == 'G');
      console.log(Object.keys(applicant));

      //Loan Details

      await this.sqliteProvider
        .getLoanValue(applicant.refId, applicant.id)
        .then(data => {
          this.finalSubmitData.loandetails.product = data[0].product;
          this.finalSubmitData.loandetails.amountreq = data[0].amount;
          this.finalSubmitData.loandetails.interesttype = data[0].interesttype;
          this.finalSubmitData.loandetails.installment = data[0].tenure;
          this.finalSubmitData.loandetails.moratorium = data[0].moratorium;
          this.finalSubmitData.loandetails.repaymenttype =
            data[0].repaymentType;
          this.finalSubmitData.loandetails.proposaltype = data[0].proposalType;
          this.finalSubmitData.loandetails.amortizationchart =
            data[0].amortization;
          this.finalSubmitData.loandetails.modeofrepayment =
            data[0].repaymentMode;
        });


      //assigning applicant

      this.finalSubmitCustomerDetail.apptype = applicant.userType;
      this.finalSubmitCustomerDetail.customerid = applicant.refId;
      this.finalSubmitCustomerDetail.title = applicant.title;
      this.finalSubmitCustomerDetail.firstname = applicant.firstName;
      this.finalSubmitCustomerDetail.middlename = applicant.middleName;
      this.finalSubmitCustomerDetail.lastname = applicant.lastName;
      this.finalSubmitCustomerDetail.gender = applicant.gender;
      this.finalSubmitCustomerDetail.dob =
        applicant.dob.substring(8) +
        '/' +
        data[0].dob.substring(5, 7) +
        '/' +
        data[0].dob.substring(0, 4);
      this.finalSubmitCustomerDetail.mobileno = applicant.phone;
      this.finalSubmitCustomerDetail.email = applicant.email;
      this.finalSubmitCustomerDetail.companyname = applicant.company;
      this.finalSubmitCustomerDetail.custcategeory = applicant.custCategory;
      this.finalSubmitCustomerDetail.nationality = applicant.nationality;
      this.finalSubmitCustomerDetail.STLCustomer = applicant.stlCust;
      this.finalSubmitCustomerDetail.customertype = applicant.CustType;
      this.finalSubmitCustomerDetail.bankingwith = applicant.bankingWith;
      this.finalSubmitCustomerDetail.VIPflag = applicant.vipFlag;
      this.finalSubmitCustomerDetail.incomeassignment = applicant.incomeAssg;
      this.finalSubmitCustomerDetail.CBRBresult = applicant.cbrbRes;
      this.finalSubmitCustomerDetail.creditbureau = applicant.alEthiadBureau;
      this.finalSubmitCustomerDetail.accountno = applicant.accNo;
      this.finalSubmitCustomerDetail.passportno = applicant.passportNo;
      this.finalSubmitCustomerDetail.EIDAno = applicant.eidaNo;
      this.finalSubmitCustomerDetail.RIMno = applicant.rimNo;
      this.finalSubmitCustomerDetail.POBoxno = applicant.poBoxNo;
      this.finalSubmitCustomerDetail.employmentcategory =
        applicant.category || '';
      this.finalSubmitCustomerDetail.employername = applicant.employname || '';
      this.finalSubmitCustomerDetail.dateofjoin = '';
      // this.finalSubmitCustomerDetail.dateofjoin=data[0].data[0].doj.substring(8) + "/" + data[0].doj.substring(5, 7) + "/" + data[0].doj.substring(0, 4);
      this.finalSubmitCustomerDetail.esob = applicant.esob || '';
      this.finalSubmitCustomerDetail.lengthinservice =
        applicant.lengthinservice || '';
      this.finalSubmitCustomerDetail.incometype = applicant.incometype || '';
      this.finalSubmitCustomerDetail.netincome = applicant.netincome || 100;
      this.finalSubmitCustomerDetail.address = applicant.address;
      this.finalSubmitCustomerDetail.udf1 = '';
      this.finalSubmitCustomerDetail.udf2 = '';
      this.finalSubmitCustomerDetail.udf3 = '';
      this.finalSubmitCustomerDetail.udf4 = '';

      this.finalSubmitData.customerdetails.push(this.finalSubmitCustomerDetail);
      this.finalSubmitCustomerDetail = {
        apptype: '',
        customerid: '',
        title: '',
        firstname: '',
        middlename: '',
        lastname: '',
        gender: '',
        dob: '',
        mobileno: '',
        email: '',
        companyname: '',
        custcategeory: '',
        nationality: '',
        STLCustomer: '',
        customertype: '',
        bankingwith: '',
        VIPflag: '',
        incomeassignment: '',
        CBRBresult: '',
        creditbureau: '',
        accountno: '',
        passportno: '',
        EIDAno: '',
        RIMno: '',
        POBoxno: '',
        employmentcategory: '',
        employername: '',
        dateofjoin: '',
        esob: '',
        lengthinservice: '',
        incometype: '',
        netincome: '',
        address: '',
        udf1: '',
        udf2: '',
        udf3: '',
        udf4: ''
      };

      //coapplicant
      this.finalSubmitCustomerDetail.apptype = coApplicant.userType;
      this.finalSubmitCustomerDetail.customerid = coApplicant.refId;
      this.finalSubmitCustomerDetail.title = coApplicant.title;
      this.finalSubmitCustomerDetail.firstname = coApplicant.firstName;
      this.finalSubmitCustomerDetail.middlename = coApplicant.middleName;
      this.finalSubmitCustomerDetail.lastname = coApplicant.lastName;
      this.finalSubmitCustomerDetail.gender = coApplicant.gender;
      this.finalSubmitCustomerDetail.dob =
        applicant.dob.substring(8) +
        '/' +
        data[0].dob.substring(5, 7) +
        '/' +
        data[0].dob.substring(0, 4);
      this.finalSubmitCustomerDetail.mobileno = coApplicant.phone;
      this.finalSubmitCustomerDetail.email = coApplicant.email;
      this.finalSubmitCustomerDetail.companyname = coApplicant.company;
      this.finalSubmitCustomerDetail.custcategeory = coApplicant.custCategory;
      this.finalSubmitCustomerDetail.nationality = coApplicant.nationality;
      this.finalSubmitCustomerDetail.STLCustomer = coApplicant.stlCust;
      this.finalSubmitCustomerDetail.customertype = coApplicant.CustType;
      this.finalSubmitCustomerDetail.bankingwith = coApplicant.bankingWith;
      this.finalSubmitCustomerDetail.VIPflag = coApplicant.vipFlag;
      this.finalSubmitCustomerDetail.incomeassignment = coApplicant.incomeAssg;
      this.finalSubmitCustomerDetail.CBRBresult = coApplicant.cbrbRes;
      this.finalSubmitCustomerDetail.creditbureau = coApplicant.alEthiadBureau;
      this.finalSubmitCustomerDetail.accountno = coApplicant.accNo;
      this.finalSubmitCustomerDetail.passportno = coApplicant.passportNo;
      this.finalSubmitCustomerDetail.EIDAno = coApplicant.eidaNo;
      this.finalSubmitCustomerDetail.RIMno = coApplicant.rimNo;
      this.finalSubmitCustomerDetail.POBoxno = coApplicant.poBoxNo;
      this.finalSubmitCustomerDetail.employmentcategory =
        coApplicant.category || '';
      this.finalSubmitCustomerDetail.employername =
        coApplicant.employname || '';
      this.finalSubmitCustomerDetail.dateofjoin = '';
      // this.finalSubmitCustomerDetail.dateofjoin=data[0].data[0].doj.substring(8) + "/" + data[0].doj.substring(5, 7) + "/" + data[0].doj.substring(0, 4);
      this.finalSubmitCustomerDetail.esob = coApplicant.esob || '';
      this.finalSubmitCustomerDetail.lengthinservice =
        coApplicant.lengthinservice || '';
      this.finalSubmitCustomerDetail.incometype = coApplicant.incometype || '';
      this.finalSubmitCustomerDetail.netincome = coApplicant.netincome || 100;
      this.finalSubmitCustomerDetail.address = coApplicant.address || '';
      this.finalSubmitCustomerDetail.udf1 = '';
      this.finalSubmitCustomerDetail.udf2 = '';
      this.finalSubmitCustomerDetail.udf3 = '';
      this.finalSubmitCustomerDetail.udf4 = '';

      this.finalSubmitData.customerdetails.push(this.finalSubmitCustomerDetail);
      this.finalSubmitCustomerDetail = {
        apptype: '',
        customerid: '',
        title: '',
        firstname: '',
        middlename: '',
        lastname: '',
        gender: '',
        dob: '',
        mobileno: '',
        email: '',
        companyname: '',
        custcategeory: '',
        nationality: '',
        STLCustomer: '',
        customertype: '',
        bankingwith: '',
        VIPflag: '',
        incomeassignment: '',
        CBRBresult: '',
        creditbureau: '',
        accountno: '',
        passportno: '',
        EIDAno: '',
        RIMno: '',
        POBoxno: '',
        employmentcategory: '',
        employername: '',
        dateofjoin: '',
        esob: '',
        lengthinservice: '',
        incometype: '',
        netincome: '',
        address: '',
        udf1: '',
        udf2: '',
        udf3: '',
        udf4: ''
      };

      //Guarantor
      this.finalSubmitCustomerDetail.apptype = guarantor.userType;
      this.finalSubmitCustomerDetail.customerid = guarantor.refId;
      this.finalSubmitCustomerDetail.title = guarantor.title;
      this.finalSubmitCustomerDetail.firstname = guarantor.firstName;
      this.finalSubmitCustomerDetail.middlename = guarantor.middleName;
      this.finalSubmitCustomerDetail.lastname = guarantor.lastName;
      this.finalSubmitCustomerDetail.gender = guarantor.gender;
      this.finalSubmitCustomerDetail.dob =
        guarantor.dob.substring(8) +
        '/' +
        data[0].dob.substring(5, 7) +
        '/' +
        data[0].dob.substring(0, 4);
      this.finalSubmitCustomerDetail.mobileno = guarantor.phone;
      this.finalSubmitCustomerDetail.email = guarantor.email;
      this.finalSubmitCustomerDetail.companyname = guarantor.company;
      this.finalSubmitCustomerDetail.custcategeory = guarantor.custCategory;
      this.finalSubmitCustomerDetail.nationality = guarantor.nationality;
      this.finalSubmitCustomerDetail.STLCustomer = guarantor.stlCust;
      this.finalSubmitCustomerDetail.customertype = guarantor.CustType;
      this.finalSubmitCustomerDetail.bankingwith = guarantor.bankingWith;
      this.finalSubmitCustomerDetail.VIPflag = guarantor.vipFlag;
      this.finalSubmitCustomerDetail.incomeassignment = guarantor.incomeAssg;
      this.finalSubmitCustomerDetail.CBRBresult = guarantor.cbrbRes;
      this.finalSubmitCustomerDetail.creditbureau = guarantor.alEthiadBureau;
      this.finalSubmitCustomerDetail.accountno = guarantor.accNo;
      this.finalSubmitCustomerDetail.passportno = guarantor.passportNo;
      this.finalSubmitCustomerDetail.EIDAno = guarantor.eidaNo;
      this.finalSubmitCustomerDetail.RIMno = guarantor.rimNo;
      this.finalSubmitCustomerDetail.POBoxno = guarantor.poBoxNo;
      this.finalSubmitCustomerDetail.employmentcategory =
        guarantor.category || '';
      this.finalSubmitCustomerDetail.employername = guarantor.employname || '';
      this.finalSubmitCustomerDetail.dateofjoin = '';
      // this.finalSubmitCustomerDetail.dateofjoin=data[0].data[0].doj.substring(8) + "/" + data[0].doj.substring(5, 7) + "/" + data[0].doj.substring(0, 4);
      this.finalSubmitCustomerDetail.esob = guarantor.esob || '';
      this.finalSubmitCustomerDetail.lengthinservice =
        guarantor.lengthinservice || '';
      this.finalSubmitCustomerDetail.incometype = guarantor.incometype || '';
      this.finalSubmitCustomerDetail.netincome = guarantor.netincome || 100;
      this.finalSubmitCustomerDetail.address = guarantor.address || '';
      this.finalSubmitCustomerDetail.udf1 = '';
      this.finalSubmitCustomerDetail.udf2 = '';
      this.finalSubmitCustomerDetail.udf3 = '';
      this.finalSubmitCustomerDetail.udf4 = '';

      this.finalSubmitData.customerdetails.push(this.finalSubmitCustomerDetail);


      this.sqliteProvider
        .getIncomeValue(coApplicant.refId, coApplicant.id)
        .then(data => {
          console.log(data, 'COapplicant income value');
          coApplicant.employmentcategory = data[0].category || '';
          coApplicant.employername = data[0].employname || '';
          coApplicant.dateofjoin = data[0].doj || '';
          coApplicant.esob = data[0].esob || '';
          coApplicant.lengthinservice = data[0].lengthinservice || '';
          coApplicant.incometype = data[0].incometype || '';
          coApplicant.netincome = data[0].netincome || 100;
        });

      this.sqliteProvider
        .getIncomeValue(guarantor.refId, guarantor.id)
        .then(data => {
          console.log(data, 'guarantor income value');
          guarantor.employmentcategory = data[0].category || '';
          guarantor.employername = data[0].employname || '';
          guarantor.dateofjoin = data[0].doj || '';
          guarantor.esob = data[0].esob || '';
          guarantor.lengthinservice = data[0].lengthinservice || '';
          guarantor.incometype = data[0].incometype || '';
          guarantor.netincome = data[0].netincome || 100;
        });

      this.sqliteProvider
        .getIncomeValue(applicant.refId, applicant.id)
        .then(data => {
          console.log(data, 'applicant income value');
          applicant.employmentcategory = data[0].category;
          applicant.employername = data[0].employname;
          applicant.dateofjoin = data[0].doj;
          applicant.esob = data[0].esob;
          applicant.lengthinservice = data[0].lengthinservice;
          applicant.incometype = data[0].incometype;
          applicant.netincome = data[0].netincome;
        });

      console.log(this.finalSubmitData, 'Final.69887');
    });
    this.service.testapi(this.finalSubmitData).then(
      result => {
        console.log(result, 'inside test api inside finalsubmit');
        let res = JSON.parse((<any>result).data);
        console.log(res);

        if (res.status == 'Success') {
          this.global.globalLodingPresent(
            'Your Application has been submitted. Your Reference Number is ' +
            res.LAPSAppno
          );
          let status = 'Y';
          this.AppReferenceNo = res.LAPSAppno;
          this.sqliteProvider.UpdateApplicationStatus(
            this.AppReferenceNo,
            status,
            this.global.getSystemDate(),
            refId,
            this.finalSubmitData
          );
          this.global.setApplicationSubStatus('Y');
          this.disableScope = 'true';

          setTimeout(() => {
            this.global.globalLodingDismiss();
            this.router.navigate(['/home']);
          }, 2000);
        } else {
          this.global.globalAlert(
            'Alert',
            `Request could not be processed due to a server error. The request may succeed if you try again.`
          );
          this.global.globalLodingDismiss();
        }

        console.log(result, 'final submit');
      },
      err => {
        this.global.globalAlert(
          'Alert',
          `Request could not be processed due to a server error. The request may succeed if you try again.`
        );
        this.global.globalLodingDismiss();
      }
    );

  }


  guarantorfinalSubmit(refId, id) {
    this.sqliteProvider.getGuSubmittedDetails(refId, id)
      .then(data => {
        console.log('Gu- Applicant ASUbmittee', JSON.stringify(data));


        this.finalSubmitCustomerDetail = {
          apptype: data[0].userType,
          customerid: data[0].refId,
          title: data[0].title,
          firstname: data[0].firstName,
          middlename: data[0].middleName,
          lastname: data[0].lastName,
          gender: data[0].gender,
          dob: data[0].dob.substring(8) + '/' + data[0].dob.substring(5, 7) + '/' + data[0].dob.substring(0, 4),
          mobileno: data[0].phone,
          email: data[0].email,
          companyname: data[0].company,
          custcategeory: data[0].custCategory,
          nationality: data[0].nationality,
          STLCustomer: data[0].stlCust,
          customertype: data[0].CustType,
          bankingwith: data[0].bankingWith,
          VIPflag: data[0].vipFlag,
          incomeassignment: data[0].incomeAssg,
          CBRBresult: data[0].cbrbRes,
          creditbureau: data[0].alEthiadBureau,
          accountno: data[0].accNo,
          passportno: data[0].passportNo,
          EIDAno: data[0].eidaNo,
          RIMno: data[0].rimNo,
          POBoxno: data[0].poBoxNo,
          employmentcategory: data[0].category || '',
          employername: data[0].employname || '',
          dateofjoin: "",
          //dateofjoin: data[0].doj.substring(8) + '/' + data[0].doj.substring(5, 7) + '/' + data[0].doj.substring(0, 4) || '',
          esob: data[0].esob || '',
          lengthinservice: data[0].lengthinservice || '',
          incometype: data[0].incometype || '',
          netincome: data[0].netincome || 100,
          address: data[0].address,
          udf1: '',
          udf2: '',
          udf3: '',
          udf4: '',
        };


        // this.finalSubmitCustomerDetail.dateofjoin=data[0].data[0].doj.substring(8) + "/" + data[0].doj.substring(5, 7) + "/" + data[0].doj.substring(0, 4);

        if (this.finalSubmitCustomerDetail.apptype == 'G') {
          this.finalSubmitData.customerdetails.push(this.finalSubmitCustomerDetail);
        }
      });
  }

  coApplicantfinalSubmit(refId, id) {
    this.sqliteProvider.getCoSubmittedDetails(refId, id).then(data => {
      console.log('Co-Applicant ASUbmittee', JSON.stringify(data));

      this.finalSubmitCustomerDetail = {
        apptype: data[0].userType,
        customerid: data[0].refId,
        title: data[0].title,
        firstname: data[0].firstName,
        middlename: data[0].middleName,
        lastname: data[0].lastName,
        gender: data[0].gender,
        dob: data[0].dob.substring(8) + '/' + data[0].dob.substring(5, 7) + '/' + data[0].dob.substring(0, 4),
        mobileno: data[0].phone,
        email: data[0].email,
        companyname: data[0].company,
        custcategeory: data[0].custCategory,
        nationality: data[0].nationality,
        STLCustomer: data[0].stlCust,
        customertype: data[0].CustType,
        bankingwith: data[0].bankingWith,
        VIPflag: data[0].vipFlag,
        incomeassignment: data[0].incomeAssg,
        CBRBresult: data[0].cbrbRes,
        creditbureau: data[0].alEthiadBureau,
        accountno: data[0].accNo,
        passportno: data[0].passportNo,
        EIDAno: data[0].eidaNo,
        RIMno: data[0].rimNo,
        POBoxno: data[0].poBoxNo,
        employmentcategory: data[0].category || '',
        employername: data[0].employname || '',
        dateofjoin: "",
        //dateofjoin: data[0].doj.substring(8) + '/' + data[0].doj.substring(5, 7) + '/' + data[0].doj.substring(0, 4) || '',
        esob: data[0].esob || '',
        lengthinservice: data[0].lengthinservice || '',
        incometype: data[0].incometype || '',
        netincome: data[0].netincome || 100,
        address: data[0].address,
        udf1: '',
        udf2: '',
        udf3: '',
        udf4: '',
      };




      if (this.finalSubmitCustomerDetail.apptype == 'C') {
        this.finalSubmitData.customerdetails.push(this.finalSubmitCustomerDetail);
      }

      this.guarantorfinalSubmit(refId, id);
    });

  }

  leftMenu() {
    console.log('object');
    // this.events.publish('left-menu', true);
  }

  getCreditvalue() {
    this.global.globalLodingPresent('Checking Credit Value...').then(_ => {
      this.global.globalLodingDismiss();
      this.personalDetails.get('alEthiadBureau').setValue('800');
    });
  }


  async ocr_scan() {

    this.ocr = true;

    await this.ocrApi.selectSource(this.addProof.get('kycDesc').value);

  /*  this.events.subscribe('panno', (pan_no, imgData) => {
      console.log(imgData, 'event call');
      // var d = new Date().getTime();
      // let kycimg = this.webview.convertFileSrc(imgData);
      // this.kycImgdata = kycimg.substring(0, kycimg.indexOf('cache/') + 6) + d + kycimg.substring(kycimg.lastIndexOf('.'));

      this.kycImgdata = this.webview.convertFileSrc(imgData);
      console.log("kyc data", this.kycImgdata);
      this.global.globalLodingPresent("Please Wait...").then(_ => {
        this.global.globalLodingDismiss();
        this.addProof.get('kycNum').setValue(pan_no);
      })
    });
*/
 /*   this.events.subscribe('aa_no', (aa_num, imgData) => {
      console.log("TCL: ocr_scan -> imgData", imgData)
      this.kycImgdata = this.webview.convertFileSrc(imgData);
      this.addProof.get('kycNum').setValue(aa_num);
    })

    this.events.subscribe('voter number', (voter_id, imgData) => {
      console.log("TCL: ocr_scan -> imgData", imgData)
      this.kycImgdata = this.webview.convertFileSrc(imgData);
      this.addProof.get('kycNum').setValue(voter_id);
    })


    this.events.subscribe('dl_number', (dl_no1, dl_no2, imgData) => {
      console.log("TCL: ocr_scan -> imgData", imgData)
      this.kycImgdata = this.webview.convertFileSrc(imgData);
      if (dl_no1) {
        this.addProof.get('kycNum').setValue(dl_no1);
      }
      else {
        this.addProof.get('kycNum').setValue(dl_no2);
      }
    })*/
  }

  proofChange($event) {
    this.addProof.get('kycNum').setValue("");
    this.addProof.get('kycNum').updateValueAndValidity();
    this.file.checkDir("", "");
  }
}
