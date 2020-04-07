import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, LoadingController,ToastController} from '@ionic/angular';
import { ActivatedRoute , Router} from '@angular/router';
import { SqlliteProvider } from '../services/sqllite/sqllite';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { ConditionalExpr } from '@angular/compiler';

import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

var PDFrefId;

@Component({
  selector: 'app-viewalldetails',
  templateUrl: './viewalldetails.page.html',
  styleUrls: ['./viewalldetails.page.scss']
})
export class ViewalldetailsPage implements OnInit {

  tempRefID: any;
  loading: any;
  viewAllAppl: string = 'viewAllAppl';
  viewApplication: any;
  viewDocuments: any;
  alluserinfo: any;
  coAppinfo: any;
  guaranAppinfo: any;
  segmentvalue: any;
  allusers = [];
  items = [];
  gitems = [];
  pdfArray = [];
  profImgs = [];
  KYCImgs = [];
  otherImgs = [];
  gurantors = [];
  panImgs:any;
  AadharImgs:any;
  ProofImgs:any;
  public nouserdata: boolean = true;
  profileImg: boolean = false;
  kycImg: boolean = false;
  othImg: boolean = false;
  panImg: boolean =false;
  aadharImg: boolean =false;
  proofImg: boolean =false;
  refId:any;
  id:any;
  public applDetail: boolean = false;
  //public coapplDetail: boolean = false;
  // coapplDetail: any = {};
  coapplDetail: boolean = false;

  userExpandHeight = "100%";

  constructor(public route: ActivatedRoute,
              public sqliteProvider: SqlliteProvider, 
              public navCtrl: NavController, 
              public navParams: NavParams,
              public platform: Platform,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public global:GlobalfunctionsProvider,
              public file: File,
              public router: Router,
              public toast: ToastController,
              public document: DocumentViewer) {}

  ngOnInit() {
    console.log(this.route.snapshot.queryParamMap);
    console.log(this.route.children);
    console.log(this.route.routeConfig);
    console.log(this.route.component);
    this.route.params.subscribe(params => console.log(params));
    this.route.paramMap.subscribe(params => {
      console.log(params);
    });

    this.alluserinfo = this.navParams.get('alluserval');
    this.coAppinfo = this.navParams.get('refvalue');
    this.guaranAppinfo = this.navParams.get('refvalue');
    console.log("guaranAppinfo: " + JSON.stringify(this.guaranAppinfo));

  }

  ionViewDidLoad() {
    this.refId = this.alluserinfo.refId;
    PDFrefId=this.alluserinfo.refId;
    this.id = this.alluserinfo.id;
    this.viewAllAppl = 'viewApplication';
    this.sqliteProvider.getAllCityDetails().then(city=>{
      this.global.setFullCityMaster(city);
    }).then(()=>{
        this.sqliteProvider.getDatabaseState().subscribe(rdy => {
        if (rdy) {
        //this.loadAllUserDetails();
        this.loadAllDetail();
        this.loadcoAppDetails();
        this.loadGuaranDetails();
      }
    });
    })
  
  }

  async loadAllDetail() {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
   await loading.present();
    this.sqliteProvider.loadleftjoinDetails(this.refId, this.id).then(data => {
      console.log("data---------------------" + JSON.stringify(data));
      this.allusers = [];
      this.allusers = data;
      // this.pdfvalues = data;
      console.log("this.allusers-------------------------" + JSON.stringify(this.allusers));
      /*   if (this.allusers.length > 0) {
          this.nouserdata = true;
        } else {
          this.nouserdata = false;
        } */

      loading.onDidDismiss();
    }).catch(Error => {
      console.log(Error);
      this.allusers = [];
      loading.onDidDismiss();
    });
  }

  viewApplDetails() {
    this.applDetail = !this.applDetail;
  }

  viewCoApplDetails(item) {
    /*     this.coapplDetail[user.id] = !this.coapplDetail[user.id];
     */

    this.items.map((listItem) => {

      if (item == listItem) {
        this.coapplDetail[item.id] = !this.coapplDetail[item.id];
      } else {
        this.coapplDetail[item.id] = false;
      }

      return listItem;

    });

  }

