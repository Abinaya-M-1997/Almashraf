import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  NavController,
  AlertController,
  ModalController,
  IonSlides,
  Platform
} from '@ionic/angular';
import { SqlliteProvider } from '../services/sqllite/sqllite';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { File } from '@ionic-native/file/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aadhar-modal',
  templateUrl: './aadhar-modal.page.html',
  styleUrls: ['./aadhar-modal.page.scss']
})
export class AadharModalPage implements OnInit {
  @Input() aadharImgVal: any;
  @Input() AREFID: any;
  @Input() AIDEN: any;

  Base64Img: any;
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  addAadharImgDocs = [];
  docAadharImg: boolean = false;
  aadhardocinfo: any;
  panId: any;
  refId: any;
  id: any;
  aadharImageName: any;
  aadharImgData: any;
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
  };

  constructor(
    public navCtrl: NavController,
    public camera: Camera,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public sqliteProvider: SqlliteProvider,
    public platform: Platform,
    public global: GlobalfunctionsProvider,
    public activateroute: ActivatedRoute,
    public webview: WebView,
    public file: File
  ) {
  }

  ngOnInit() {

    this.aadhardocinfo = this.aadharImgVal;
    this.refId = this.AREFID;
    this.id = this.AIDEN;
    this.panId = this.aadhardocinfo;
    console.log(this.AREFID, 'sfsadfkl');
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.getAadharImg();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.backButton.subscribe(
      function (event) {
        //  console.log('Prevent Back Button Page Change');
      }
    );
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  ionViewDidLoad() {
    //this.getAadharImg();
    //console.log('ionViewDidLoad ProofModalPage');
    this.initializeBackButtonCustomHandler();
  }

  async showAlert(tittle, subtitle) {
    let alert = await this.alertCtrl.create({
      header: tittle,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await alert.present();
  }

  takeAadharImg() {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert(
        'Alert',
        "Application is Already Submitted. Can't add Images"
      );
    } else {
      this.camera.getPicture(this.options).then(
        async imageData => {
          //this.Base64Img=imageData;
          //this.aadharImageName ='data:image/jpeg;base64,' +imageData;
          this.aadharImageName = await this.webview.convertFileSrc(imageData);

          this.sqliteProvider
            .addAadharImgDetails(
              this.refId,
              this.id,
              this.panId,
              this.aadharImageName
            )
            .then(data => {
              //console.log(data);
              this.docAadharImg = true;

              this.getAadharImg();
              this.showAlert('Document Image', 'Document Uploaded');
            })
            .catch(Error => {
              //console.log("Failed!");
            });
          // this.writeFile(this.aadharImageName,'Application-Documents');
        },
        err => {
          this.showAlert('Document Image', 'Document Not Uploaded');
        }
      );
    }
  }

  getAadharImg() {
    this.addAadharImgDocs = [];
    this.sqliteProvider.getAadharImgDetail(this.panId).then(data => {
      //console.log(data);
      this.aadharImgData = data;
      if (this.aadharImgData.length === 0) {
        this.docAadharImg = false;
      } else {
        for (let i = 0; i < this.aadharImgData.length; i++) {
          this.addAadharImgDocs.push({
            url: this.aadharImgData[i].aadharImageName,
            aadharImgId: this.aadharImgData[i].aadharImgId
          });
          //console.log("addAadharImgDocs==>" + JSON.stringify(this.aadharImgData));
          this.docAadharImg = true;
        }
      }

    });
  }

  closeAadharModal() {
    //this.getAadharImg();
    this.modalCtrl.dismiss();
  }

  openAadharGallery() {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert(
        'Alert',
        "Application is Already Submitted. Can't add Images"
      );
    } else {
      const goptions: CameraOptions = {
        quality: 80,
        allowEdit: true,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        encodingType: this.camera.EncodingType.JPEG,
        destinationType: this.camera.DestinationType.FILE_URI
      };

      this.camera.getPicture(goptions).then(
        imageData => {
          /*  this.Base64Img=imageData;
      this.aadharImageName ='data:image/jpeg;base64,' +imageData;
      this.writeFile(this.aadharImageName,'Application-Documents'); */
          this.aadharImageName = imageData;
          this.global.writefile(this.aadharImageName).then(
            data => {
              this.aadharImageName = (<any>data).nativeURL;
              this.sqliteProvider
                .addAadharImgDetails(
                  this.refId,
                  this.id,
                  this.panId,
                  this.aadharImageName
                )
                .then(data => {
                  //console.log(data);
                  this.docAadharImg = true;
                  this.getAadharImg();
                  this.showAlert('Document Image', 'Document Uploaded');
                })
                .catch(Error => {
                  // console.log("Failed!");
                });
            },
            err => {
              this.showAlert('Document Image', 'Document Not Uploaded');
            }
          );
        },
        err => {
          this.showAlert('Document Image', 'Document Not Uploaded');
        }
      );
    }
  }

  async aadharImgRemove(removaadhar) {
    let alertq = await this.alertCtrl.create({
      header: 'Delete?',
      subHeader: 'Do you want to delete?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            // console.log("cancelled");
          }
        },
        {
          text: 'yes',
          handler: () => {
            // console.log("u r click yes");
            // alert("removaadhar.refId ++++++++++++++ "+removaadhar.refId);
            if (this.global.getApplicationSubStatus() == 'Y') {
              this.showAlert('Alert',"Application is Already Submitted. Can't delete Images");
            } else {
              //let slideend = this.slides.isEnd();
              let slideend =true;
              this.sqliteProvider.removeAadharImgDetails(removaadhar.aadharImgId)
                .then(data => {
                  // console.log(data);
                  this.showAlert('Document Image', 'Document Image Deleted');
                  this.getAadharImg();
                  //console.log('slideend  is', slideend);
                  if (slideend) {
                    this.slides.slideTo(0);
                  }
                })
                .catch(err => {
                  // console.log(err);
                });
            }
          }
        }
      ]
    });
    await alertq.present();
  }

  public writeFile(base64Data, folderName) {
    let contentType = this.getContentType(base64Data);
    let Name = new Date().getTime().toString() + '.jpg';
    let DataBlob = this.base64toBlob(base64Data, contentType);
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.
    let filePath =
      this.file.externalApplicationStorageDirectory + 'files/' + folderName;
    this.file.writeFile(filePath, Name, DataBlob, contentType)
      .then(success => {
        this.aadharImageName =this.file.externalApplicationStorageDirectory +'files/' +folderName +'/' +Name;
        //console.log("File Writed Successfully", success);
        this.sqliteProvider.addAadharImgDetails(this.refId,this.id,this.panId,this.aadharImageName)
          .then(data => {
            // console.log(data);
            this.docAadharImg = true;
            this.getAadharImg();
            this.showAlert('Document Image', 'Document Uploaded');
          })
          .catch(Error => {
            // console.log("Failed!");
          });
      })
      .catch(err => {
        // console.log("Error Occured While Writing File", err);
      });
  }
  
  //here is the method is used to get content type of an bas64 data
  public getContentType(base64Data: any) {
    let block = base64Data.split(';');
    let contentType = block[0].split(':')[1];
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
}
