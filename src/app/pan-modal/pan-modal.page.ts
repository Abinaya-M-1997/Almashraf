import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {NavController,ModalController,AlertController,Platform,IonSlides} from '@ionic/angular';
import { SqlliteProvider } from '../services/sqllite/sqllite';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-pan-modal',
  templateUrl: './pan-modal.page.html',
  styleUrls: ['./pan-modal.page.scss']
})
export class PanModalPage implements OnInit {
  @Input() panImgVal: any;
  @Input() REFID: any;
  @Input() IDEN: any;

  Base64Img: any;
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  addPanImgDocs = [];
  docPanImg: boolean = false;
  pandocinfo: any;
  refinfo: any;
  refId: any;
  id: any;
  panId: any;
  panImageName: any;
  panImgData: any;
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
    public file: File,
    public webview: WebView
  ) { }

  ngOnInit() {
    this.pandocinfo = this.panImgVal;
    this.refId = this.REFID;
    this.id = this.IDEN;
    this.panId = this.pandocinfo;
  }
  ngAfterViewInit() {
    this.getPanImg();
    console.log('ngAfterViewInit ProofModalPage');
  }
  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.backButton.subscribe(
      function (event) {
        console.log('Prevent Back Button Page Change');
      }
    );
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  ionViewDidLoad() {

    this.initializeBackButtonCustomHandler();
  }

  async showAlert(tittle, subtitle) {
    let alert = await this.alertCtrl.create({
      header: tittle,
      subHeader: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  takePanImg() {
    if (this.global.getApplicationSubStatus() == 'Y') {
      this.showAlert(
        'Alert',
        "Application is Already Submitted. Can't add Images"
      );
    } else {
      this.camera.getPicture(this.options).then(
        async imageData => {
          /* this.Base64Img=imageData;
      this.panImageName = 'data:image/jpeg;base64,' +imageData;
      this.writeFile(this.panImageName,'Application-Documents'); */
          this.panImageName = await this.webview.convertFileSrc(imageData);

          this.sqliteProvider.addPanImgDetails(this.refId,this.id,this.panId,this.panImageName)
            .then(data => {
              console.log(data);
              this.docPanImg = true;
              this.getPanImg();
              this.showAlert('Document Image', 'Document Uploaded');
            })
            .catch(Error => {
              console.log('Failed!');
            });
        },
        err => {
          this.showAlert('Document Image', 'Document Not Uploaded');
        }
      );
    }
  }
  public writeFile(base64Data, folderName) {
    let contentType = this.getContentType(base64Data);
    let Name = new Date().getTime().toString() + '.jpg';
    let DataBlob = this.base64toBlob(base64Data, contentType);
    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.
    let filePath =
      this.file.externalApplicationStorageDirectory + 'files/' + folderName;
    this.file
      .writeFile(filePath, Name, DataBlob, contentType)
      .then(success => {
        this.panImageName =
          this.file.externalApplicationStorageDirectory +
          'files/' +
          folderName +
          '/' +
          Name;
        console.log('File Writed Successfully', success);
        this.sqliteProvider
          .addPanImgDetails(this.refId, this.id, this.panId, this.panImageName)
          .then(data => {
            console.log(data);
            this.docPanImg = true;
            this.getPanImg();
            this.showAlert('Document Image', 'Document Uploaded');
          })
          .catch(Error => {
            console.log('Failed!');
          });
      })
      .catch(err => {
        console.log('Error Occured While Writing File', err);
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
  getPanImg() {
    this.addPanImgDocs = [];
    this.sqliteProvider.getPanImgDetail(this.panId).then(data => {
      console.log(data, 'getpanimg');
      this.panImgData = data;
      if (this.panImgData.length === 0) {
        this.docPanImg = false;
      } else {
        for (let i = 0; i < this.panImgData.length; i++) {
          this.addPanImgDocs.push({
            url: this.panImgData[i].panImageName,
            panImgId: this.panImgData[i].panImgId
          });
          this.docPanImg = true;
        }
      }

    });
  }

  closePanModal() {
    this.modalCtrl.dismiss();
  }

  openPanGallery() {
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
          /*  this.Base64Img=imageData; */
          /* this.panImageName = 'data:image/jpeg;base64,' +imageData; */
          /*  this.writeFile(this.panImageName,'Application-Documents'); */
          this.panImageName = imageData;
          /* this.file.resolveLocalFilesystemUrl(this.panImageName).then(fileentry=>{
      console.log(fileentry)
    }) */
          this.sqliteProvider
            .addPanImgDetails(
              this.refId,
              this.id,
              this.panId,
              this.panImageName
            )
            .then(data => {
              console.log(data);
              this.docPanImg = true;
              this.getPanImg();
              this.showAlert('Document Image', 'Document Uploaded');
            })
            .catch(Error => {
              console.log('Failed!');
            });
        },
        err => {
          this.showAlert('Document Image', 'Document Not Uploaded');
        }
      );
    }
  }

  async panImgRemove(removpan) {
    let alertq = await this.alertCtrl.create({
      header: 'Delete?',
      subHeader: 'Do you want to delete?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('cancelled');
          }
        },
        {
          text: 'yes',
          handler: () => {
            console.log('u r click yes');
            //  alert(user.refId);
            if (this.global.getApplicationSubStatus() == 'Y') {
              this.showAlert(
                'Alert',
                "Application is Already Submitted. Can't delete Images"
              );
            } else {
              //let slideend = this.slides.isEnd();
              let slideend = true;
              this.sqliteProvider
                .removePanImgDetails(removpan.panImgId)
                .then(data => {
                  console.log(data);
                  this.showAlert('Document Image', 'Document Image Deleted');
                  this.getPanImg();
                  console.log('slideend  is', slideend);
                  if (slideend) {
                    this.slides.slideTo(0);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
        }
      ]
    });
    await alertq.present();
  }
}