  loadcoAppDetails() {
    this.sqliteProvider.getcoapplicantDetails(this.alluserinfo.refId).then(data => {
      console.log(data);
      this.items = [];
      this.items = data;
      console.log("this.coapplicant-------------------------" + JSON.stringify(this.items));
      //alert("JSON.stringify(this.users) "+JSON.stringify(this.users));
    }).catch(Error => {
      console.log(Error);
      this.items = [];
    });
  }

  loadGuaranDetails() {
    this.sqliteProvider.getGuarantDetails(this.alluserinfo.refId).then(data => {
      console.log(data);
      this.gitems = [];
      this.gitems = data;
      console.log("this.coapplicant-------------------------" + JSON.stringify(this.gitems));
      //alert("JSON.stringify(this.users) "+JSON.stringify(this.users));
    }).catch(Error => {
      console.log(Error);
      this.gitems = [];
    });
  }

  expandItem(item) {
    this.items.map((listItem) => {
      if (item == listItem) {
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }
      return listItem;
    });
  }

  expandGuaranItem(gitem) {
    this.gitems.map((listItem) => {
      if (gitem == listItem) {
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }
      return listItem;
    });
  }

  loadProfImgDetails() {
    this.sqliteProvider.getProfImages(this.alluserinfo.refId).then(data => {
      console.log(data);
      this.profImgs = [];
      this.profImgs = data;
      this.profileImg = true;
      //alert(this.profImgs.length);
      if(this.profImgs.length === 0){
        this.profileImg = false;
      }
      console.log("profImgs: --------------" + JSON.stringify(this.profImgs));
    }).catch(Error => {
      console.log(Error);
      this.profImgs = [];
    });
  }

  loadPanImg() {
    this.sqliteProvider.getPanImgs(this.alluserinfo.refId).then(data => {
      console.log(data);
      this.panImgs = data;
      console.log("this.panimgs====>" + JSON.stringify(this.panImgs));
      if(this.panImgs.length != 0){
        this.kycImg=true;
     // alert(this.kycImg);
      }
     // this.kycImg=true;
      //alert(this.profImgs.length);
    }).catch(Error => {
      console.log(Error);
      this.panImgs = [];
    });
  }

  loadAadharImg() {
    this.sqliteProvider.getAadharImgs(this.alluserinfo.refId).then(data => {
      console.log(data);
      this.AadharImgs = data;
      console.log("this.AadharImgs====>" + JSON.stringify(this.AadharImgs));
      if(this.AadharImgs.length != 0){
        this.kycImg=true;
     // alert(this.kycImg);
      }
      //this.kycImg=true;
      //alert(this.profImgs.length);
    }).catch(Error => {
      console.log(Error);
      this.AadharImgs = [];
    });
  }
  loadProofImg() {
    this.sqliteProvider.getProofImgs(this.alluserinfo.refId).then(data => {
      console.log(data);
      this.ProofImgs = data;
      console.log("this.ProofImgs====>" + JSON.stringify(this.ProofImgs));
      //alert(this.ProofImgs.length);
      if(this.ProofImgs.length != 0){
        this.kycImg=true;
      //alert(this.kycImg);
      }
      //alert(this.profImgs.length);
    }).catch(Error => {
      console.log(Error);
      this.ProofImgs = [];
    });
  }
  async loadOtherImgDetails() {
    let loading =await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    loading.present();
    this.sqliteProvider.getOtherImages(this.alluserinfo.refId).then(data => {
      console.log(data);
      this.otherImgs = [];
      this.otherImgs = data;
     //alert(this.otherImgs.length);
      if(this.otherImgs.length === 0){
        this.othImg = false;
        //alert("false works");
      }
      else{
        this.othImg = true;
        //alert("true works");
      }
      //console.log("otherImgs: --------------" + JSON.stringify(this.otherImgs));
      loading.dismiss();
    }).catch(Error => {
      console.log(Error);
      this.otherImgs = [];
      loading.dismiss();
    });
  }

