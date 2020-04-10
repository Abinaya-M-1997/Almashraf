import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import {
  NavController,
  // Events,
  ModalController,
  LoadingController,
  IonItemSliding,
  AlertController,
  ToastController,
  Platform,
  ActionSheetController
} from '@ionic/angular';
import { Router, RouterState, NavigationEnd } from '@angular/router';
import { SqlliteProvider } from '../services/sqllite/sqllite';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { PopupModalPage } from '../popup-modal/popup-modal.page';
import { ViewalldetailsPage } from '../viewalldetails/viewalldetails.page';
//import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  firstName = '';
  users = [];
  count = 0;

  coApps: boolean = true;

  guApps: boolean = true;

  public nouserdata: boolean = true;
  public nosearchdata: boolean = false;
  refId = [];

  cousers = [];

  guusers = [];

  loanvalue = 'home';

  backButtonSubscription: any;

  userExpandHeight: '100%';
  public counter = 0;

  constructor(
    public sqliteProvider: SqlliteProvider,
    public navCtrl: NavController,
    // public events: Events,
    public modalCtrl: ModalController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public global: GlobalfunctionsProvider,
    public router: Router,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public file: File,
    public filePath: FilePath,
    public webView: WebView
  ) {
    /*  this.platform.registerBackButtonAction(() => {
      if (this.navCtrl.getActive().name == 'HomePage') {
        this.platform.exitApp();

          if (this.counter == 0) {
            this.counter++;
            this.presentToast();
            setTimeout(() => { this.counter = 0 }, 3000)
          } else {
            // console.log("exitapp");
            this.platform.exitApp();
          } 
      }
    }, 100); */

    this.platform.backButton.forEach(data => {
      data.register(1, () => {
        this.count++;
      });
      console.log(this.count, data, 'from home page 622');
    });
  }

  ngOnInit() {
    // this.events.publish('left-menu', true);
  }

  // ngOnInit() {
  //   console.log(this.router, "in home");
  //   const url = this.router.config[1].path;
  //   console.log(url, "from home page");
  //  }
  // ngAfterViewInit() {
  //   const url = this.router.config[1].path;
  //   console.log(url, "from home page");

  //   this.backButtonSubscription = this.platform.backButton.subscribe(() => {
  //     if(url==="home")
  //     {
  //       navigator['app'].exitApp();
  //     }
  //     else
  //     {
  //       this.platform.backButton.subscribe(() => {
  //         this.navCtrl.pop();
  //       });
  //     }
  //   });
  // }

  // ngOnDestroy() {
  //   console.log("home page destroyed");
  //   this.backButtonSubscription.unsubscribe();
  // }

  async presentContactModal(userimg) {
    let contactModal = await this.modalCtrl.create({
      component: PopupModalPage,
      componentProps: { img: userimg },
      backdropDismiss: true,
      showBackdrop: true
    });
    await contactModal.present();
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    /*  this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
    }); */
    this.platform.backButton.subscribe(() => {
      this.navCtrl.pop();
    });
  }
  ionViewDidEnter() {
    this.sqliteProvider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.leftDetail();
      }
    });
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Press again to exit',
      duration: 3000,
      position: 'bottom'
      // showCloseButton:true
    });
    await toast.present();
  }

  expandItem(user) {
    this.sqliteProvider
      .getcoappDetails(user.refId)
      .then(data => {
        this.cousers = [];
        //this.cousers[0] = this.havedata;
        this.cousers = data;
        console.log('length...........: ' + this.cousers.length);

        // if(this.cousers.length == 0){
        //   this.coApps = !this.coApps;
        // }

        if (this.cousers.length > 0) {
          //alert("false: "+ JSON.stringify(this.cousers.length));
          this.coApps = true;
        } else {
          // alert("true: "+ JSON.stringify(this.cousers.length));
          this.coApps = false;
        }

        console.log(this.cousers);
      })
      .catch(Error => {
        alert(Error);
        this.cousers = [];
      });
    this.sqliteProvider
      .getguappDetails(user.refId)
      .then(data => {
        this.guusers = [];
        this.guusers = data;
        if (this.guusers.length > 0) {
          //alert("false: "+ JSON.stringify(this.cousers.length));
          this.guApps = true;
        } else {
          // alert("true: "+ JSON.stringify(this.cousers.length));
          this.guApps = false;
        }
      })
      .catch(Error => {
        alert(Error);
        this.guusers = [];
      });

    this.users.map(listuser => {
      if (user == listuser) {
        listuser.expanded = !listuser.expanded;
      } else {
        listuser.expanded = false;
      }

      return listuser;
    });
  }

  coappdetails(user) {
    console.log(user, 'user value');
    // alert(JSON.stringify(user));
    this.router.navigate([
      '/user-details',
      { refvalue: user, skipLocationChange: true }
    ]);
    //this.navCtrl.push(UserDetailsPage, { refvalue: user });
    //NAVIGATE TO USERDETAILS PAGE USING ANGULAR ROUTER
  }

  async loadAllUserDetails() {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.sqliteProvider
      .getDetails()
      .then(data => {
        console.log(data);
        this.users = [];
        this.users = data;

        loading.dismiss();
        //alert(JSON.stringify(this.users));
      })
      .catch(Error => {
        console.log(Error);
        this.users = [];
      });
  }

  userpage() {
    this.global.setApplicationSubStatus('');
    this.global.setLoanProduct('');
    this.global.setDocumentList('');
    this.router.navigate(['check-dedupe']);
    //this.router.navigate(['/scan-type']);
    //this.router.navigate(['user-details', {usertype: "A",typetitle: "New Applicant"}]);
    // this.navCtrl.push(UserDetailsPage, { usertype: "A",typetitle: "New Applicant"});
    // this.navCtrl.push(ScanTypePage);//NAVIGATE PAGE USING ANGULAR ROUTER
  }
  viewpage(user) {
    if (user.app_submit_status == 'Y') {
      this.global.setApplicationSubStatus('Y');
    } else {
      this.global.setApplicationSubStatus('');
    }
    this.router.navigate(['/viewdetails', user]);

    //this.navCtrl.push(ViewdetailsPage, { userval: user });
    console.log(user, 'value of user in home ');
  }

  someThing(slidingItem: IonItemSliding) {
    slidingItem.close();
  }

  async removeUser(user) {
    // alert(JSON.stringify(user));
    // alert(JSON.stringify(user.id.id));
    if (user.app_submit_status == 'Y') {
      this.global.globalAlert(
        'Remove User',
        'Sorry!.Application Already Submited'
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
              console.log('cancelled');
              // this.navCtrl.push(HomePage);
              this.leftDetail();
            }
          },
          {
            text: 'yes',
            handler: () => {
              console.log('u r click yes');
              //  alert(user.refId);
              console.log(user.refId);
              this.sqliteProvider
                .removeDetails(user.refId)
                .then(data => {
                  console.log(data);
                  this.leftDetail();
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
        ]
      });
      await alertq.present();
    }
  }

  public hide: boolean = false; //Whatever you want to initialise it as

  // public searchitems : boolean = false;

  public serachClick() {
    this.hide = !this.hide;
    this.nosearchdata = true;
    //alert(this.users.length);
    if (this.users.length === 0) {
      this.nosearchdata = false;
    }
    //this.searchitems = !this.searchitems;
  }

  filterItems(ev: any) {
    this.sqliteProvider.leftjoinDetails().then(data => {
      console.log(data);
      // this.users = [];
      this.users = data;
      // loading.dismiss();
      //alert(JSON.stringify(this.users));
      // this.loadAllUserDetails();
      let val = ev.target.value;
      // console.log("Val data: " + val);
      // console.log("Val JSON data: " + JSON.stringify(val));
      // console.log(`1==>${JSON.stringify(val)}`);
      if (val && val.trim() !== '') {
        // console.log(`2==>${val.trim()}`);
        this.users = this.users.filter(function (user) {
          //console.log("user: " + JSON.stringify(user));
          //console.log("user len: " + user.length);
          // console.log(`3==>${JSON.stringify(user)}`);
          // console.log(`4==>${JSON.stringify(user)}`);
          return (
            user.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
            user.product.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
            user.amount.toLowerCase().indexOf(val.toLowerCase()) > -1
          );
          //return user.firstName.toLowerCase().includes(val.toLowerCase());
        });
      }
    })
      .catch(Error => {
        console.log(Error);
        this.users = [];
      });
  }

  async leftDetail() {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    await loading.present();
    this.sqliteProvider.leftjoinDetails().then(data => {
      console.log(data, 'from left join details');
      this.users = [];
      this.users = data;
      if (this.users.length > 0) {
        this.nouserdata = true;
      } else {
        this.nouserdata = false;
      }
      console.log('my---------------->' + this.users.length);
      this.hide = true;
      this.serachClick();
      this.nosearchdata = false;

      loading.dismiss();
      //alert("getedkycvalue====>"+ this.kycData[0].pannumber);
      //alert(JSON.stringify("getedleftjoinvalue====>"+data));
      // this.kyc = this.formBuilder.group({
      //   pancard: this.kycData[0].pannumber,
      //   aadhaar: this.kycData[0].aadharnumber
      // });
      // this.kycid = this.kycData[0].id
    })
      .catch(Error => {
        console.log(Error);
        this.users = [];
        loading.dismiss();
      });
  }

  //  doRefresh(refresher) {
  //   console.log('Begin async operation', refresher);

  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     let toast = this.toastCtrl.create({
  //       message: 'Appicatons Updated',
  //       duration: 3000,
  //       position: 'bottom'
  //     });

  //     toast.onDidDismiss(() => {
  //       console.log('Dismissed toast');
  //     });

  //     toast.present();
  //     refresher.complete();
  //   }, 2000);

  // }

  viewAllDetails(users) {
    this.router.navigate(['/viewalldetails', { alluserval: users, skipLocationChange: true }]);
    //this.navCtrl.push(ViewalldetailsPage, { alluserval: users });
    //console.log("users usersusers usersusers usersusers usersusers usersusers users" + users);
  }
  async onClick() {
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY, '');
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA, '');
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
  img: any;
  getPicture(sourceType: PictureSourceType, index) {
    console.log(this.camera.DestinationType.FILE_URI, 'Destination type uri', sourceType);
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then(async (imageData) => {

      console.log(this.file.applicationStorageDirectory);
      console.log('imagedata +', imageData);
      console.log(this.file.cacheDirectory, 'cache directory',
        this.webView.convertFileSrc('file:///data/user/0/io.ionic.almasraf/cache/.Pic.jpg'));
      console.log(this.webView.convertFileSrc(imageData), 'webview converted imagedata+++++++++++');


      this.filePath.resolveNativePath(imageData).then(val => {


        console.log(val, 'resolved imagedata');
        console.log(val.substring(val.length - 8), 'resolved imagedata substring');
        this.file.copyFile(val.substring(0, val.length - 8),
          val.substring(val.length - 8), this.file.applicationStorageDirectory + 'files/',
          `Doc${Date.now()}`).then(value => {

            console.log(value, 'copyfile resolve');
            console.log(this.webView.convertFileSrc(value.nativeURL), 'new img webview');

            this.sqliteProvider.addProofImgDetails("1", "1", "1", value.nativeURL).then(data => {
              console.log(data, "value of image");
              this.sqliteProvider.getProofImgDetail("1", "1").then(data => {
                console.log(data, "gettimg img details ");
                this.img = data;
              }).catch(err => err);
            }).catch(err => err)
          }).catch(err => err);


      }).catch(err => err)
    })
  }
}
