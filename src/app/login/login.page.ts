import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, Events, MenuController,NavController, AlertController } from '@ionic/angular';

import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { ServiceProvider } from '../services/service/service';
import { SqlliteProvider } from '../services/sqllite/sqllite';
import { Device } from '@ionic-native/device/ngx';
import { Network } from '@ionic-native/network/ngx';
import {} from 'rxjs/add/operator/map';

interface loginForm {
  uname: string;
  pwd: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  appVersion: any;

  residentInfo: any = [];
  martiallInfo: any = [];
  educationalInfo: any = [];
  religionInfo: any = [];
  interestInfo: any = [];
  relationInfo: any = [];
  employmentInfo: any = [];
  incomeInfo: any = [];
  genderInfo: any = [];
  titleInfo: any = [];
  fullCity: any;
  publicKey: any;
  logindetail: string = 'login';
  loginok: boolean = true;
  pin: boolean = false;
  newpin: boolean = false;
  public pina: string;
  public pinb: string;
  public mypin: any;
  public StaticData: any;

  login: loginForm = {
    uname: '',
    pwd: ''
  };
  public loginForm: any;
  public keydata: any;
  users = [];
  url:any;
  backButtonSubscription:any;

  constructor(
    public platform: Platform,
    public router: Router,
    public navCtrl: NavController,
    public LoginDbCall: SqlliteProvider,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public service: ServiceProvider,
    public global: GlobalfunctionsProvider,
    public network: Network,
    public events: Events,
    public device: Device
  ) {
    this.checkpin();
  }



  ngOnInit() {
   this.leftMenu();
  }
 ngAfterViewInit() {
 }

 ngOnDestroy() {
  
 }
  
  ionViewDidLeave()
  {
     this.events.publish('left-menu',true);
  }

  leftMenu() {
    console.log('object');
    this.events.publish('left-menu',false);
  }

  async showAlert(tittle, subtitle) {
    let alert = await this.alertCtrl.create({
      header: tittle,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await alert.present();
  }

  logindata1() {
    if (this.login.uname == '' || this.login.uname == undefined) {
      this.showAlert('Alert', 'Enter Your Username.');
    } else if (this.login.pwd == '' || this.login.pwd == undefined) {
      this.showAlert('Alert', 'Enter Your Password.');
    } else {
      this.loginok = false;
      this.pin = false;
      this.newpin = true;
    }
  }

  dologin1() {
    let pin = localStorage.getItem('pin');
    //let pin="4567";
    console.log(pin);
    if (pin === this.mypin.toString()) {
      this.router.navigate(['/home', { loginName: this.LoginDbCall.getName() }
      ]);
      // this.navCtrl.push(HomePage, {
      //   loginName: this.LoginDbCall.getName()
      // });
    } else {
      this.showAlert('Alert', ' please enter a valid pin.');
    }
  }
  setpin() {
    //console.log(this.pina.length);
    if (
      this.pina == '' ||
      (this.pina == undefined && this.pinb == '') ||
      this.pinb == undefined
    ) {
      this.showAlert('Alert', 'Please Fill Both Pin Field.');
    } else if (
      this.pina.toString().length != 4 &&
      this.pinb.toString().length != 4
    ) {
      this.showAlert('Alert', 'Plese Enter Your 4 Digit Pin.');
    } else if (this.pina === this.pinb) {
      localStorage.setItem('pin', this.pina);
      this.showAlert('Alert', ' Your Pin Set Successfully.');
      //this.mypin = localStorage.getItem('pin');
      this.loginok = false;
      this.pin = true;
      this.newpin = false;
    } else if (this.pina != this.pinb) {
      this.showAlert('Alert', " Your Pin Doesn't Match.");
    } else {
      console.log(Error);
    }
  }

  forgotpin() {
    localStorage.setItem('pin', '');
    this.checkpin();
  }
  checkpin() {
    let pin = localStorage.getItem('pin');
    if (pin === null || pin === undefined || pin === '') {
      this.loginok = true;
      this.pin = false;
      this.newpin = false;
    } else {
      this.loginok = false;
      this.pin = true;
      this.newpin = false;
    }
  }
}
