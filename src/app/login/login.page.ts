import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { SqlliteProvider } from '../services/sqllite/sqllite';

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

  loginok: boolean = true;
  pin: boolean = false;
  newpin: boolean = false;
  public pina: string;
  public pinb: string;
  public mypin: any;

  login: loginForm = {
    uname: '',
    pwd: ''
  };

  constructor(
    public router: Router,
    public LoginDbCall: SqlliteProvider,
    public global: GlobalfunctionsProvider
  ) {
  }

  ngOnInit() {
    this.checkpin();
  }

  logindata1() {
    if (!this.login.uname) {
      this.global.showAlert('Alert', 'Enter Your Username.');
    } else if (!this.login.pwd) {
      this.global.showAlert('Alert', 'Enter Your Password.');
    } else {
      this.loginok = false;
      this.pin = false;
      this.newpin = true;
    }
  }

  dologin1() {
    let pin = localStorage.getItem('pin');

    if (pin === this.mypin.toString()) {
      this.router.navigate(['/home']);
    } else {
      this.global.showAlert('Alert', ' please enter a valid pin.');
    }
  }

  setpin() {
    if (!this.pina || !this.pinb) {
      this.global.showAlert('Alert', 'Please Fill Both Pin Field.');

    } else if (this.pina.toString().length != 4 && this.pinb.toString().length != 4    ) {
      this.global.showAlert('Alert', 'Plese Enter Your 4 Digit Pin.');

    }  else if (Number(this.pina) != Number(this.pinb)) {
      this.global.showAlert('Alert', " Your Pin Doesn't Match.");

    } else if (Number(this.pina) === Number(this.pinb)) {
      localStorage.setItem('pin', this.pina);
      this.global.showAlert('Alert', ' Your Pin Set Successfully.');
      this.loginok = false;
      this.pin = true;
      this.newpin = false;
    }
  }

  forgotpin() {
    localStorage.setItem('pin', '');
    this.checkpin();
  }

  checkpin() {
    let pin = localStorage.getItem('pin');
    if (!pin) {
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
