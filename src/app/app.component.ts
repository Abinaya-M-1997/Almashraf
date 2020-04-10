import { Component, NgZone, OnDestroy, OnInit, AfterViewInit } from '@angular/core';

import { Platform,  NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { GlobalfunctionsProvider } from './services/globalfunctions/globalfunctions';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  myDate = new Date();
  username: any;
  colorcode = '#3780ce';
  fname: any;
  side_menu = true;
  backButtonSubscription:any;
  url:any;

  constructor(
    private platform: Platform,
    private global: GlobalfunctionsProvider,
    private navCtrl: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public zone: NgZone,
    // public events: Events,
    public router: Router
  ) {
    this.initializeApp();
   /*  this.events.subscribe('left-menu', data => {
      this.side_menu = data;
    }); */
  }

  ngOnInit() {
     this.url = this.router.url;
    console.log(this.url, "from app component");
   }
  ngAfterViewInit() {
   

    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      if(this.url=="/home;loginName=undefined")
      {
        navigator['app'].exitApp();
      }
      else
      {
        this.platform.backButton.subscribe(() => {
          this.navCtrl.pop();
        });
      }
    });
  }

  ngOnDestroy() {
    console.log("home page destroyed");
    this.backButtonSubscription.unsubscribe();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString(this.colorcode);
      this.splashScreen.hide();
    });
  }

  menuOpened() {
    this.zone.run(() => {
      // this.fname = this.provider.getName();
      this.fname = localStorage.getItem('userName');
      // console.log(`timeout executed !!!`);
    });
    return this.myDate;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  homePage() {
    this.router.navigate(['/home']);
  }

  newAppl() {
    //this.nav.push(UserDetailsPage, { usertype: "A",typetitle: "New Applicant"});
    this.global.setApplicationSubStatus('');
    this.router.navigate([
      'user-details',
      { usertype: 'A', typetitle: 'New Applicant' }
    ]);
  }

  getmaster() {
    //this.nav.push('MasterUpdatePage');
    this.router.navigate(['master-update']);
  }
}