  // showImg(imageData) {
  //   this.photoViewer.show(imageData);
  // }

  /* showImg(imageData) {
    this.navCtrl.push(InfoslidePage, { imgval: imageData});
    console.log("Passed Img Data===> "+imageData);
  }
  showPanImg(imageData) {
    this.navCtrl.push(InfoslidePage, { panimgval: imageData});
    console.log("Passed PanImg Data===> "+imageData);
  }
  showAadharImg(imageData) {
    this.navCtrl.push(InfoslidePage, { aadharimgval: imageData});
    console.log("Passed AadharImg Data===> "+imageData);
  }
  showProofImg(imageData) {
    this.navCtrl.push(InfoslidePage, { proofimgval: imageData});
    console.log("Passed ProofImg Data===> "+imageData);
  }
  showOtherImg(imageData) {
    this.navCtrl.push(InfoslidePage, { otherimgval: imageData});
    console.log("Passed OtherImg Data===> "+imageData);
  } */

  viewallImg() {
    this.loadProfImgDetails();
    this.loadPanImg();
    this.loadAadharImg();
    this.loadProofImg();
    this.loadOtherImgDetails();
  }


                /* CREATING PDF SECTION */

async callPDF(){
  this.loading = await this.loadingCtrl.create({
    message: 'Please wait...'
  });
  this.loading.present();
console.log(this.allusers);
this.pdfArray=[];
if(this.allusers.length>0){
 this.pdfArray.push(
   {"borrowers":this.allusers}
  );
}
if(this.items.length>0){
  for(let i=0;i<=this.items.length;i++){
    if(this.items[i]!=undefined){
      let coApp=[];
      coApp.push(this.items[i])
 this.pdfArray.push(
   {"borrowers" :coApp}
  );
}
}
}
if(this.gitems.length>0){
  for(let j=0;j<=this.gitems.length;j++){
    if(this.gitems[j]!=undefined){
      let guarantor=[];
      guarantor.push(this.gitems[j])
  this.pdfArray.push(
    {"borrowers" :guarantor}
  );
}
}
}


this.tempRefID=this.alluserinfo.refId;
// console.log(this.pdfArray);
setTimeout( () => {
  // somecode
  console.log(this.pdfArray);
  this.createPDF(this.pdfArray);
}, 500);
}


createPDF(value){
  
      console.log("Create PDF .....");
    
      let self = this;
      
      pdfmake.vfs = pdfFonts.pdfMake.vfs;
      var docDefinition = {
    //    content: [
      //  {
      //     columns: [
        
      //   [
      //     { text: `
      //     ${this.applicantData.mainApplicant[0].name}
      //     `, 
      //     style: 'header' },
      //     { text: 'Cryptocurrency Payment System', style: 'sub_header' },
      //     { text: 'WEBSITE: https://bitcoin.org/', style: 'url' }
      //   ]
        
      // ]
        // columns:self.generateTextObj()
      // }
      // ],
      content : self.generateTextObj(value),
      styles: {
            header: {
            bold: true,
            fontSize: 20,
            alignment: 'center',
            background:"yellow",
            width:'100%'
            },
      sub_header: {
            fontSize: 18,
            alignment: 'left'
            },
      url: {
          fontSize: 16,
          alignment: 'left'
          }
      },
      pageSize: 'A4',
      pageOrientation: 'portrait'
  
      } // end of doc definition 
  
      pdfmake.createPdf(docDefinition).getBuffer(function (buffer) {
        let utf8 = new Uint8Array(buffer);
        let binaryArray = utf8.buffer;
        self.saveToDevice(binaryArray,PDFrefId+".pdf")
        });
    }
    generateTextObj(value){
      let objBuilderArray = [];
  
      var coAppCount=0;
      var GuarantorCount=0;
      for (let prop in value) {
        console.log(Object.keys(value[prop].borrowers));
        for(let val of Object.keys(value[prop].borrowers)){
          console.log(`${val} : ${(value[prop].borrowers)[val]}`);
          let tempValue=(value[prop].borrowers)[val];
          for(let objKeys of Object.keys(tempValue))
            {
          if(objKeys === "usertype"){
            if(tempValue[objKeys]==='A'){
            if(tempValue[objKeys]!=null && tempValue[objKeys]!=undefined && tempValue[objKeys]!="")
              {
            objBuilderArray.push(
              {
                text:`Applicant`,
                style: 'header' 
              }
            )
          }
          else
            {
              objBuilderArray.push(
                {
                  text:`${objKeys} : -`,
                  style: 'header' 
                }
              )
            }
          }
          else if(tempValue[objKeys]==='C'){
            if(tempValue[objKeys]!=null && tempValue[objKeys]!=undefined && tempValue[objKeys]!="")
              {
                coAppCount=coAppCount+1;
            objBuilderArray.push(
              {
                text:`coApplicant `+coAppCount,
                style: 'header' 
              }
            )
          }
          else
            {
              objBuilderArray.push(
                {
                  text:`${objKeys} : -`,
                  style: 'header' 
                }
              )
            }
          }
          else if(tempValue[objKeys]==='G'){
            if(tempValue[objKeys]!=null && tempValue[objKeys]!=undefined && tempValue[objKeys]!="")
              {
                GuarantorCount=GuarantorCount+1;
            objBuilderArray.push(
              {
                text:`Guarantor`+GuarantorCount,
                style: 'header' 
              }
            )
          }
          else
            {
              objBuilderArray.push(
                {
                  text:`${objKeys} : -`,
                  style: 'header' 
                }
              )
            }
          }
        }else{

            if(tempValue[objKeys]!=null && tempValue[objKeys]!=undefined && tempValue[objKeys]!="")
              {
            objBuilderArray.push(
              {
                text:`${objKeys} : ${tempValue[objKeys]}`,
                style: 'sub_header' 
              }
            )
          }
          else
            {
              objBuilderArray.push(
                {
                  text:`${objKeys} : -`,
                  style: 'sub_header' 
                }
              )
            }
          }
        }
          
        }
        //console.log(this.applicantData.mainApplicant[prop]);
      }
      return objBuilderArray;
    }


