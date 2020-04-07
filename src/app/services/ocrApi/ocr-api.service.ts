import { async } from '@angular/core/testing';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController, Events, LoadingController } from '@ionic/angular';
import { OCR, OCRSourceType, OCRResult } from '@ionic-native/ocr/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class OcrAPIService {

  selectedImage: any;
  proofSelected: string;
  imageText: any;
  alert: any
  index: any;

  constructor(public camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public ocr: OCR,
    public events: Events,
    public filePath: FilePath,
    public file: File,
    public alertController: AlertController,
    public webview: WebView
  ) {
    this.proofSelected = 'I_DL';
    this.index = 0;
  }

  getCall() {
    return "Hello";
  }

  async selectSource(value) {
    this.proofSelected = value;
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
            this.getPicture(this.camera.PictureSourceType.CAMERA, this.index++);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

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
      console.log('imagedata+++++++++++', imageData);
      console.log(this.file.cacheDirectory, 'cache directory', this.webview.convertFileSrc('file:///data/user/0/io.ionic.almasraf/cache/.Pic.jpg'));
      console.log(this.webview.convertFileSrc(imageData), 'webview converted imagedata+++++++++++');
      this.filePath.resolveNativePath(imageData).then(nativePath => {

        console.log(nativePath, "value of image path");
        this.selectedImage = nativePath;
        //this.selectedImage= (<any>window).Ionic.WebView.convertFileSrc(imagePath); 
        console.log(this.selectedImage, "from ocrAPI");
        this.recognizeImage().then(data => {
          if (this.proofSelected == 'Pan Card') {
            this.scan_id_pan(data);
          }
          else if (this.proofSelected == "Driving Licence") {
            this.scan_id_dl(data);
          }
          else if (this.proofSelected == "Aadhar Card") {
            this.scan_id_aadhar(data);
          }
          else if (this.proofSelected == "Voter ID") {
            this.scan_id_voter(data);
          }
        })
      })
    })
  }

  recognizeImage(): (Promise<any>) {
    return this.ocr.recText(OCRSourceType.NORMFILEURL, this.selectedImage)
      .then((res: OCRResult) => {
        this.imageText = JSON.stringify(res.blocks);
        console.log(JSON.stringify(res), "text value of image");
        return res;
      }).catch((error: any) => console.log(error, "OCR: Error in capturing image."));
  }

  async alertcont(subhead, msg) {
    this.alert = await this.alertController.create({
      header: 'Alert',
      subHeader: subhead,
      message: msg,
      buttons: ['OK']
    });
    await this.alert.present();
  }

  scan_id_pan(data) {

    var pan_array = data.blocks["blocktext"];

    if (pan_array.join(",").includes('Permanent Account Number')) {
      var pan_str = pan_array.join(",");

      //PAN Num:
      let pan_no = pan_str.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/);
      this.alertcont("", "PAN Card Scanned Successfully");
      this.events.publish('panno', pan_no, this.selectedImage);

    }
    else {
      this.alertcont("Didn't Scan Pan Card ", 'Kindly choose your Document Correctly.');
    }
  }

  scan_id_aadhar(data) {

    var aadhar_arr = data.lines["linetext"];

    if (aadhar_arr.join(",").toLowerCase().includes('government of india')) {
      var aadhar_string = aadhar_arr.join(",");

      //num
      var aa_rep_str = aadhar_string.replace(/\s/g, '');
      let aa_num = aa_rep_str.match(/[0-9]{4}[0-9]{4}[0-9]{4}/);
      this.alertcont("", "Aadhar Card Scanned Successfully");
      this.events.publish('aa_no', aa_num, this.selectedImage);
    }

    else {
      this.alertcont("Didn't Scan Aadhar Card", 'Kindly choose your Document Correctly');
    }

  }



  scan_id_dl(data) {
    var arr_dl = data.blocks["blocktext"];

    if (arr_dl.join(",").includes('Driving Licence')) {

      var aadhar_string = arr_dl.join(",");

      //to get LI NO:
      var fullstring = aadhar_string.replace(/ /g, '');
      let dl_no1 = fullstring.match(/[A-Z]{2}[0-9A-Z]{3}[0-9]{11}/);
      let dl_no2 = fullstring.match(/[A-Z]{2}[0-9]{2}[0-9]{11}/);

      var repstring = fullstring.replace(/O/g, '0');
      dl_no1 = repstring.match(/[A-Z]{2}[0-9A-Z]{3}[0-9]{11}/);
      dl_no2 = repstring.match(/[A-Z]{2}[0-9]{2}[0-9]{11}/);

      this.alertcont("", "Driving License Scanned Successfully");

      this.events.publish('dl_number', dl_no1, dl_no2, this.selectedImage);
    }

    else {
      this.alertcont("Didn't Scan Driving License", "Kindly choose your Document Correctly.");
    }

  }

  scan_id_voter(data) {
    var arr_voter = data.lines["linetext"];

    if (arr_voter.join(",").toLowerCase().includes("election commission")) {
      var voter_str = arr_voter.join(",");

      //to get voter id:
      let voter_id = voter_str.match(/[A-Z]{3}[0-9]{7}/);

      this.alertcont("", "Voter Id Scanned Successfully");

      this.events.publish('voter number', voter_id, this.selectedImage);
    }
    else {
      this.alertcont("Didn't Scan Voter Id ", "Kindly choose your Document Correctly.");
    }
  }


}
