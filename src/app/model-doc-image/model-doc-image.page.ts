import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {NavController,ModalController,AlertController,Platform,IonSlides} from '@ionic/angular';
import { SqlliteProvider } from '../services/sqllite/sqllite';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-model-doc-image',
  templateUrl: './model-doc-image.page.html',
  styleUrls: ['./model-doc-image.page.scss'],
})
export class ModelDocImagePage implements OnInit {

  @Input()otherval:any;
  Base64Img: any;

  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  addKYCDocs = [];
  docImg: boolean = false;
  otherdocinfo: any;
  refId: any;
  id: any;
  otherdocid: any;
  otherdocimg: any;
  otherimgData: any;
  otherimgid: any;
  public unregisterBackButtonAction: any;


  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    targetWidth: 500,
    targetHeight: 500,
    allowEdit : true
  }
  constructor(public camera: Camera,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public sqliteProvider: SqlliteProvider,
              public platform: Platform,
              public global: GlobalfunctionsProvider,
              public file: File,
              public webview: WebView) 
  { }

  ngOnInit() {
  console.log(this.otherval, "from other doc modal");
  this.refId      = this.otherval.refId;
  this.id         = this.otherval.id;
  this.otherdocid = this.otherval.otherid;
    }

    ngAfterViewInit() {
      this.getOtherImgDetails();
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

    takekycdoc() {
      if(this.global.getApplicationSubStatus()=='Y'){
        this.showAlert("Alert", "Application is Already Submitted. Can't add Images");
      }else{
      this.camera.getPicture(this.options).then(async imageData => {
       
        this.otherdocimg = await this.webview.convertFileSrc(imageData);        
          this.sqliteProvider.addOtherdocImgDetails(this.refId, this.id, this.otherdocid, this.otherdocimg,this.global.getLoanProduct()).then(data => {
          console.log(data);
          this.docImg = true;
          this.getOtherImgDetails();       
          this.showAlert("Document Image", "Document Uploaded");
        }).catch(Error => {
          console.log("Failed!");
        });
      }, (err) => {
        this.showAlert("Document Image", "Document Not Uploaded");
      });
      }
    }
  
    getOtherImgDetails() {
      this.addKYCDocs = [];
      this.sqliteProvider.getOtherImgDetail(this.refId, this.otherdocid).then(data => {
        console.log(data);
        this.otherimgData = data;
        for (let i = 0; i < this.otherimgData.length; i++) {
          console.log(this.otherimgData[i].otherimgpath);
          this.addKYCDocs.push({ "url": this.otherimgData[i].otherimgpath,"imgid":this.otherimgData[i].otherimgid });
          console.log("image id==>"+this.otherimgData[i].otherimgid);
          //this.otherimgid=this.otherimgData[i].otherdocid;
          this.docImg = true;
        }
        if(this.otherimgData.length === 0){
          this.docImg = false;
        }
      });
      
    }
  
  
    openGallery() {
      if(this.global.getApplicationSubStatus()=='Y'){
        this.showAlert("Alert", "Application is Already Submitted. Can't add Images");
      }else{
      const goptions: CameraOptions = {
        quality: 80,
        allowEdit: true,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        encodingType: this.camera.EncodingType.JPEG,
        destinationType: this.camera.DestinationType.FILE_URI
      }
  
      this.camera.getPicture(goptions).then((imageData) => {
        
          this.otherdocimg =imageData;
           this.global.writefile(this.otherdocimg).then(data=>{
          this.otherdocimg=(<any>data).nativeURL;
          this.sqliteProvider.addOtherdocImgDetails(this.refId, this.id, this.otherdocid, this.otherdocimg,this.global.getLoanProduct()).then(data => {
          console.log(data);
          this.docImg = true;
          this.getOtherImgDetails();
       
          this.showAlert("Document Image", "Document Uploaded");
        }).catch(Error => {
          console.log("Failed!");
        });
        },err=>{
           this.showAlert("Document Image", "Document Not Uploaded");
        })
      }, (err) => {
        console.log(err,"image Not Uploaded");
        //this.showAlert("Document ", "Not Uploaded");
      });
      }
    }
  public writeFile(base64Data,folderName) {  
          let contentType = this.getContentType(base64Data); 
          let Name= ((new Date().getTime()).toString())+".jpg";
          let DataBlob = this.base64toBlob(base64Data, contentType);  
          // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
          let filePath = this.file.externalApplicationStorageDirectory+"files/" + folderName;  
          this.file.writeFile(filePath,Name, DataBlob, contentType).then((success) => { 
          this.otherdocimg= this.file.externalApplicationStorageDirectory+"files/" + folderName+"/"+Name;
           console.log("File Writed Successfully", success);  
          this.sqliteProvider.addOtherdocImgDetails(this.refId, this.id, this.otherdocid, this.otherdocimg,this.global.getLoanProduct()).then(data => {
          console.log(data);
          this.docImg = true;
          this.getOtherImgDetails();
          // this.id = data.insertId;
          // this.incomeid =data.insertId;
          // this.expenceid =data.insertId;
          this.showAlert("Document", "Successfully Uploaded");
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
   async ImgRemove(addKYCDoc){
      //alert(addKYCDoc);
      //alert(JSON.stringify(addKYCDoc.imgid));
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
            // let currentIndex = this.slides.getActiveIndex();
            // let previousIndex = this.slides.getPreviousIndex();
            // console.log('Current index is', currentIndex);
            // console.log('previous index is', previousIndex);
            if(this.global.getApplicationSubStatus()=='Y'){
        this.showAlert("Alert", "Application is Already Submitted. Can't add Images");
      }else{
            //let slideend = this.slides.isEnd();
            let slideend = true;

            //let previousIndex = this.slides.getPreviousIndex();
            this.sqliteProvider.removeOtherdocDetails(addKYCDoc.imgid).then(data => {
              console.log(data);
              this.getOtherImgDetails();
              console.log('slideend  is', slideend);
              if(slideend){
                this.slides.slideTo(0)
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
  
    closeModal() {
      this.modalCtrl.dismiss();
    }
  

}
