//import { HttpClient} from '@angular/common/http';
// import { Http, Headers, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HTTP } from '@ionic-native/http/ngx';
import { GlobalfunctionsProvider } from '../globalfunctions/globalfunctions';
declare var require: any;
/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  eida_value_populated = {
    title: '01',
    firstname: 'Udhaya',
    middlename: 'Suriya',
    lastname: 'Charles',
    gender: 'F',
    dob: '1988-01-30',
    mobileno: '9789874013',
    email: 'suriya@gmail.com',
    companyname: 'SIDCO',
    nationality: 'B',
    EIDAno: '111122223333',
    POBoxno: '967999',
    address: 'No:12, 3rd Avenue, Masco Lao Road,AbuDhabi',
    permaddress1: 'No:12, 3rd Avenue, Masco Lao Road,AbuDhabi'
  };

  public fileDownloadLink =
    'http://192.168.0.98:9072/lendperfect/apifiledownload';

  public testlink =
    'http://192.168.0.147:9002/laps/rest/losMobileAppService/mobileAPI';

  constructor(public global: GlobalfunctionsProvider, public http: HTTP) {}

  restApiCall(serviceName, methodName, data) {
    /*     return new Promise((resolve, reject) => {
      //let headers = new Headers();
      //headers.append('Content-Type', 'application/json');

      let link;
      if (methodName == 'customercreation') {
        link =

          this.global.getPublicUrl() +
          'laps/rest/' +
          serviceName +
          '/' +
          methodName;
      } else {
        link =
          this.global.getPublicUrl() +
          'laps/rest/' +
          serviceName +
          '/' +
          methodName +
          '/' +
          data;
      }

      // this.http.post(link, data)
      //   .subscribe(response => {
      //     resolve(response);
      //   }, error => {
      //     //resolve(error);
      //     reject(error);
      //   });
    }); */
  }
  restApiDownLoadCall(method, operation, data) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let link = this.fileDownloadLink;

      // this.http.post(link, data)

      //   .subscribe(data => {

      //     resolve(data);
      //   }, error => {

      //     reject(error);
      //   });
    });
  }

  testapi(data) {
    this.http.setDataSerializer('json');
    return new Promise((resolve, reject) => {
      let link = this.testlink;

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(data, 'before posting');
      this.http.post(link, data, { 'Content-Type': 'application/json' }).then(response => {
        console.log('response', response);
        resolve(response);
      })
        .catch(err => {
          console.log('reject', err);
          reject(err);
        });
    });
  }

  soapApiCall(serviceName, methodName, data) {
    // return Observable.fromPromise(
    //   new Promise((resolve, reject) => {
    //     var jsonxml = require('jsontoxml');
    //     var xml2json = jsonxml(data);
    //     var base_url =
    //       this.global.getPublicUrl() + 'laps/services/' + serviceName;
    //     //var base_url = "http://59.144.140.150:9080/laps/services"+"/"+serviceName; /* uat */
    //     //  var base_url =  "http://192.168.0.44:8080/laps/services/losservices"+serviceName;
    //     var sr = `<?xml version=\"1.0\" encoding=\"utf-8\"?>
    //           <soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:len=\"http://webserviceImpl.laps.sai.com/\">
    //           <soapenv:Header/>
    //           <soapenv:Body>
    //             <len:${methodName}>
    //               ${xml2json}
    //             </len:${methodName}>
    //           </soapenv:Body>
    //         </soapenv:Envelope>`;
    //     // Write log for Method invocation
    //     var xmlhttp = new XMLHttpRequest();
    //     xmlhttp.open('POST', base_url, true);
    //     xmlhttp.onreadystatechange = () => {
    //       if (xmlhttp.readyState == 4) {
    //         if (xmlhttp.status == 200) {
    //           var xml = xmlhttp.responseXML;
    //           var root = xml.getElementsByTagName('return').item(0);
    //           let jsonObj = this.setJsonObj(root);
    //           // Write log for success Response
    //           resolve(jsonObj);
    //           // return jsonObj;
    //         } else {
    //           // Write log for Error Response
    //           reject(xmlhttp);
    //         }
    //       }
    //     };
    //     // Send the POST request
    //     xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    //     xmlhttp.send(sr);
    //   })
    // );
  }

  setJsonObj = function(xml) {
    var js_obj = {};
    if (xml.nodeType == 1) {
      if (xml.attributes.length > 0) {
        js_obj['@attributes'] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          js_obj['@attributes'][attribute.nodeName] = attribute.value;
        }
      }
    } else if (xml.nodeType == 3) {
      js_obj = xml.nodeValue;
    }
    if (xml.hasChildNodes()) {
      // console.log("==>"+xml.childNodes.length);
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        //console.log(`item ==> ${item}`);
        var nodeName = item.nodeName;
        // console.log(`nodeName ==> ${nodeName}`);
        if (typeof js_obj[nodeName] == 'undefined') {
          js_obj[nodeName] = this.setJsonObj(item);
        } else {
          if (typeof js_obj[nodeName].push == 'undefined') {
            var old = js_obj[nodeName];
            js_obj[nodeName] = [];
            js_obj[nodeName].push(old);
          }
          js_obj[nodeName].push(this.setJsonObj(item));
        }
      }
    }
    return js_obj;
  };
}
