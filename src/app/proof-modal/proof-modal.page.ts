import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NavController, ModalController, AlertController, IonSlides, Platform } from '@ionic/angular';
import { SqlliteProvider } from '../services/sqllite/sqllite';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-proof-modal',
  templateUrl: './proof-modal.page.html',
  styleUrls: ['./proof-modal.page.scss'],
})
export class ProofModalPage implements OnInit {

  @Input() proofImgVal: any;
  @Input() REFID: any;
  @Input() IDEN: any;
  @Input() imgData:any;

  Base64Img: any;

  @ViewChild('mySlides', { static: true }) slider: IonSlides;

  addProofDocs = [];
  docImg: boolean = false;
  proofdocinfo: any;
  refId: any;
  id: any;
  kycid: any;
  proofimgpath: any;
  proofImgData: any;
  public unregisterBackButtonAction: any;

  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    targetWidth: 500,
    targetHeight: 500,
    allowEdit: true
  }

  constructor(public navCtrl: NavController,
    public camera: Camera,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public sqliteProvider: SqlliteProvider,
    public platform: Platform,
    public global: GlobalfunctionsProvider,
    public file: File,
    public webview: WebView) {

  }

  ngOnInit() {
    // this.proofdocinfo = this.navParams.get('proofImgVal');
    /* this.proofdocinfo = this.proofImgVal;
     //this.refId = this.proofdocinfo.refId;
     this.id = this.proofdocinfo.id;
     this.kycid = this.proofdocinfo.kycid;
     console.log(this.proofdocinfo); */

     this.refId = this.REFID;
     this.id = this.IDEN;
     this.kycid = this.proofImgVal.kycid;

     console.log(this.refId, this.id, this.kycid, "from proof modal");

  }
  ngAfterViewInit() {
    this.getProofImg();
    console.log('ngAfterViewInit ProofModalPage');
  }

  ionViewDidLoad() {

    this.initializeBackButtonCustomHandler();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.backButton.subscribe(function (event) {
      console.log('Prevent Back Button Page Change');
    }); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  async showAlert(tittle, subtitle) {
    let alert = await this.alertCtrl.create({
      header: tittle,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await alert.present();
  }

  takeProofImg() {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert("Alert", "Application is Already Submitted. Can't add Images");
    } else {
      this.camera.getPicture(this.options).then((imageData) => {
        /*  this.Base64Img=imageData;
        this.proofimgpath = 'data:image/jpeg;base64,' +imageData;
        this.writeFile(this.proofimgpath,'Application-Documents'); */
        this.proofimgpath = this.webview.convertFileSrc(imageData);

        this.sqliteProvider.updatekycImg(this.refId, this.id, this.kycid,this.imgData).then(data =>
          {
            console.log(data, "from update");
            this.showAlert("Document Image", "Document Uploaded");
          }).catch(Error => {
            console.log("Failed!");
          });

/*         this.sqliteProvider.addProofImgDetails(this.refId, this.id, this.kycid, this.proofimgpath).then(data => {
          console.log(data);
          // this.sqliteProvider.updateProofImg(this.refId, this.id, this.kycid, 'Y').then(data => {
          this.docImg = true;
          this.getProofImg();
          this.showAlert("Document Image", "Document Uploaded");
          //})

        }).catch(Error => {
          console.log("Failed!");
        });
 */


      }, (err) => {
        this.showAlert("Document Image", "Document Not Uploaded");
      });
    }
  }

  public writeFile(base64Data, folderName) {
    let contentType = this.getContentType(base64Data);
    let Name = ((new Date().getTime()).toString()) + ".jpg";
    let DataBlob = this.base64toBlob(base64Data, contentType);
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    let filePath = this.file.externalApplicationStorageDirectory + "files/" + folderName;
    this.file.writeFile(filePath, Name, DataBlob, contentType).then((success) => {
      this.proofimgpath = this.file.externalApplicationStorageDirectory + "files/" + folderName + "/" + Name;
      console.log("File Writed Successfully", success);
      this.sqliteProvider.addProofImgDetails(this.refId, this.id, this.kycid, this.proofimgpath).then(data => {
        console.log(data);
        this.sqliteProvider.updateProofImg(this.refId, this.id, this.kycid, 'Y');
        this.docImg = true;
        this.getProofImg();
        this.showAlert("Document Image", "Document Uploaded");
      }).catch(Error => {
        console.log("Failed!");
      });
    }).catch((err) => {
      console.log("Error Occured While Writing File", err);
    })
  }
  //here is the method is used to get content type of an bas64 data  
  public getContentType(base64Data: any) {
    let block = base64Data.split(";");
    let contentType = block[0].split(":")[1];
    return contentType;
  }
  //here is the method is used to convert base64 data to blob data  
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

  getProofImg() {
    this.addProofDocs = [];
    console.log(this.refId, this.kycid, "checking kyc id");
    this.sqliteProvider.getkycDetails_proof(this.refId,this.id, this.kycid).then(data =>
      {
        console.log(data, "from proof model page");
        this.proofImgData=data;

        for (let i = 0; i < this.proofImgData.length; i++) {
          console.log(this.proofImgData[i].imgadd);
          this.addProofDocs.push({ "url": this.proofImgData[i].imgadd });
          this.docImg = true;
        }
        if (this.proofImgData.length === 0) {
          this.docImg = false;
        }
      })
 /*    this.sqliteProvider.getProofImgDetail(this.refId, this.kycid).then(data => {
      console.log(data, 'proofmodalgetimg');
      this.proofImgData = data;
      if(this.imgData)
      {
        this.proofImgData = this.imgData;
      }
      console.log(this.imgData, this.proofImgData, "from proof modal page");

      for (let i = 0; i < this.proofImgData.length; i++) {
        console.log(this.proofImgData[i].proofimgpath);
        this.addProofDocs.push({ "url": this.proofImgData[i].proofimgpath, "proofimgid": this.proofImgData[i].proofimgid });
        this.docImg = true;
      }
      if (this.proofImgData.length === 0) {
        this.docImg = false;
      }

    }); */
  }

  closeProofModal() {
    this.modalCtrl.dismiss();
  }

  //this function currently not in use
  openProofGallery() {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert("Alert", "Application is Already Submitted. Can't add Images");
    } else {
      const goptions: CameraOptions = {
        quality: 80,
        allowEdit: true,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        encodingType: this.camera.EncodingType.JPEG,
        destinationType: this.camera.DestinationType.FILE_URI,

      }

      this.camera.getPicture(goptions).then((imageData) => {
        /*  this.Base64Img=imageData;
          this.proofimgpath = 'data:image/jpeg;base64,' +imageData;
          this.writeFile(this.proofimgpath,'Application-Documents'); */
        this.proofimgpath = imageData;
        this.global.writefile(this.proofimgpath).then(data => {
          this.proofimgpath = (<any>data).nativeURL;
          this.sqliteProvider.addProofImgDetails(this.refId, this.id, this.kycid, this.proofimgpath).then(data => {
            console.log(data);
            this.sqliteProvider.updateProofImg(this.refId, this.id, this.kycid, 'Y');
            this.docImg = true;
            this.getProofImg();
            this.showAlert("Document Image", "Document Uploaded");
          }).catch(Error => {
            console.log("Failed!");
          });
        }, err => {
          this.showAlert("Document Image", "Document Not Uploaded");
        })
      }, (err) => {
        this.showAlert("Document Image", "Document Not Uploaded");
      });
    }
  }

  async proofImgRemove(addProofDoc) {
    let alertq = await this.alertCtrl.create({
      header: "Delete?",
      subHeader: "Do you want to delete?",
      buttons: [{
        text: 'NO',
        role: 'cancel',
        handler: () => {
          console.log("cancelled");
        }
      },
      {
        text: 'yes',
        handler: () => {
          console.log("u r click yes");
          //  alert(user.refId);
          if (this.global.getApplicationSubStatus() == 'Y') {
            this.showAlert("Alert", "Application is Already Submitted. Can't add Images");
          } else {
            //let slideend = this.slider.isEnd();
            let slideend = true;
            
            this.sqliteProvider.removeProofDetails(addProofDoc.proofimgid).then(data => {
              console.log(data);
              this.sqliteProvider.updateProofImg(this.refId, this.id, this.kycid, 'N');
              this.getProofImg();
              console.log('slideend  is', slideend);
              if (slideend) {
                this.slider.slideTo(0)
              }
            }).catch(err => {
              console.log(err);
            })
          }
        }
      }]
    })
    await alertq.present();
  }


}