   async saveToDevice(data:any,savefile:any){
      let self = this;
      self.file.writeFile(self.file.externalDataDirectory, savefile, data, {replace:true});
      

      const options: DocumentViewerOptions = {
        title: savefile
      }

      setTimeout( async () => {
      this.document.viewDocument(self.file.externalDataDirectory+''+savefile, 'application/pdf',options);
      /* this.fileOpener.open(self.file.externalDataDirectory+''+savefile, 'application/pdf')
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e)); */
      const toast = await self.toast.create({
        message: 'File saved to your device',
        duration: 3000,
        position: 'bottom'
        });
    await toast.present();
      this.loading.dismiss();
    }, 500);
      }



      showImg(imageData) {
        this.router.navigate(['infoslide', { imgval: imageData} ]);
        //this.navCtrl.push(InfoslidePage, { imgval: imageData});
        console.log("Passed Img Data===> "+imageData);
      }
      showPanImg(imageData) {
        this.router.navigate(['infoslide', { panimgval: imageData} ]);
        //this.navCtrl.push(InfoslidePage, { panimgval: imageData});
        console.log("Passed PanImg Data===> "+imageData);
      }
      showAadharImg(imageData) {
        this.router.navigate(['infoslide', { aadharimgval: imageData} ]);      
        //this.navCtrl.push(InfoslidePage, { aadharimgval: imageData});
        console.log("Passed AadharImg Data===> "+imageData);
      }
      showProofImg(imageData) {
        this.router.navigate(['infoslide', { proofimgval: imageData} ]);        
        //this.navCtrl.push(InfoslidePage, { proofimgval: imageData});
        console.log("Passed ProofImg Data===> "+imageData);
      }
      showOtherImg(imageData) {
        this.router.navigate(['infoslide', { otherimgval: imageData} ]);        
        //this.navCtrl.push(InfoslidePage, { otherimgval: imageData});
        console.log("Passed OtherImg Data===> "+imageData);
      }
    



}
