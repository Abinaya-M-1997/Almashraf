import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
declare var google: any;
declare var window;
declare var cordova;
/*
  Generated class for the GlobalfunctionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalfunctionsProvider {
  Branch: any;
  mclr: any;
  loan_product: any;
  _img: any;
  _loading: any;
  _stateMaster: any;
  _cityMaster: any;
  _productList: any;
  _Gender: any;
  _IncomeType: any;
  _Employment: any;
  _InterestType: any;
  _Title: any;
  _RelationShip: any;
  _appStatus: any;
  _selectedCities: any;
  _branch: any;
  _docList: any;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _GEOCODE: NativeGeocoder,
    public file: File,
    public platform: Platform
  ) {
    console.log('Hello GlobalfunctionsProvider Provider');
    this.getSystemDate();
    this.getTimestamp();
  }
  getPublicUrl() {
    //let url="http://180.151.63.116:8188/";  /* local */
    //  let url="http://192.168.0.43:8188/";  /* local */
    //  let url="http://59.144.140.150:9080/"; /* uat */
    //let url="http://125.21.252.168:9080/"; /*latest uat */
    // let url ="http://192.168.0.43:8188/";/*keerthana*/
    let url = 'http://192.168.0.79:9000/';
    return url;
  }
  getAppVersion() {
    //let appVersion='LIVE - 1.0.0';
    let appVersion = 'UAT - 1.0.1';
    return appVersion;
  }

  writefile(cachefile) {
    let oldImagePath = cachefile.substring(0, cachefile.lastIndexOf('/') + 1);
    let OldImageName = cachefile.split('/').pop();
    let NewFileName = OldImageName;
    let NewImagePath =
      this.file.externalApplicationStorageDirectory +
      'files/Application-Documents';
    return new Promise((resolve, reject) => {
      this.file
        .moveFile(oldImagePath, OldImageName, NewImagePath, NewFileName)
        .then(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  copyFile(localFilePath, oldImg, newImagPath, newName) {
    return new Promise((resolve, reject) => {
      this.file
        .copyFile(localFilePath, oldImg, newImagPath, newName)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  getOtherimg() {
    return this._img;
  }
  setLoanProduct(prd) {
    this.loan_product = prd;
  }
  getLoanProduct() {
    return this.loan_product;
  }
  setOtherimg(value) {
    console.log('other img value ==>' + value);
    this._img = value;
  }
  getTimestamp() {
    let date = new Date();
    let n = date.toDateString();
    let time = date.toLocaleTimeString();
    let timestamp = n + ' ' + time;
    //console.log("timestamp"+timestamp);
    return timestamp;
  }
  getSystemDate() {
    let sysDate = new Date();
    //console.log("sysDate"+sysDate);
    return sysDate;
  }

  async globalAlert(tittle, subtitle) {
    let alert = await this.alertCtrl.create({
      header: tittle,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await alert.present();
  }

  async globalLodingPresent(loadingContent: string) {
    this._loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: `${loadingContent}`,
      cssClass: 'spinnerCss',
      duration:1000
    });

    await this._loading.present().then(() => {
      setTimeout(() => {
        this._loading.dismiss();
      }, 2000);
    });
  }
  globalLodingDismiss() {
    this._loading.dismiss();
  }

  /* Nidheesh Source */

  getFullStateMaster() {
    return this._stateMaster;
  }

  setFullCityMaster(value) {
    this._cityMaster = value;
  }
  getFullCityMaster() {
    return this._cityMaster;
  }

  setFullStateMaster(value) {
    this._stateMaster = value;
  }
  getFullProductList() {
    return this._productList;
  }

  setFullProductList(value) {
    this._productList = value;
  }

  getGenderList() {
    return this._Gender;
  }

  setGenderList(value) {
    this._Gender = value;
  }

  getIncomeTypeList() {
    return this._IncomeType;
  }

  setIncomeTypeList(value) {
    this._IncomeType = value;
  }
  getEmployementList() {
    return this._Employment;
  }

  setEmployementList(value) {
    this._Employment = value;
  }
  getTitleList() {
    return this._Title;
  }

  setTitleList(value) {
    this._Title = value;
  }
  setDocumentList(val) {
    this._docList = val;
  }
  getDocumentList() {
    return this._docList;
  }
  getRelationShipList() {
    return this._RelationShip;
  }

  setRelationShipList(value) {
    this._RelationShip = value;
  }
  getInterestRateType() {
    return this._InterestType;
  }

  setInterestRateType(value) {
    this._InterestType = value;
  }

  setApplicationSubStatus(val) {
    this._appStatus = val;
  }
  getApplicationSubStatus() {
    return this._appStatus;
  }

  setBranchCode(val) {
    this._branch = val;
  }
  getBranchCode() {
    return this._branch;
  }

  setMclrList(data) {
    this.mclr = data;
  }
  getMclrList() {
    return this.mclr;
  }
  setAllBranch(branch) {
    this.Branch = branch;
  }
  getAllBranch() {
    return this.Branch;
  }

  getGlobalConstants = function(value) {
    let constantValue;
    if (value == 'DocCode') {
      constantValue = 'TAB-BOS-SUCCESS';
    }

    return constantValue;
  };
  filterStateItems(searchTerm) {
    return this._stateMaster.filter(item => {
      return (
        item.sgmStateName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
  filterCityItems(search) {
    return this._selectedCities.filter(item => {
      return item.sgmCityName.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }
  filterDocItems(search) {
    return this._docList.filter(item => {
      return (
        item.doc_description.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    });
  }
  setSelectedCities(val) {
    this._selectedCities = val;
  }
  getSelectedCities() {
    return this._selectedCities;
  }

  reverseGeocode(lat: number, lng: number): Promise<any> {
    return new Promise((resolve, reject) => {
      var latlng = new google.maps.LatLng(lat, lng);
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { latLng: latlng },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            resolve(results);
          } else {
            if (status == 'ZERO_RESULTS') {
              reject('Location is not available for your current position.');
            } else if (status == 'OVER_QUERY_LIMIT') {
              reject('Request Count exceeded !');
            } else if (status == 'REQUEST_DENIED') {
              reject('Request was Denied');
            } else if (status == 'INVALID_REQUEST') {
              reject('Invalid request. Unable to process your request.');
            } else if (status == 'UNKNOWN_ERROR') {
              reject(
                'Request could not be processed due to a server error. The request may succeed if you try again.'
              );
            }
          }
        },
        function(error) {
          reject(
            'Request could not be processed due to a server error. The request may succeed if you try again with internet .'
          );
        }
      );
    });
  }
  successCallback(result) {
    console.log(result); // true - enabled, false - disabled
  }

  errorCallback(error) {
    console.log(error);
  }

  async showAlert(tittle, subtitle) {
    let alert = await this.alertCtrl.create({
      header: tittle,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await alert.present();
  }
/*
  showAlert(tittle, subtitle): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let alert = await this.alertCtrl.create({
        header: tittle,
        subHeader: subtitle,
        buttons: [
          {
            text: 'ok',
            role: 'destructive',
            handler: () => {
              resolve();
            }
          }
        ]
      });
      await alert.present();
    });
  }*/
  /*    secureapp(){
    window.plugins.preventscreenshot.enable(this.successCallback, this.errorCallback);
      // window.plugins.preventscreenshot.disable(this.successCallback, this.errorCallback);
      let sthis=this;
      cordova.plugins.diagnostic.isADBModeEnabled(function(enabled){
        
        console.log("ADB mode(debug mode) is " + (enabled ? "enabled" : "disabled"));
        if(enabled){
          sthis.showAlert("Alert", "USB Debugging Enabled! Application will not be working on this environment..").then(()=>{
            
          })
          setTimeout(() => {
                sthis.platform.exitApp();   
          }, 1000); 
            
        }
      }, function(error){
        console.error("The following error occurred: "+error);
      });
  } */
}
