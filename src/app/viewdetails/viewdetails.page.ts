import { Component, OnInit } from '@angular/core';
import {
  NavController,
  NavParams,
  // Events,
  MenuController,
  Platform,
  AlertController
} from '@ionic/angular';
import { SqlliteProvider } from '../services/sqllite/sqllite';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailsPage } from '../user-details/user-details.page';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.page.html',
  styleUrls: ['./viewdetails.page.scss']
})
export class ViewdetailsPage implements OnInit {
  uservalfromhome: any;
  appusers: any;
  userinfo: any;
  segmentvalue: any;
  users = [];
  gurantors = [];
  public typetitle: any;
  disableScope: any;
  viewdetail: string = 'coapplicant';
  arrUserType: any;

  constructor(
    public platform: Platform,
    // public events: Events,
    public menuCtrl: MenuController,
    public sqliteProvider: SqlliteProvider,
    public alertCtrl: AlertController,
    public global: GlobalfunctionsProvider,
    public route: ActivatedRoute,
    public router: Router,
    public userPage: UserDetailsPage
  ) {
    this.userinfo = this.route.snapshot.params;
    //this.events.publish('pageEvent', { refId: this.userinfo.refId });
  }

  ngOnInit() {


    // const eventDat:EventInit;

    window.dispatchEvent(new Event('left-menu'))
    // this.events.publish('left-menu', true);
    //this.events.publish('pageEvent', { refId: this.userinfo.refId });
    // this.userinfo = this.route.snapshot.params;
    console.log(this.userinfo, 'value in view page');
    if (this.userinfo.refId) {
      this.sqliteProvider.searchByRefId(this.userinfo.refId).then(data => {
        console.log(data, 'data in view');
        this.arrUserType = data.map(i => i.userType);
        console.log(
          'TCL: ViewdetailsPage -> ngOnInit -> data.map(i=>i.userType)',
          this.arrUserType
        );
      });
    }

    if (
      this.userinfo.product != 'No Product' &&
      this.userinfo.product != 'No Product'
    ) {
      this.getOtherdoclist(this.userinfo.product);
    }

    this.segmentvalue = 'C';
    this.typetitle = 'New Co-Applicant';
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.disableScope = 'true';
    } else {
      this.disableScope = 'false';
    }
  }

  getOtherdoclist(product) {
    //   let selectedpr = this.global.getFullProductList().find((f) => {
    //     console.log(f, "value of doc list");
    //     return f.lpdPrdDesc === product;
    //  });
    //   console.log(selectedpr);
    //    this.sqliteProvider.getAllDocumentListbyID(selectedpr.lpdProdNewId).then(prd_data => {
    //     if (prd_data.length > 0) {
    //       this.global.setDocumentList(prd_data);
    //     }
    //    })
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    //this.loadappDetails();
    this.loadcoDetails();
    this.loadguDetails();
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menuCtrl.enable(true);
  }

  async showAlert(tittle, subtitle) {
    let alert = await this.alertCtrl.create({
      header: tittle,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await alert.present();
  }

 
  userpage() {
    this.sqliteProvider.coapplicantcheck(this.userinfo.refId, this.segmentvalue)
      .then(data => {
        console.log('CG len Data: ' + JSON.stringify(data));
        //alert("CG len Data: " + JSON.stringify(data));
        let cglength = data;
        if (cglength < 4) {
          //this.navCtrl.push(UserDetailsPage,{typetitle: this.typetitle,usertype:this.segmentvalue,crefId:this.userinfo.refId,});
          this.router.navigate(['user-details',
              {
                typetitle: this.typetitle,
                usertype: this.segmentvalue,
                crefId: this.userinfo.refId,
                skipLocationChange: true
              }
          ]);
        } else {
          if (this.segmentvalue === 'C') {
            this.showAlert('Alert!', 'Co-Applicant Maximum Limit reached!');
          } else {
            this.showAlert('Alert!', 'Guarantor Maximum Limit reached!');
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  passdetails(userinfo) {
    //this.navCtrl.push(UserDetailsPage, { refvalue: userinfo ,usertype:"A",typetitle: "Applicant"});
    this.router.navigate(['user-details',
      {
        refvalue: JSON.stringify(userinfo),
        usertype: 'A',
        typetitle: 'Applicant',
        skipLocationChange: true
      }
    ]);
    console.log(userinfo, 'values of user info in view page');
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  loadcoDetails() {
    this.sqliteProvider
      .getcoappDetails(this.userinfo.refId)
      .then(data => {
        console.log(data);
        this.users = [];
        this.users = data;
        //alert(JSON.stringify(this.users));
      })
      .catch(Error => {
        console.log(Error);
        this.users = [];
      });
  }
  loadappDetails() {
    this.sqliteProvider
      .getappDetails(this.userinfo.refId)
      .then(data => {
        console.log(data, 'testing');

        this.appusers = data[0];
        //alert(JSON.stringify(this.users));
      })
      .catch(Error => {
        console.log(Error);
        this.users = [];
      });
  }
  loadguDetails() {
    this.sqliteProvider
      .getguappDetails(this.userinfo.refId)
      .then(data => {
        console.log(data);
        this.gurantors = [];
        this.gurantors = data;
        //alert(JSON.stringify(this.users));
      })
      .catch(Error => {
        console.log(Error);
        this.gurantors = [];
      });
  }

  coappdetails(user) {
    console.log(user);
    // alert(JSON.stringify(user));
    //this.navCtrl.push(UserDetailsPage, { refvalue: user,usertype:"C",typetitle: "Co-Applicant"});
    this.router.navigate([
      'user-details',
      {
        refvalue: JSON.stringify(user),
        usertype: 'C',
        typetitle: 'Co-Applicant',
        skipLocationChange: true
      }
    ]);
  }

  gurantordetails(gurantor) {
    console.log(gurantor);
    // alert(JSON.stringify(gurantor));
    //this.navCtrl.push(UserDetailsPage, { refvalue: gurantor,usertype:"G",typetitle: "Guarantor"});
    this.router.navigate([
      'user-details',
      {
        refvalue: JSON.stringify(gurantor),
        usertype: 'G',
        typetitle: 'Guarantor',
        skipLocationChange: true
      }
    ]);
  }
  selectCoApplicant() {
    this.segmentvalue = 'C';
    this.typetitle = 'New Co-Applicant';
  }
  selectQuarantor() {
    this.segmentvalue = 'G';
    this.typetitle = 'New Guarantor';
  }

  submitpage() {
    this.sqliteProvider
      .getApplicationSubmitStatus(this.userinfo.refId)
      .then(data => {
        if (data.length > 0) {
          if (data[0].app_submit_status == 'Y') {
            this.showAlert('Alert', 'Application already Submitted');
          } else {
            if (this.arrUserType.indexOf('C') >= 0 &&this.arrUserType.indexOf('G') >= 0)
             {
              console.log('value true C&G');
              this.alertfunction("Do you want to submit Application?");
              //this.events.publish('pageEvent', { refId: this.userinfo.refId, id:this.userinfo.id});
              //this.router.navigate(['submit', { refId: this.userinfo.refId, id:this.userinfo.id}]);

              /* this.sqliteProvider
                .getSubmittedDetails(this.userinfo.refId, this.userinfo.id)
                .then(data => {
                  console.log('Applicant ASUbmittee', JSON.stringify(data));
                });

              this.sqliteProvider
                .getCoSubmittedDetails(this.userinfo.refId, this.userinfo.id)
                .then(data => {
                  console.log('Co-Applicant ASUbmittee', JSON.stringify(data));
                });

              this.sqliteProvider
                .getGuSubmittedDetails(this.userinfo.refId, this.userinfo.id)
                .then(data => {
                  console.log('Gu- Applicant ASUbmittee', JSON.stringify(data));
                });
 */
              //this.userPage.finalsubmit(this.userinfo.refId);
            } else {
              this.showAlert('Alert', 'Must Create Co-Applicant And Guarantor');
            }
          }
        }
      });

    /*     this.sqliteProvider
      .getPendingFilledStatus(this.userinfo.refId)
      .then(data => {
        if (data.length > 0) {
          this.showAlert(
            'Alert!',
            'Application is Incomplete.Please Fill the Application!'
          );
        } else {
          //this.navCtrl.push(SubmitPage, { refvalue: this.userinfo});
          //need to add
        }
      }); */
    //this.sqliteProvider.deleteentry(this.userinfo.refId);
    /*  if(this.global.getApplicationSubStatus()=='Y'){
      this.showAlert("Alert", "Application is Already Submitted");
    }else{
    this.sqliteProvider.getPendingFilledStatus(this.userinfo.refId).then(data=>{
      if(data.length>0){
        this.showAlert("Alert!", "Application is Incomplete.Please Fill the Application!");
      }else{
        this.navCtrl.push(SubmitPage, { refvalue: this.userinfo});
      }
    })
    
  }   */
  }

  async alertfunction(msg) {
    let alert = await this.alertCtrl.create({
      header: 'Submit Confirmation',
      subHeader: msg,
      buttons: [
        {
          text: 'YES',
          role: 'destructive',
          handler: () => {
            // this.events.publish('pageEvent', { refId: this.userinfo.refId, id:this.userinfo.id});
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


  // someThing(coApplSwipe: ItemSliding) {
  //   coApplSwipe.close();
  // }

  async removeCoUser(user) {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.global.globalAlert('Remove User','Sorry! Application is already submitted');
    } else {
      //alert(JSON.stringify(user));
      // alert(JSON.stringify(user.id.id));

      let alertq = await this.alertCtrl.create({
        header: 'Delete?',
        subHeader: 'Do you want to delete?',
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            handler: () => {
              console.log('cancelled');
              this.loadcoDetails();
            }
          },
          {
            text: 'yes',
            handler: () => {
              console.log('u r click yes');
              this.sqliteProvider.removeCoAppDetails(user.refId, user.id).then(data => {
                  console.log(data);
                  this.loadcoDetails();
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

  async removeGuaUser(gurantor) {
    //alert(JSON.stringify(gurantor));
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.global.globalAlert('Remove User','Sorry! Application is already submitted');
    } else {
      // alert(JSON.stringify(user.id.id));
      let alertq = await this.alertCtrl.create({
        header: 'Delete?',
        subHeader: 'Do you want to delete?',
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            handler: () => {
              console.log('cancelled');
              this.loadguDetails();
            }
          },
          {
            text: 'yes',
            handler: () => {
              console.log('u r click yes');
              this.sqliteProvider.removeGuaDetails(gurantor.refId, gurantor.id).then(data => {
                  console.log(data);
                  this.loadguDetails();
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

  onPublish() {
    //this.events.publish('pageEvent', { type: true });
  }

  gohome() {
    this.router.navigate(['/home']);
  }

  finalPage()
  {
    this.sqliteProvider.getSubmittedDetails(this.userinfo.refId,this.userinfo.id).then( data =>
      {
        this.router.navigate(['submit',{submitPageValue:JSON.stringify(data)}]);
      }).catch(Err =>{
        this.global.showAlert("Alert","Server not connected. Try Later");
      })
  }
}
