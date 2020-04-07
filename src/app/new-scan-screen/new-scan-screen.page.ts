import { Component, OnInit } from '@angular/core';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
@Component({
  selector: 'app-new-scan-screen',
  templateUrl: './new-scan-screen.page.html',
  styleUrls: ['./new-scan-screen.page.scss']
})
export class NewScanScreenPage implements OnInit {
  text: string;
  showOCR: boolean;
  showNFC: boolean;
  appData: any;
  title: any;
  parameters: any;
  nfcHex: any;
  tech: any;
  alert: any;
  nfcStream: any;

  constructor(
    public platform: Platform,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public router: Router,
    public route: ActivatedRoute,
    private nfc: NFC,
    private ndef: Ndef
  ) {}

  ngOnInit() {
    console.log(this.platform.backButton);
    this.route.params.subscribe(params => {
      this.parameters = params;
      console.log(this.parameters);
    });
    this.appData = this.parameters.type;
    if (this.appData == 'OCR') {
      this.showOCR = true;
      this.showNFC = false;
      this.title = 'OCR';
    } else {
      this.showOCR = false;
      this.showNFC = true;
      this.title = 'NFC';
    }
    this.nfclistener();
  }
  ionViewDidLeave() {
    this.nfcStream.unsubscribe();
  }
  nfclistener() {
    // this._msgCalled = 0;
    this.nfc
      .enabled()
      .then(data => {
        console.log(data);
        console.log(JSON.stringify(this.ndef));
      })
      .catch(err => console.log(err));
    this.nfcStream = this.nfc
      .addTagDiscoveredListener(
        () => console.log('addtagDiscoveredListener'),
        err => console.log('error attaching tag listener', err)
      )
      .subscribe(
        event => {
          console.log(event);
          this.nfcHex = this.nfc.bytesToHexString(event.tag.id);
          let nfcTechArr = event.tag.techTypes;
          let nfcTech = nfcTechArr.map(i => i.replace('android.nfc.tech.', ''));
          this.alertModal(nfcTech, this.nfcHex);
        },
        () => console.log('nfc error'),
        () => console.log('nfc complete')
      );
    console.log(this.nfc.FLAG_READER);
  }

  async alertModal(sh, msg) {
    this.alert = await this.alertCtrl
      .create({
        header: 'NFC Tag',
        subHeader: sh,
        message: `HEX:${msg}`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: blah => {
              console.log('Confirm Cancel: blah');
            }
          },
          {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
              this.router.navigate(['/check-dedupe']);
            }
          }
        ]
      })
      .then(alertElement => {
        alertElement.present();
      });
    // this.alertCtrl.getTop().then(top => {
    //   console.log(top, 'inside getTop');
    //   this.alertCtrl.dismiss();
    // });
  }
  scanDocuments() {
    this.nfcStream.unsubscribe();
    this.nfclistener();
    // this.navCtrl.push(CheckDedupePage);
    //  if(this.nfcHex)
    //  {
    //   this.router.navigate(['/check-dedupe']);
    //  }
  }
  closeView() {
    this.router.navigate(['scan-type']);
  }
}
