import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
//import {map} from 'rxjs/add/operator';
import { BehaviorSubject } from 'rxjs';
import { GlobalfunctionsProvider } from '../globalfunctions/globalfunctions';
import { File } from '@ionic-native/file/ngx';
@Injectable()
export class SqlliteProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  private name: string;
  DB_NAME: string = 'pmcb.db';
  constructor(
    public platform: Platform,
    public sqlite: SQLite,
    public sqlitePorter: SQLitePorter,
    public globalFunction: GlobalfunctionsProvider,
    public file: File,
    public http: HttpClient
  ) {
    this.databaseReady = new BehaviorSubject(false);
    //console.log('Hello SqlliteProvider Provider');
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: this.DB_NAME,
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.loadInit();
          //alert("db Created ");
          this.databaseReady.next(true);
        })
        .catch(error => { });
    });
  }

  loadInit() {
    console.log("Database Created");

    this.http.get('assets/sql/query.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            console.log("Successflly executed the sql file!")
            // alert("Successflly executed the sql file!");
            this.loadCustomDirectory();
          })
          .catch(e => console.error(e));
      });
  }
  loadCustomDirectory() {
    this.file
      .checkDir(
        this.file.externalApplicationStorageDirectory + 'files/',
        'Application-Documents'
      )
      .then(response => {
        //console.log('Directory Already Created');
      })
      .catch(err => {
        // console.log('Directory Newly Created');
        this.file
          .createDir(
            this.file.externalApplicationStorageDirectory + 'files',
            'Application-Documents',
            false
          )
          .then(fin => { });
      });
  }
  addRootDetails(createddate, deviceid, createduser) {
    let data = [createddate, deviceid, createduser];
    //alert(JSON.stringify(data));
    return this.database
      .executeSql(
        'INSERT INTO ORIG_APP_DETAILS(createddate, deviceid, createduser) VALUES (?,?,?)',
        data
      )
      .then(
        data => {
          //alert(JSON.stringify(data));
          // alert(JSON.stringify(data.insertId));
          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  addDetails(refId, value, sameValue, imagepath, userType) {
    let data = [
      refId,
      value.title,
      value.firstName,
      value.lastName,
      value.gender,
      value.dob,
      value.phone,
      value.email,
      value.middleName,
      value.address,
      value.address2,
      value.district,
      value.permaddress1,
      value.permaddress2,
      value.permdistrict,
      value.permpincode,
      value.relationship,
      value.company,
      value.pincode,
      value.customerCategory,
      value.custNationality,
      value.stlCustomer,
      value.custType,
      value.bankingWith,
      value.vipFlag,
      value.incomeAssign,
      value.cbrbResult,
      value.alEthiadBureau,
      value.accNo,
      value.passportNo,
      value.eidaNo,
      value.rimNo,
      value.poBoxNo,
      sameValue,
      imagepath,
      userType
    ];
    // alert(usertype);
    //alert("referenceid outside:" + refId);
    //alert(JSON.stringify(data));
    return this.database
      .executeSql(
        'INSERT INTO ORIG_APPLICATION(refId,title,firstName, lastName, gender, dob, phone, email, middleName, address, address2, district, permaddress1, permaddress2, permdistrict, permpincode, relationship, company,pincode,custCategory,nationality,stlCust,CustType,bankingWith,vipFlag,incomeAssg,cbrbRes,alEthiadBureau,accNo,passportNo,eidaNo,rimNo,poBoxNo,sameValue, imagepath,userType) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        data
      )
      .then(
        data => {
          //alert(JSON.stringify(data));
          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }
  getDetailsbyid(refid, id) {
    let data = [refid, id];
    return this.database
      .executeSql('select * from ORIG_APPLICATION where refId=? and id=?', data)
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }
  addLoanDetails(refId, value, id
    // id,
    // product,
    // amount,
    // tenure,
    // moratorium,
    // rio,
    // cost,
    // intType,
    // priority,
    // mclr,
    // loanpurpose,
    // amtRange,
    // repaymentMode,
    // repaymentType,
    // proposalType,
    // amortization
  ) {
    // alert("passed id===>" + id);
    let data = [
      refId,
      id,
      value.product,
      value.producttype,
      value.amount,
      value.tenure,
      value.moratorium,
      value.interesttype,
      value.mclr,
      value.loanpurpose,
      value.loan_amount_range,
      value.repaymentMode,
      value.repaymentType,
      value.proposalType,
      value.amortization
    ];
    // alert("referenceid:" + refId);
    return this.database
      .executeSql(
        'INSERT INTO ORIG_LOAN_DETAILS(refId,id,product,producttype,amount, tenure, moratorium, interesttype,mclr,loan_purpose,loan_amount_range,repaymentMode,repaymentType,proposalType,amortization) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        data
      )
      .then(
        data => {
          // alert(JSON.stringify(data));

          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  addKycDetails(refId, id, pannumber, aadharnumber) {
    // alert("passed id===>" + id);
    let data = [refId, id, pannumber, aadharnumber];
    // alert("referenceid:" + data);
    return this.database
      .executeSql(
        'INSERT INTO ORIG_KYC_DETAILS(refId,id,pannumber,aadharnumber) VALUES (?,?,?,?)',
        data
      )
      .then(
        data => {
          //  alert(JSON.stringify(data));

          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  addIncomeDetails(
    refId,
    id,
    category,
    incometype,
    grossincome,
    statutory,
    other,
    netincome,
    incomeyesno,
    employname,
    doj,
    esob,
    lengthinservice,
    usertype
  ) {
    //alert("passed id===>" + id);
    // alert(incomeyesno);
    let data = [refId, id];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_INCOME_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            //   alert("update id===>"+id);
            //  alert("update id===>"+refId);
            let data = [
              category,
              incometype,
              grossincome,
              statutory,
              other,
              netincome,
              incomeyesno,
              employname,
              doj,
              esob,
              lengthinservice,
              refId,
              id
            ];
            return this.database
              .executeSql(
                'UPDATE ORIG_INCOME_DETAILS SET category=?,incometype=?,grossincome=?,statutory=?,other=?,netincome=?,incomeyesno=?,employname=?,doj=?,esob=?,lengthinservice=?,refId=? WHERE id=?', data).then(
                  data => {
                    //   alert(JSON.stringify(data));
                    return data;
                  },
                  err => {
                    console.log('Error: ', err);
                    return err;
                  }
                );
          } else {
            // alert("insertupdate id===>"+id);
            // alert("insertupdate id===>"+refId);
            let data = [
              refId,
              id,
              category,
              incometype,
              grossincome,
              statutory,
              other,
              netincome,
              incomeyesno,
              employname,
              doj,
              esob,
              lengthinservice,
              usertype
            ];
            return this.database
              .executeSql(
                'INSERT INTO ORIG_INCOME_DETAILS(refId, id,category,incometype,grossincome,statutory,other,netincome,incomeyesno,employname,doj,esob,lengthinservice, userType) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', data).then(
                  data => {
                    // alert(JSON.stringify(data));

                    return data;
                  },
                  err => {
                    console.log('Error: ', err);
                    return err;
                  }
                );
          }
        },
        err => {
          console.log('Error: ', err);
          // alert(JSON.stringify(err));
          return err;
        }
      );
  }

  addExpenceDetails(
    refId,
    id,
    description,
    expense,
    totalexpences,
    overallexpences
  ) {
    //alert("passed id===>" + id);
    let data = [
      refId,
      id,
      description,
      expense,
      totalexpences,
      overallexpences
    ];
    // alert("referenceid:" + data);
    return this.database
      .executeSql(
        'INSERT INTO ORIG_EXPENSE_DETAILS(refId, id,description,expense,totalexpences,overallexpences) VALUES (?,?,?,?,?,?)',
        data
      )
      .then(
        data => {
          //  alert(JSON.stringify(data));

          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  getotherdocadded(refid, docid, id) {
    let data = [refid, docid, id];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_OTHERDOC_DETAILS WHERE refId=? and otherdocid=? and id=?',
        data
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          return [];
        }
      );
  }
  addOtherDetails(refId, id, otherdes, otherdoctype, otherdocid, prd_code) {
    // alert("passed id===>" + id);
    let data = [refId, id, otherdes, otherdoctype, otherdocid, prd_code];
    //alert(JSON.stringify(data));
    // alert("referenceid:" + data);
    return this.database
      .executeSql(
        'INSERT INTO ORIG_OTHERDOC_DETAILS(refId, id,otherdes,otherdoctype,otherdocid,loan_product) VALUES (?,?,?,?,?,?)',
        data
      )
      .then(
        data => {
          // alert(JSON.stringify(data));

          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  addOtherincomeDetails(refId, id, iname, iotamount) {
    //alert("passed lenth===>" + otherincome.length);
    // alert("passed otherincome===>" +JSON.stringify(otherincome));
    // console.log(otherincome);
    //for(var i=0;i<otherincome.length;i++){
    let data = [refId, id, iname, iotamount];
    //alert("otherincome data:" + data);
    return this.database
      .executeSql(
        'INSERT INTO ORIG_OTHERINCOME_DETAILS(refId, id,otherincome,amount) VALUES (?,?,?,?)',
        data
      )
      .then(
        data => {
          //alert(JSON.stringify(data));

          return data;
        },

        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  addobligatinDetails(refId, id, bname, emiamount,userType) {
    //alert("passed lenth===>" + otherincome.length);
    // alert("passed otherincome===>" +JSON.stringify(otherincome));
    // console.log(otherincome);
    //for(var i=0;i<otherincome.length;i++){
    let data = [refId, id, bname, emiamount, userType];
    //alert("addobligatinDetails data:" + data);
    return this.database
      .executeSql(
        'INSERT INTO ORIG_BANK_DETAILS(refId, id,bname,emiamount,userType) VALUES (?,?,?,?,?)',
        data
      )
      .then(
        data => {
          //alert(JSON.stringify(data));

          return data;
        },

        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  addOtherexpenceDetails(refId, id, otherex, otiamount) {
    //alert("passed lenth===>" + otherincome.length);
    // alert("passed otherincome===>" +JSON.stringify(otherincome));
    // console.log(otherincome);
    //for(var i=0;i<otherincome.length;i++){
    let data = [refId, id, otherex, otiamount];
    //alert("otherincome data:" + data);
    return this.database
      .executeSql(
        'INSERT INTO ORIG_OTHEREXPENCES_DETAILS(refId, id,otherexpence,amount) VALUES (?,?,?,?)',
        data
      )
      .then(
        data => {
          //alert(JSON.stringify(data));

          return data;
        },

        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  addOtherdocImgDetails(refId, id, otherdocid, otherdocimg, loan_prd) {
    //alert("passed lenth===>" + otherincome.length);
    // alert("passed otherincome===>" +JSON.stringify(otherincome));
    // console.log(otherincome);
    //for(var i=0;i<otherincome.length;i++){
    let data = [refId, id, otherdocid, otherdocimg, loan_prd];
    //alert("addOtherdocImgDetails data:" + data);
    return this.database
      .executeSql(
        'INSERT INTO ORIG_OTHERDOCIMG_DETAILS(refId, id,otherdocid,otherimgpath,loan_product) VALUES (?,?,?,?,?)',
        data
      )
      .then(
        data => {
          // alert(JSON.stringify(data));
          return data;
        },

        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  updateOtherincomeDetails(refId, id, iname, iotamount, otherincomeid) {
    //alert("passed lenth===>" + otherincome.length);
    //alert("passed otherincomeid===>" +JSON.stringify(otherincomeid));
    console.log('passed otherincomeid===>' + otherincomeid);
    //for(var i=0;i<otherincome.length;i++){

    if (otherincomeid == '' || otherincomeid == null) {
      // alert("insert works passed otherincomeid===>" +JSON.stringify(otherincomeid));
      let data = [refId, id, iname, iotamount];
      //alert("otherincome data:" + data);
      return this.database
        .executeSql(
          'INSERT INTO ORIG_OTHERINCOME_DETAILS(refId,id,otherincome,amount) VALUES (?,?,?,?)',
          data
        )
        .then(
          data => {
            //alert(JSON.stringify(data));

            return data;
          },

          err => {
            console.log('Error: ', err);
            return err;
          }
        );
    } else {
      let data = [iname, iotamount, id, refId, otherincomeid];
      console.log(JSON.stringify(data));
      // alert("upadate works passed otherincomeid===>" +JSON.stringify(otherincomeid));
      return this.database
        .executeSql(
          'UPDATE ORIG_OTHERINCOME_DETAILS SET otherincome=?,amount=? WHERE id=? and refId=? and otherincomeid=?',
          data
        )
        .then(
          data => {
            return data;
          },
          err => {
            console.log('Error: ', err);
            return err;
          }
        );
    }
  }

  updateObligationDetails(refId, id, bname, emiamount, bankid,userType ) {
    //alert("passed lenth===>" + otherincome.length);
    //alert("passed otherincomeid===>" +JSON.stringify(otherincomeid));
    console.log('passed obligation bank===>' + bankid);
    //for(var i=0;i<otherincome.length;i++){

    if (bankid == '' || bankid == null) {
      // alert("insert works passed bankid===>" +JSON.stringify(bankid));
      let data = [refId, id, bname, emiamount,userType];
      //alert("otherincome data:" + data);
      return this.database
        .executeSql(
          'INSERT INTO ORIG_BANK_DETAILS(refId, id,bname,emiamount,userType) VALUES (?,?,?,?,?)',
          data
        )
        .then(
          data => {
            //alert(JSON.stringify(data));

            return data;
          },

          err => {
            console.log('Error: ', err);
            return err;
          }
        );
    } else {
      let data = [bname, emiamount, refId, id, bankid];
      console.log(JSON.stringify(data));
      //alert("upadate works passed bankid===>" +JSON.stringify(bankid));
      return this.database
        .executeSql(
          'UPDATE ORIG_BANK_DETAILS SET bname=?,emiamount=? where refId=? and id=? and bankid=?',
          data
        )
        .then(
          data => {
            return data;
          },
          err => {
            console.log('Error: ', err);
            return err;
          }
        );
    }
  }

  updateOtherexpenceDetails(refId, id, otherex, otiamount, otherexpenceid) {
    //alert("passed lenth===>" + otherincome.length);
    //alert("passed otherincomeid===>" +JSON.stringify(otherexpenceid));
    console.log('passed otherincomeid===>' + otherexpenceid);
    //for(var i=0;i<otherincome.length;i++){

    if (otherexpenceid == '' || otherexpenceid == null) {
      //alert("insert works passed otherincomeid===>" +JSON.stringify(otherexpenceid));
      let data = [refId, id, otherex, otiamount];
      //alert("otherincome data:" + data);
      return this.database
        .executeSql(
          'INSERT INTO ORIG_OTHEREXPENCES_DETAILS(refId, id,otherexpence,amount) VALUES (?,?,?,?)',
          data
        )
        .then(
          data => {
            //alert(JSON.stringify(data));

            return data;
          },

          err => {
            console.log('Error: ', err);
            return err;
          }
        );
    } else {
      let data = [otherex, otiamount, refId, id, otherexpenceid];
      console.log(JSON.stringify(data));
      //alert("upadate works passed otherincomeid===>" +JSON.stringify(otherexpenceid));
      return this.database
        .executeSql(
          'UPDATE ORIG_OTHEREXPENCES_DETAILS SET otherexpence=?,amount=? where refId=? and id=? and otherexpenceid=?',
          data
        )
        .then(
          data => {
            return data;
          },
          err => {
            console.log('Error: ', err);
            return err;
          }
        );
    }
  }

  updateOtherdocDetails(
    refId,
    otherdes,
    otherdoctype,
    docid,
    prd_code,
    otherid
  ) {
    //alert("update id===>" + otherid);
    let data = [otherdes, otherdoctype, docid, prd_code, refId, otherid];
    console.log(JSON.stringify(data));
    return this.database
      .executeSql(
        'UPDATE ORIG_OTHERDOC_DETAILS SET otherdes=?,otherdoctype=?,otherdocid=?  WHERE loan_product=? and  refId=? and otherid=?',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  getDetails() {
    return this.database
      .executeSql("SELECT * FROM ORIG_APPLICATION  WHERE usertype='A'", [])
      .then(
        data => {
          let details = [];
          //console.log(data);
          // alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                firstName: data.rows.item(i).firstName,
                middleName: data.rows.item(i).middleName,
                lastName: data.rows.item(i).lastName,
                gender: data.rows.item(i).gender,
                stateName: data.rows.item(i).stateName,
                cityName: data.rows.item(i).cityName,
                imagepath: data.rows.item(i).imagepath,
                filled:data.rows.item(i).filled,
                usertype: data.rows.item(i).usertype,
                id: data.rows.item(i).id
              });
            }
          }
          //this.databaseReady.next(true);
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getcoappDetails(refId) {
    // alert("refin coapp===>" + refId);
    let data = [refId];
    return this.database
      .executeSql(
        "SELECT * FROM ORIG_APPLICATION  WHERE usertype='C' and refId=?",
        data
      )
      .then(
        data => {
          let details = [];
          //console.log(data);
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              let state;
              let gender;

              // let selectedState = this.globalFunction
              //   .getFullStateMaster()
              //   .find(f => {
              //     return f.sgmStateCode === data.rows.item(i).stateName;
              //   });

              // let selectedGender = this.globalFunction
              //   .getGenderList()
              //   .find(f => {
              //     return f.llvOptionVal === data.rows.item(i).gender;
              //   });
              // if (selectedGender != undefined && selectedGender != '') {
              //   gender = selectedGender.llvOptionDesc;
              // } else {
              //   gender = '';
              // }

              // if (selectedState != undefined && selectedState != '') {
              //   state = selectedState.sgmStateName;
              // } else {
              //   state = '';
              // }
              details.push({
                refId: data.rows.item(i).refId,
                firstName: data.rows.item(i).firstName,
                middleName: data.rows.item(i).middleName,
                lastName: data.rows.item(i).lastName,
                gender: gender,
                phone:data.rows.item(i).phone,
                email:data.rows.item(i).email,
                stateName: state,
                cityName: data.rows.item(i).cityName,
                imagepath: data.rows.item(i).imagepath,
                usertype: data.rows.item(i).usertype,
                filled: data.rows.item(i).filled,
                id: data.rows.item(i).id
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getguappDetails(refId) {
    //  alert("refin coapp===>" + refId);
    let data = [refId];
    return this.database
      .executeSql(
        "SELECT * FROM ORIG_APPLICATION  WHERE usertype='G' and refId=?",
        data
      )
      .then(
        data => {
          let details = [];
          //console.log(data);
          // alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              let state;
              let gender;

             /*  let selectedState = this.globalFunction
                .getFullStateMaster()
                .find(f => {
                  return f.sgmStateCode === data.rows.item(i).stateName;
                });

              let selectedGender = this.globalFunction
                .getGenderList()
                .find(f => {
                  return f.llvOptionVal === data.rows.item(i).gender;
                });
              if (selectedGender != undefined && selectedGender != '') {
                gender = selectedGender.llvOptionDesc;
              } else {
                gender = '';
              }

              if (selectedState != undefined && selectedState != '') {
                state = selectedState.sgmStateName;
              } else {
                state = '';
              } */

              details.push({
                refId: data.rows.item(i).refId,
                firstName: data.rows.item(i).firstName,
                middleName: data.rows.item(i).middleName,
                lastName: data.rows.item(i).lastName,
                gender: gender,
                stateName: state,
                phone:data.rows.item(i).phone,
                email:data.rows.item(i).email,
                imagepath: data.rows.item(i).imagepath,
                usertype: data.rows.item(i).usertype,
                filled: data.rows.item(i).filled,
                id: data.rows.item(i).id
              });

              console.log(details, "values of gurantor");
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getpersonalDetails(refid, id) {
    // alert("personal service get id===>" + id);
    let data = [refid, id];
    return this.database
      .executeSql('SELECT * FROM ORIG_APPLICATION WHERE refId=? and id=?', data)
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getloanDetails(refid, id) {
    // alert("refin service===>"+refid);
    let data = [refid, id];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_LOAN_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getkycDetails_proof(refid, id, kycid) {
    //alert("refin kyc get service===>"+refid);
    let data = [refid, id, kycid];
    return this.database
      .executeSql('SELECT * FROM ORIG_KYC_DETAILS WHERE refId=? and id=? and kycid=?', data)
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getkycDetails(refid, id) {
    //alert("refin kyc get service===>"+refid);
    let data = [refid, id];
    return this.database
      .executeSql('SELECT * FROM ORIG_KYC_DETAILS WHERE refId=? and id=?', data)
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }


  getincomeDetails(refid, id) {
    //alert("refin kyc get service===>"+refid);
    let data = [refid, id];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_INCOME_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          let details = [];
          console.log(data, "from sqlite income function");
          // alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({

                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                category: data.rows.item(i).category,
                incometype: data.rows.item(i).incometype,
                grossincome: data.rows.item(i).grossincome,
                statutory: data.rows.item(i).statutory,
                other: data.rows.item(i).other,
                netincome: data.rows.item(i).netincome,
                empName: data.rows.item(i).employname,
                doj: data.rows.item(i).doj,
                eosb: data.rows.item(i).esob,
                lengthService: data.rows.item(i).lengthinservice,

                // category: data.rows.item(i).category,
                // incometype: data.rows.item(i).incometype,
                // grossincome: data.rows.item(i).grossincome,
                // statutory: data.rows.item(i).statutory,
                // other: data.rows.item(i).other,
                // netincome: data.rows.item(i).netincome,
                // incomeyesno: data.rows.item(i).incomeyesno,



              });
            }
          }
          //this.databaseReady.next(true);
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getexpenceDetails(refid, id) {
    //alert("refin kyc get service===>"+refid);
    let data = [refid, id];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_EXPENSE_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          let details = [];
          //console.log(data);
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                description: data.rows.item(i).description,
                expense: data.rows.item(i).expense,
                totalexpences: data.rows.item(i).totalexpences,
                overallexpences: data.rows.item(i).overallexpences,
                id: data.rows.item(i).id
              });
            }
          }
          //this.databaseReady.next(true);
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getotherDetails(refid, id) {
    //alert("refin kyc get service===>"+refid);
    let data = [refid, id];
    //alert(JSON.stringify(data));
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_OTHERDOC_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          let details = [];
          console.log(data);
          //alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                otherdes: data.rows.item(i).otherdes,
                otherdoctype: data.rows.item(i).otherdoctype,
                otherid: data.rows.item(i).otherid,
                id: data.rows.item(i).id,
                otherdocid: data.rows.item(i).otherdocid,
                loan_product: data.rows.item(i).loan_product
              });
            }
          }
          //this.databaseReady.next(true);
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getotherincomeDetails(refid, id) {
    //alert("refin kyc get service===>"+refid);
    let data = [refid, id];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_OTHERINCOME_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          let details = [];
          console.log(data);
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                otherincome: data.rows.item(i).otherincome,
                amount: data.rows.item(i).amount,
                otherincomeid: data.rows.item(i).otherincomeid,
                id: data.rows.item(i).id
              });
            }
          }
          //this.databaseReady.next(true);
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getobligationDetails(refid, id) {
    //alert("refin kyc get service===>"+refid);
    let data = [refid, id];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_BANK_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          let details = [];
          console.log(data);
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                bname: data.rows.item(i).bname,
                emiamount: data.rows.item(i).emiamount,
                bankid: data.rows.item(i).bankid,
                id: data.rows.item(i).id
              });
            }
          }
          //this.databaseReady.next(true);
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getotherexpenceDetails(refid, id) {
    //alert("refin kyc get service===>"+refid);
    let data = [refid, id];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_OTHEREXPENCES_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          let details = [];
          console.log(data);
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                otherexpence: data.rows.item(i).otherexpence,
                amount: data.rows.item(i).amount,
                otherexpenceid: data.rows.item(i).otherexpenceid,
                id: data.rows.item(i).id
              });
            }
          }
          //this.databaseReady.next(true);
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getOtherImgDetail(refid, otherdocid) {
    // alert("refin service===>"+refid);
    let data = [refid, otherdocid];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_OTHERDOCIMG_DETAILS WHERE refId=? and otherdocid=?',
        data
      )
      .then(
        data => {
          let details = [];
          //console.log(data);
          // alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                otherdocid: data.rows.item(i).otherdocid,
                otherimgid: data.rows.item(i).otherimgid,
                otherimgpath: data.rows.item(i).otherimgpath,
                id: data.rows.item(i).id
              });
            }
          }
          //this.databaseReady.next(true);
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  updatepersonalDetails(
    refId,
    value,
    sameValue,
    imagepath,
    id
    // title,
    // firstName,
    // middleName,
    // lastName,
    // gender,
    // dob,
    // phone,
    // email,
    // address,
    // address2,
    // state,
    // city,
    // district,
    // pincode,
    // permaddress1,
    // permaddress2,
    // permstate,
    // permcity,
    // permdistrict,
    // permpincode,
    // ionCheck,
    // id,
    // base64Image,
    // apprelation,
    // companyName
  ) {
    // alert("update id===>" + id);
    let data = [
      value.title,
      value.firstName,
      value.middleName,
      value.lastName,
      value.gender,
      value.dob,
      value.phone,
      value.email,
      value.address,
      value.address2,
      value.state,
      value.city,
      value.district,
      value.pincode,
      value.customerCategory,
      value.custNationality,
      value.stlCustomer,
      value.custType,
      value.bankingWith,
      value.vipFlag,
      value.incomeAssign,
      value.cbrbResult,
      value.alEthiadBureau,
      value.accNo,
      value.passportNo,
      value.eidaNo,
      value.rimNo,
      value.poBoxNo,
      sameValue,
      imagepath,
      refId,
      id
    ];
    return this.database
      .executeSql(
        'UPDATE ORIG_APPLICATION SET  title=?, firstName=?, middleName=?, lastName=?, gender=?, dob=?, phone=?, email=?, address1=?, address2=?, stateName=?,cityName=?,districtName=?, pincode=?,custCategory=?,nationality=?,stlCust=?,CustType=?,bankingWith=?,vipFlag=?,incomeAssg=?,cbrbRes=?,alEthiadBureau=?,accNo=?,passportNo=?,eidaNo=?,rimNo=?,poBoxNo=?,sameValue=?,imagepath=? WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  updateloanDetails(
    refId,
    value,
    id
  ) {
    // alert("selectupdate id===>"+id);
    // alert("selectupdate id===>"+refId);
    let data = [refId, id];
    return this.database
      .executeSql(
        'SELECT * FROM  ORIG_LOAN_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          // alert(data.rows.length);
          if (data.rows.length > 0) {
            //  alert("update id===>"+id);
            //  alert("update id===>"+refId);
            let data = [
              refId,
              value.product,
              value.producttype,
              value.amount,
              value.tenure,
              value.moratorium,
              value.interesttype,
              value.mclr,
              value.loanpurpose,
              value.loan_amount_range,
              value.repaymentMode,
              value.repaymentType,
              value.proposalType,
              value.amortization,
              id
            ];
            console.log(JSON.stringify(data));
            return this.database
              .executeSql(
                'UPDATE ORIG_LOAN_DETAILS SET product=?,producttype=?,amount=?, tenure=?, moratorium=?,  interesttype=?,mclr=?,loan_purpose=?,loan_amount_range=?,repaymentMode=?,repaymentType=?,proposalType=?,amortization=?  WHERE id=? and refId=?',
                data
              )
              .then(
                data => {
                  return data;
                },
                err => {
                  console.log('Error: ', err);
                  return err;
                }
              );
          } else {
            //  alert("insertupdate id===>"+id);
            //  alert("insertupdate id===>"+refId);
            let data = [
              refId,
              id,
              value.product,
              value.producttype,
              value.amount,
              value.tenure,
              value.moratorium,
              value.interesttype,
              value.mclr,
              value.loanpurpose,
              value.loan_amount_range,
              value.repaymentMode,
              value.repaymentType,
              value.proposalType,
              value.amortization
            ];
            return this.database
              .executeSql(
                'INSERT INTO ORIG_LOAN_DETAILS(refId,id,product,producttype,amount, tenure, moratorium, interesttype,mclr,loan_purpose,loan_amount_range,repaymentMode,repaymentType,proposalType,amortization) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                data
              )
              .then(
                data => {
                  //  alert(JSON.stringify(data));

                  return data;
                },
                err => {
                  console.log('Error: ', err);
                  return err;
                }
              );
          }
        },
        err => {
          console.log('Error: ', err);
          // alert(JSON.stringify(err));
          return err;
        }
      );
  }

  // updateloanDetails(refId, product, amount, tenure, moratorium, rio, cost, id) {
  //   alert("update id===>" + id);
  //   let data = [product, amount, tenure, moratorium, rio, cost, refId, id]
  //   console.log(JSON.stringify(data));
  //   return this.database.executeSql("UPDATE ORIG_LOAN_DETAILS SET product=?,amount=?, tenure=?, moratorium=?, rio=?, cost=? ,refId=? WHERE id=?", data).then(data => {
  //     return data;
  //   }, err => {
  //     console.log('Error: ', err);
  //     return err;
  //   });
  // }

  updatekycDetails(refId, pannumber, aadharnumber, id, imgadd) {
    //  alert("selectupdate id===>"+id);
    // alert("selectupdate id===>"+refId);
    let data = [refId, id];
    return this.database
      .executeSql('SELECT * FROM ORIG_KYC_DETAILS WHERE refId=? and id=?', data)
      .then(
        data => {
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            // alert("update id===>"+id);
            // alert("update id===>"+refId);
            let data = [pannumber, aadharnumber, refId, id];
            return this.database
              .executeSql(
                'UPDATE ORIG_KYC_DETAILS SET pannumber=?,aadharnumber=?,refId=? WHERE id=?',
                data
              )
              .then(
                data => {
                  //  alert(JSON.stringify(data));
                  return data;
                },
                err => {
                  console.log('Error: ', err);
                  return err;
                }
              );
          } else {
            // alert("insertupdate id===>"+id);
            // alert("insertupdate id===>"+refId);
            let data = [refId, id, pannumber, aadharnumber,imgadd];
            return this.database
              .executeSql(
                'INSERT INTO ORIG_KYC_DETAILS(refId,id,pannumber,aadharnumber,imgadd) VALUES (?,?,?,?,?)',
                data
              )
              .then(
                data => {
                  // alert(JSON.stringify(data));

                  return data;
                },
                err => {
                  console.log('Error: ', err);
                  return err;
                }
              );
          }
        },
        err => {
          console.log('Error: ', err);
          //  alert(JSON.stringify(err));
          return err;
        }
      );
  }

  updateincomeDetails(
    refId,
    category,
    incometype,
    grossincome,
    statutory,
    other,
    netincome,
    incomeyesno,
    employname,
    doj,
    esob,
    lengthinservice,
    id
  ) {
    //  alert("selectupdate id===>"+id);
    //  alert("selectupdate id===>"+refId);
    let data = [refId, id];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_INCOME_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            //   alert("update id===>"+id);
            //  alert("update id===>"+refId);
            let data = [
              category,
              incometype,
              grossincome,
              statutory,
              other,
              netincome,
              incomeyesno,
              employname,
              doj,
              esob,
              lengthinservice,
              refId,
              id
            ];
            return this.database
              .executeSql(
                'UPDATE ORIG_INCOME_DETAILS SET category=?,incometype=?,grossincome=?,statutory=?,other=?,netincome=?,incomeyesno=?,employname=?,doj=?,esob=?,lengthinservice=?,refId=? WHERE id=?', data).then(
                  data => {
                    //   alert(JSON.stringify(data));
                    return data;
                  },
                  err => {
                    console.log('Error: ', err);
                    return err;
                  }
                );
          } else {
            // alert("insertupdate id===>"+id);
            // alert("insertupdate id===>"+refId);
            let data = [
              refId,
              id,
              category,
              incometype,
              grossincome,
              statutory,
              other,
              netincome,
              incomeyesno,
              employname,
              doj,
              esob,
              lengthinservice,
            ];
            return this.database
              .executeSql(
                'INSERT INTO ORIG_INCOME_DETAILS(refId, id,category,incometype,grossincome,statutory,other,netincome,incomeyesno,employname,doj,esob,lengthinservice) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', data)
              .then(
                data => {
                  // alert(JSON.stringify(data));

                  return data;
                },
                err => {
                  console.log('Error: ', err);
                  return err;
                }
              );
          }
        },
        err => {
          console.log('Error: ', err);
          // alert(JSON.stringify(err));
          return err;
        }
      );
  }

  updateexpenceDetails(
    refId,
    description,
    expense,
    totalexpences,
    overallexpences,
    id
  ) {
    //  alert("selectupdate id===>"+id);
    // alert("selectupdate id===>"+refId);
    let data = [refId, id];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_EXPENSE_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          // alert(data.rows.length);
          if (data.rows.length > 0) {
            //  alert("update id===>"+id);
            // alert("update id===>"+refId);
            let data = [
              description,
              expense,
              totalexpences,
              overallexpences,
              refId,
              id
            ];
            return this.database
              .executeSql(
                'UPDATE ORIG_EXPENSE_DETAILS SET description=?,expense=?,totalexpences=?,overallexpences=? WHERE refId=? and  id=?',
                data
              )
              .then(
                data => {
                  //  alert(JSON.stringify(data));
                  return data;
                },
                err => {
                  console.log('Error: ', err);
                  return err;
                }
              );
          } else {
            // alert("insertupdate id===>"+id);
            //  alert("insertupdate id===>"+refId);
            let data = [
              refId,
              id,
              description,
              expense,
              totalexpences,
              overallexpences
            ];
            return this.database
              .executeSql(
                'INSERT INTO ORIG_EXPENSE_DETAILS(refId, id,description,expense,totalexpences,overallexpences) VALUES (?,?,?,?,?,?)',
                data
              )
              .then(
                data => {
                  //  alert(JSON.stringify(data));

                  return data;
                },
                err => {
                  console.log('Error: ', err);
                  return err;
                }
              );
          }
        },
        err => {
          console.log('Error: ', err);
          // alert(JSON.stringify(err));
          return err;
        }
      );
  }

  removeDetails(refId) {
    //  alert("refid==>"+refId);
    return (
      this.database.executeSql('DELETE FROM ORIG_APPLICATION where refId=?', [
        refId
      ]),
      this.database.executeSql('DELETE FROM ORIG_KYC_DETAILS where refId=?', [
        refId
      ]),
      this.database.executeSql('DELETE FROM ORIG_PAN_DETAILS where refId=?', [
        refId
      ]),
      this.database.executeSql(
        'DELETE FROM ORIG_PROOFIMG_DETAILS where refId=?',
        [refId]
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_PANIMG_DETAILS where refId=?',
        [refId]
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_AADHARIMG_DETAILS where refId=?',
        [refId]
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_INCOME_DETAILS where refId=?',
        [refId]
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_EXPENSE_DETAILS where refId=?',
        [refId]
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_OTHERDOC_DETAILS where refId=?',
        [refId]
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_OTHERDOCIMG_DETAILS where refId=?',
        [refId]
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_OTHERINCOME_DETAILS where refId=?',
        [refId]
      ),
      this.database.executeSql('DELETE FROM ORIG_BANK_DETAILS where refId=?', [
        refId
      ]),
      this.database.executeSql(
        'DELETE FROM ORIG_OTHEREXPENCES_DETAILS where refId=?',
        [refId]
      ),
      this.database
        .executeSql('DELETE FROM ORIG_LOAN_DETAILS where refId=?', [refId])
        .then(
          data => {
            return data;
          },
          err => {
            console.log(err);
            return err;
          }
        )
    );
  }
  removeotherincomeDetails(otherincomeid) {
    let data = [otherincomeid];
    //alert("Remove Othe Detail==>"+data);
    return this.database
      .executeSql(
        'DELETE FROM ORIG_OTHERINCOME_DETAILS where otherincomeid=?',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log(err);
          return err;
        }
      );
  }
  removeotherDetails(refId, id) {
    let data = [refId, id];
    //alert("Remove Othe Detail==>"+data);
    return (
      this.database.executeSql(
        'DELETE FROM ORIG_OTHERDOC_DETAILS where refId=? and otherid=?',
        data
      ),
      this.database
        .executeSql(
          'DELETE FROM ORIG_OTHERDOCIMG_DETAILS where refId=? and otherdocid=?',
          data
        )
        .then(
          data => {
            return data;
          },
          err => {
            console.log(err);
            return err;
          }
        )
    );
  }
  removeotherObligationDetails(bankid) {
    let data = [bankid];
    //alert("Remove Othe Detail==>" + data);
    return this.database
      .executeSql('DELETE FROM ORIG_BANK_DETAILS where bankid=?', data)
      .then(
        data => {
          return data;
        },
        err => {
          console.log(err);
          return err;
        }
      );
  }
  updateexpense(refid, id, exp) {
    let data = [exp, refid, id];
    return this.database.executeSql(
      'UPDATE ORIG_EXPENSE_DETAILS set overallexpences=? where refId=? and id=?',
      data
    );
  }
  clearallIncome(refid, id) {
    let data = [refid, id];
    return (
      this.database.executeSql(
        "UPDATE ORIG_INCOME_DETAILS set category='',incometype='',grossincome='',statutory='',other='',netincome='' where refId=? and id=?",
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_EXPENSE_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_BANK_DETAILS where refId=? and id=?',
        data
      ),
      this.database
        .executeSql(
          'DELETE FROM ORIG_OTHERINCOME_DETAILS where refId=? and id=?',
          data
        )
        .then(
          data => {
            //alert("Prove: " + JSON.stringify(data));
            return data;
          },
          err => {
            console.log(err);
            return err;
          }
        )
    );
  }
  removeotherExpencesDetails(otherexpenceid) {
    let data = [otherexpenceid];
    //alert("Remove Othe Detail==>" + data);
    return this.database
      .executeSql(
        'DELETE FROM ORIG_OTHEREXPENCES_DETAILS where otherexpenceid=?',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log(err);
          return err;
        }
      );
  }
  // updatekycDetails(refId,pannumber,aadharnumber,id) {
  //   alert("update id===>"+id);
  //   let data = [pannumber,aadharnumber,refId,id]
  //   console.log(JSON.stringify(data));
  //   return this.database.executeSql("UPDATE ORIG_KYC_DETAILS SET pannumber=?,aadharnumber=?,refId=? WHERE id=?", data).then(data => {
  //     return data;
  //   }, err => {
  //     console.log('Error: ', err);
  //     return err;
  //   });
  // }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  setName(uname: string) {
    this.name = uname;
  }
  getName() {
    return this.name;
  }
  // getDetails() {
  //   return this.database.executeSql("SELECT * FROM ORIG_APPLICATION",[]).then(data => {
  //     let details = [];
  //       console.log(data);
  //       alert(data.rows.length);
  //     if (data.rows.length > 0) {
  //       for (var i = 0; i < data.rows.length; i++) {

  //         details.push({ firstName: data.rows.item(i).firstName, middleName: data.rows.item(i).middleName, lastName: data.rows.item(i).lastName, gender: data.rows.item(i).gender, dob: data.rows.item(i).dob , address1: data.rows.item(i).address1 , address2: data.rows.item(i).address2,stateName: data.rows.item(i).stateName,cityName: data.rows.item(i).cityName,pincode: data.rows.item(i).pincode,imagepath: data.rows.item(i).imagepath, id:data.rows.item(i).id});
  //       }
  //     }
  //     return details;
  //   }, err => {
  //     console.log('Error: ', err);
  //     return [];
  //   });
  // }

  // updateDetails(firstName, lastName,mobileNo,base64Image,id) {
  //   let data = [firstName, lastName, mobileNo,base64Image,id]
  //   return this.database.executeSql("UPDATE APPLICATION SET firstName=?, lastName=?, mobileNo=?,base64Image=? WHERE id=?", data).then(data => {
  //     return data;
  //   }, err => {
  //     console.log('Error: ', err);
  //     return err;
  //   });
  // }

  // removeDetails (userid) {
  //   return this.database.executeSql("DELETE FROM APPLICATION WHERE id=?",[userid]).then(data => {
  //     return data;
  //   }, err => {
  //     console.log('Error: ', err);
  //     return err;
  //   });
  // }

  // addIncomeDetails(refId, id,category,incometype,grossincome,statutory,other,netincome,incomeyesno) {
  //   //alert("passed id===>" + id);
  //   alert(incomeyesno);
  //   let data = [refId, id,category,incometype,grossincome,statutory,other,netincome,incomeyesno]
  //   //alert("referenceid:" + data);
  //   return this.database.executeSql("INSERT INTO ORIG_INCOME_DETAILS(refId, id,category,incometype,grossincome,statutory,other,netincome,incomeyesno) VALUES (?,?,?,?,?,?,?,?,?)", data).then(data => {
  //    // alert(JSON.stringify(data));

  //     return data;
  //   }, err => {
  //     console.log('Error: ', err);
  //     return err;
  //   });
  //}
  getdummyincomeDetails(refid, id) {
    let data = [refid, id];

    return this.database
      .executeSql(
        'select * from ORIG_INCOME_DETAILS where refId=? and id=?',
        data
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }
  updatedummyincomedetails(refId, id, dummyvalue) {
    let data = [dummyvalue, refId, id];

    return this.database
      .executeSql(
        'UPDATE ORIG_INCOME_DETAILS set incomeyesno=? where refId=? and id=?',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }
  DummyIncomeDetails(refId, id, dummyvalue, usertype) {
    //alert("passed id===>" + id);
    //alert(dummyvalue);
    let data = [refId, id, dummyvalue, usertype];
    //alert("referenceid:" + data);
    return this.database
      .executeSql(
        'INSERT INTO ORIG_INCOME_DETAILS(refId, id,incomeyesno, userType) VALUES (?,?,?,?)',
        data
      )
      .then(
        data => {
          // alert(JSON.stringify(data));

          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }
  DummyPanDetails(refId, id) {
    //alert("passed id===>" + id);
    //alert(dummyvalue);
    let data = [refId, id];
    //alert("referenceid:" + data);
    return this.database
      .executeSql('INSERT INTO ORIG_PAN_DETAILS(refId, id) VALUES (?,?)', data)
      .then(
        data => {
          //alert(JSON.stringify(data));

          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  leftjoinDetails() {
    //alert("refin kyc get service===>"+refid);
    //let data = [refid, id]
    return this.database
      .executeSql(
        "SELECT a.refId,a.id,a.firstName,a.imagepath,a.filled,b.product,b.amount,b.loanid,  ro.app_reference_number,ro.app_submit_status FROM ORIG_APPLICATION a LEFT OUTER JOIN ORIG_LOAN_DETAILS b ON a.refId=b.refId LEFT OUTER JOIN ORIG_APP_DETAILS ro ON a.refId=ro.id WHERE a.usertype='A'",
        []
      )
      .then(
        data => {
          let details = [];
          //console.log(data);
          //alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              if (
                data.rows.item(i).amount == null ||
                data.rows.item(i).amount == ''
              ) {
                data.rows.item(i).amount = '0.0';
                //alert( data.rows.item(i).amount);
              }
              let pro;
              if (
                data.rows.item(i).product == null ||
                data.rows.item(i).product == ''
              ) {
                pro = 'No Product';
                //alert( data.rows.item(i).amount);
              } else {
                // let selectedPro = this.globalFunction
                //   .getFullProductList()
                //   .find(f => {
                //     return f.lpdProdNewId === data.rows.item(i).product;
                //   });
                // if (selectedPro != undefined && selectedPro != '') {
                //   pro = selectedPro.lpdPrdDesc;
                // } else {
                //   pro = '';
                // }
                pro = 'Personal Loan';
              }

              details.push({
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                firstName: data.rows.item(i).firstName,
                imagepath: data.rows.item(i).imagepath,
                filled: data.rows.item(i).filled,
                product: pro,
                amount: data.rows.item(i).amount,
                app_reference_number: data.rows.item(i).app_reference_number,
                app_submit_status: data.rows.item(i).app_submit_status,

              });
            }
          }
          //this.databaseReady.next(true);
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getappDetails(refid) {
    return this.database
      .executeSql(
        "SELECT a.refId,a.id,a.firstName,a.imagepath,a.filled,b.product,b.amount,ro.app_reference_number,ro.app_submit_status FROM ORIG_APPLICATION a LEFT OUTER JOIN ORIG_LOAN_DETAILS b ON a.refId=b.refId LEFT OUTER JOIN ORIG_APP_DETAILS ro ON a.refId=ro.id WHERE a.usertype='A' and a.refId=?",
        [refid]
      )
      .then(
        data => {
          let details = [];

          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              if (
                data.rows.item(i).amount == null ||
                data.rows.item(i).amount == ''
              ) {
                data.rows.item(i).amount = '0.0';
              }
              let pro;
              if (
                data.rows.item(i).product == null ||
                data.rows.item(i).product == ''
              ) {
                pro = 'No Product';
              } else {
                let selectedPro = this.globalFunction
                  .getFullProductList()
                  .find(f => {
                    return f.lpdProdNewId === data.rows.item(i).product;
                  });
                if (selectedPro != undefined && selectedPro != '') {
                  pro = selectedPro.lpdPrdDesc;
                } else {
                  pro = '';
                }
              }

              details.push({
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                firstName: data.rows.item(i).firstName,
                imagepath: data.rows.item(i).imagepath,
                filled: data.rows.item(i).filled,
                product: pro,
                amount: data.rows.item(i).amount,
                app_reference_number: data.rows.item(i).app_reference_number,
                app_submit_status: data.rows.item(i).app_submit_status
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  /**********************/

  addKYCDetails(refId, id, kycDesc, kycNum, imgadd) {
    let data = [refId, id, kycDesc, kycNum, imgadd];
    //    alert("prove: " + JSON.stringify(data));
    return this.database
      .executeSql(
        'INSERT INTO ORIG_KYC_DETAILS(refId, id, kycDesc, kycNum, imgadd) VALUES(?,?,?,?,?)',
        data
      )
      .then(
        data => {
          //    alert("return prove: " + JSON.stringify(data));
          return data;
        },
        error => {
          //  console.log("provider kyc add error: " + error);
          return error;
        }
      );
  }
  getKycallreadyadded(refid, id, des) {
    let data = [refid, id, des];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_KYC_DETAILS WHERE refId=? and id=? and kycDesc=?',
        data
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          return [];
        }
      );
  }
  getKycDetails(refId, id) {
    let data = [refId, id];
    //    console.log("refId: " + refId + " id: " + id);
    return this.database
      .executeSql('SELECT * FROM ORIG_KYC_DETAILS WHERE refId=? and id=?', data)
      .then(
        data => {
          let kycdetails = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              kycdetails.push({
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                kycDesc: data.rows.item(i).kycDesc,
                kycNum: data.rows.item(i).kycNum,
                doctype: data.rows.item(i).doctype,
                kycid: data.rows.item(i).kycid
              });
            }
          }
          return kycdetails;
        },
        err => {
          console.log('Error: ' + JSON.stringify(err));
          return err;
        }
      );
  }

  removeKYCDetails(refId, kycid) {
    let data = [refId, kycid];
    //alert("refID: " + refId + " id: " + kycid);
    return this.database
      .executeSql(
        'DELETE FROM ORIG_KYC_DETAILS where refId=? and kycid=?',
        data
      )
      .then(data => {
        return data;
      });
  }

  removeOtherdocDetails(imgid) {
    let data = [imgid];
    // alert("DATA==>"+data);
    return this.database
      .executeSql(
        'DELETE FROM ORIG_OTHERDOCIMG_DETAILS where otherimgid=?',
        data
      )
      .then(data => {
        // alert(JSON.stringify(data));
        return data;
      });
  }

  getProofDetails(refId, kycid) {
    let data = [refId, kycid];
    //    console.log("refID: " + data);
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_KYC_DETAILS WHERE refId=? and kycid=?',
        data
      )
      .then(
        data => {
          let details = [];
          //      alert("len: " + data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                kycDesc: data.rows.item(i).kycDesc,
                kycNum: data.rows.item(i).kycNum,
                doctype: data.rows.item(i).doctype,
                kycid: data.rows.item(i).kycid
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  updateProofDetails(refId, id, kycDesc, kycNum, kycid) {
    let data = [kycDesc, kycNum, refId, id, kycid];
    return this.database
      .executeSql(
        'UPDATE ORIG_KYC_DETAILS SET kycDesc=?, kycNum=?, refId=?, id=? WHERE kycid=?',
        data
      )
      .then(
        data => {
          //    console.log("Prove Update data: " + JSON.stringify(data));
          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  updatekycImg(refId, id, kycid,imagepath)
  {
    let data=[imagepath,id,kycid,refId];
    return this.database.executeSql('UPDATE ORIG_KYC_DETAILS SET imgadd=? WHERE id=? and kycid=? and refId=?', data).then(
      data => {
        console.log("Prove Update data: " + JSON.stringify(data));
        return data;
      },
      err =>{
        console.log('Error', err);
        return err;
      }
    )
  }

  addPANDetails(refId, id, pancard, aadhaar) {
    let data = [refId, id, pancard, aadhaar];
    //alert("Inserted JSON  pan data: " + JSON.stringify(data));
    return this.database
      .executeSql(
        'INSERT INTO ORIG_PAN_DETAILS(refId, id, pancard, aadhaar) VALUES(?,?,?,?)',
        data
      )
      .then(
        data => {
          return data;
        },
        error => {
          console.log('provider kyc add error: ' + error);
          return error;
        }
      );
  }

  getPANDetails(refId, id) {
    let data = [refId, id];
    //    console.log("refId: " + refId + " id: " + panId);
    return this.database
      .executeSql('SELECT * FROM ORIG_PAN_DETAILS WHERE refId=? and id=?', data)
      .then(
        data => {
          let pandetails = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              pandetails.push({
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                pancard: data.rows.item(i).pancard,
                aadhaar: data.rows.item(i).aadhaar,
                panId: data.rows.item(i).panId
              });
            }
          }
          return pandetails;
        },
        err => {
          console.log('Error: ' + JSON.stringify(err));
          return err;
        }
      );
  }

  updatePANDetails(refId, pancard, aadhaar, id) {
    let data = [pancard, aadhaar, refId, id];
    console.log('Updated data: ' + data);
    // alert("Updated JSON  pan data: " + JSON.stringify(data));
    return this.database
      .executeSql(
        'UPDATE ORIG_PAN_DETAILS SET pancard=?, aadhaar=?,refId=? WHERE id=?',
        data
      )
      .then(
        data => {
          console.log('Prove PAN Update data: ' + JSON.stringify(data));
          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  addProofImgDetails(refId, id, kycid, proofimgpath) {
    let data = [refId, id, kycid, proofimgpath];
    // alert("addOtherdocImgDetails data:" + data);
    return this.database
      .executeSql(
        'INSERT INTO ORIG_PROOFIMG_DETAILS(refId, id, kycid, proofimgpath) VALUES (?,?,?,?)',
        data
      )
      .then(
        data => {
          // alert(JSON.stringify(data));
          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }
  updateProofImg(refid, userid, kycid, status) {
    let data = [status, refid, userid, kycid];
    return this.database
      .executeSql(
        'UPDATE ORIG_KYC_DETAILS SET imgadd=? where refId=? and id=? and kycid=?',
        data
      )
      .then(
        dat => {
          return this.getAll(dat);
        },
        err => {
          return [];
        }
      );
  }

  getProofImgDetail(refid, kycid) {
    let data = [refid, kycid];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_PROOFIMG_DETAILS WHERE refId=? and kycid=?',
        data
      )
      .then(
        data => {
          let details = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                kycid: data.rows.item(i).kycid,
                proofimgid: data.rows.item(i).proofimgid,
                proofimgpath: data.rows.item(i).proofimgpath,
                id: data.rows.item(i).id
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  addPanImgDetails(refId, id, panId, panImageName) {
    let data = [refId, id, panId, panImageName];
    // alert("addOtherdocImgDetails data:" + data);
    return this.database
      .executeSql(
        'INSERT INTO ORIG_PANIMG_DETAILS(refId, id, panId, panImageName) VALUES (?,?,?,?)',
        data
      )
      .then(
        data => {
          // alert(JSON.stringify(data));
          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  getPanImgDetail(panId) {
    let data = [panId];
    return this.database
      .executeSql('SELECT * FROM ORIG_PANIMG_DETAILS WHERE panId=?', data)
      .then(
        data => {
          let details = [];
          if (data.rows.length > 0) {
            // alert("pan data.rows.length" + data.rows.length);
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                panId: data.rows.item(i).panId,
                panImgId: data.rows.item(i).panImgId,
                panImageName: data.rows.item(i).panImageName
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  addAadharImgDetails(refId, id, panId, aadharImageName) {
    let data = [refId, id, panId, aadharImageName];
    //alert("addOtherdocImgDetails data:" + data);
    return this.database
      .executeSql(
        'INSERT INTO ORIG_AADHARIMG_DETAILS(refId, id, panId, aadharImageName) VALUES (?,?,?,?)',
        data
      )
      .then(
        data => {
          //alert(JSON.stringify(data));
          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }

  getAadharImgDetail(panId) {
    let data = [panId];
    return this.database
      .executeSql('SELECT * FROM ORIG_AADHARIMG_DETAILS WHERE panId=?', data)
      .then(
        data => {
          let details = [];
          if (data.rows.length > 0) {
            //alert("data.rows.length" + data.rows.length);
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                panId: data.rows.item(i).panId,
                aadharImgId: data.rows.item(i).aadharImgId,
                aadharImageName: data.rows.item(i).aadharImageName
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  // addOtherincomeDetails(refId, id,otherincome) {
  //   alert("passed lenth===>" + otherincome.length);
  //   alert("passed otherincome===>" +JSON.stringify(otherincome));
  //   console.log(otherincome);
  //   for(var i=0;i<otherincome.length;i++){
  //   let data = [refId, id,otherincome[i].iname,otherincome[i].iotamount]
  //   alert("otherincome data:" + data);
  //   return this.database.executeSql("INSERT INTO ORIG_OTHERINCOME_DETAILS(refId, id,otherincome,amount) VALUES (?,?,?,?)", data).then(data => {
  //    alert(JSON.stringify(data));

  //     return data;
  //   },

  //   err => {
  //     console.log('Error: ', err);
  //     return err;
  //   });
  // }
  // }

  removePanImgDetails(panImgId) {
    let data = [panImgId];
    //alert("Remove pan DATA==>" + data);
    return this.database
      .executeSql('DELETE FROM ORIG_PANIMG_DETAILS where panImgId=?', data)
      .then(data => {
        //alert(JSON.stringify(data));
        return data;
      });
  }

  removeAadharImgDetails(aadharImgId) {
    let data = [aadharImgId];
    //alert("Remove aadhar DATA==>" + data);
    return this.database
      .executeSql(
        'DELETE FROM ORIG_AADHARIMG_DETAILS where aadharImgId=?',
        data
      )
      .then(data => {
        //alert(JSON.stringify(data));
        return data;
      });
  }

  removeProofDetails(proofimgid) {
    let data = [proofimgid];
    // alert("DATA==>"+data);
    return this.database
      .executeSql('DELETE FROM ORIG_PROOFIMG_DETAILS where proofimgid=?', data)
      .then(data => {
        // alert(JSON.stringify(data));
        return data;
      });
  }

  loadleftjoinDetails(refId, id) {
    let data = [refId, id];
    console.log('new data===>' + data);
    // return this.database.executeSql("SELECT a.refId,a.id,a.firstName,a.lastName,a.gender,a.dob,a.middleName,a.address1,a.address2,a.stateName,a.cityName,a.pincode,a.imagepath,b.product,b.amount FROM ORIG_APPLICATION a LEFT OUTER JOIN ORIG_LOAN_DETAILS b ON a.id=b.id WHERE a.refId=? and a.id=?", data).then(data => {
    return this.database
      .executeSql(
        'SELECT a.refId, a.id, a.firstName, a.lastName, a.gender, a.dob, a.middleName, a.address1, a.address2, a.stateName, a.cityName, a.pincode,a.districtName,a.peraddress1,a.peraddress2,a.perstate,a.percity,a.perpincode,a.perdistrict, a.imagepath,a.app_CompanyName,a.usertype,b.product, b.amount, b.tenure, b.moratorium, b.rio, c.pancard, c.aadhaar FROM ORIG_APPLICATION a LEFT OUTER JOIN ORIG_LOAN_DETAILS b ON a.id=b.id LEFT OUTER JOIN ORIG_PAN_DETAILS c ON a.id=c.id WHERE a.refId=? and a.id=?',
        data
      )
      .then(
        data => {
          let details = [];
          console.log('data: ====================>' + JSON.stringify(details));
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              if (
                data.rows.item(i).amount == null ||
                data.rows.item(i).amount == ''
              ) {
                data.rows.item(i).amount = '0.0';
                //alert( data.rows.item(i).amount);
              }
              if (
                data.rows.item(i).product == null ||
                data.rows.item(i).product == ''
              ) {
                data.rows.item(i).product = 'No Product';
              }
              let state;
              let city;
              let product;
              let gender;
              let perstate;
              let percity;
              let selectedState = this.globalFunction
                .getFullStateMaster()
                .find(f => {
                  return f.sgmStateCode === data.rows.item(i).stateName;
                });

              let selectedCity = this.globalFunction
                .getFullCityMaster()
                .find(f => {
                  return f.sgmCityCode === data.rows.item(i).cityName;
                });
              let selectedPerState = this.globalFunction
                .getFullStateMaster()
                .find(f => {
                  return f.sgmStateCode === data.rows.item(i).perstate;
                });

              let selectedPerCity = this.globalFunction
                .getFullCityMaster()
                .find(f => {
                  return f.sgmCityCode === data.rows.item(i).percity;
                });

              let selectedPro = this.globalFunction
                .getFullProductList()
                .find(f => {
                  return f.lpdProdNewId === data.rows.item(i).product;
                });

              let selectedGender = this.globalFunction
                .getGenderList()
                .find(f => {
                  return f.llvOptionVal === data.rows.item(i).gender;
                });
              if (selectedGender != undefined && selectedGender != '') {
                gender = selectedGender.llvOptionDesc;
              } else {
                gender = '';
              }
              if (selectedPro != undefined && selectedPro != '') {
                product = selectedPro.lpdPrdDesc;
              } else {
                product = '';
              }
              if (selectedCity != undefined && selectedCity != '') {
                city = selectedCity.sgmCityName;
              } else {
                city = '';
              }
              if (selectedState != undefined && selectedState != '') {
                state = selectedState.sgmStateName;
              } else {
                state = '';
              }
              if (selectedPerCity != undefined && selectedPerCity != '') {
                percity = selectedPerCity.sgmCityName;
              } else {
                percity = '';
              }
              if (selectedPerState != undefined && selectedPerState != '') {
                perstate = selectedPerState.sgmStateName;
              } else {
                perstate = '';
              }

              details.push({
                //refId: data.rows.item(i).refId, id: data.rows.item(i).id, firstName: data.rows.item(i).firstName, lastName: data.rows.item(i).lastName, gender: data.rows.item(i).gender, dob: data.rows.item(i).dob, middleName: data.rows.item(i).middleName, address: data.rows.item(i).address1, address2: data.rows.item(i).address2, state: data.rows.item(i).stateName, city: data.rows.item(i).cityName, pincode: data.rows.item(i).pincode, imagepath: data.rows.item(i).imagepath, product: data.rows.item(i).product, amount: data.rows.item(i).amount
                usertype: data.rows.item(i).usertype,
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                firstName: data.rows.item(i).firstName,
                lastName: data.rows.item(i).lastName,
                gender: gender,
                dob: data.rows.item(i).dob,
                middleName: data.rows.item(i).middleName,
                address: data.rows.item(i).address1,
                address2: data.rows.item(i).address2,
                state: state,
                city: city,
                pincode: data.rows.item(i).pincode,
                imagepath: data.rows.item(i).imagepath,
                product: product,
                amount: data.rows.item(i).amount,
                tenure: data.rows.item(i).tenure,
                moratorium: data.rows.item(i).moratorium,
                rio: data.rows.item(i).rio,
                pancard: data.rows.item(i).pancard,
                aadhaar: data.rows.item(i).aadhaar,
                company: data.rows.item(i).app_CompanyName,
                district: data.rows.item(i).districtName,
                perdistrict: data.rows.item(i).perdistrict,
                peraddress1: data.rows.item(i).peraddress1,
                peraddress2: data.rows.item(i).peraddress2,
                perstate: perstate,
                percity: percity,
                perpincode: data.rows.item(i).perpincode
              });
            }
          }
          //this.databaseReady.next(true);
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getcoapplicantDetails(refId) {
    // alert("refin coapp===>" + refId);
    let data = [refId];
    return this.database
      .executeSql(
        "SELECT a.refId, a.id, a.firstName, a.lastName, a.gender, a.dob, a.middleName, a.address1, a.address2, a.stateName, a.cityName,a.districtName,a.peraddress1,a.peraddress2,a.perstate,a.percity,a.perdistrict,a.perpincode, a.pincode,a.app_relationship,a.app_CompanyName,a.usertype, b.pancard, b.aadhaar FROM ORIG_APPLICATION a LEFT OUTER JOIN ORIG_PAN_DETAILS b ON a.id=b.id WHERE usertype='C' and a.refId=?",
        data
      )
      .then(
        data => {
          let details = [];
          //console.log(data);
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              if (
                data.rows.item(i).product == null ||
                data.rows.item(i).product == ''
              ) {
                data.rows.item(i).product = 'No Product';
              }
              let state;
              let city;
              let product;
              let gender;
              let perstate;
              let percity;
              let selectedState = this.globalFunction
                .getFullStateMaster()
                .find(f => {
                  return f.sgmStateCode === data.rows.item(i).stateName;
                });

              let selectedCity = this.globalFunction
                .getFullCityMaster()
                .find(f => {
                  return f.sgmCityCode === data.rows.item(i).cityName;
                });
              let selectedPerState = this.globalFunction
                .getFullStateMaster()
                .find(f => {
                  return f.sgmStateCode === data.rows.item(i).perstate;
                });

              let selectedPerCity = this.globalFunction
                .getFullCityMaster()
                .find(f => {
                  return f.sgmCityCode === data.rows.item(i).percity;
                });
              let selectedPro = this.globalFunction
                .getFullProductList()
                .find(f => {
                  return f.lpdProdNewId === data.rows.item(i).product;
                });

              let selectedGender = this.globalFunction
                .getGenderList()
                .find(f => {
                  return f.llvOptionVal === data.rows.item(i).gender;
                });
              if (selectedGender != undefined && selectedGender != '') {
                gender = selectedGender.llvOptionDesc;
              } else {
                gender = '';
              }
              if (selectedPro != undefined && selectedPro != '') {
                product = selectedPro.lpdPrdDesc;
              } else {
                product = '';
              }
              if (selectedCity != undefined && selectedCity != '') {
                city = selectedCity.sgmCityName;
              } else {
                city = '';
              }
              if (selectedState != undefined && selectedState != '') {
                state = selectedState.sgmStateName;
              } else {
                state = '';
              }
              if (selectedPerCity != undefined && selectedPerCity != '') {
                percity = selectedPerCity.sgmCityName;
              } else {
                percity = '';
              }
              if (selectedPerState != undefined && selectedPerState != '') {
                perstate = selectedPerState.sgmStateName;
              } else {
                perstate = '';
              }
              let selectedRelation = this.globalFunction
                .getRelationShipList()
                .find(f => {
                  return f.llvOptionVal === data.rows.item(i).app_relationship;
                });
              details.push({
                usertype: data.rows.item(i).usertype,
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                firstName: data.rows.item(i).firstName,
                lastName: data.rows.item(i).lastName,
                gender: gender,
                dob: data.rows.item(i).dob,
                middleName: data.rows.item(i).middleName,
                address: data.rows.item(i).address1,
                address2: data.rows.item(i).address2,
                state: state,
                city: city,
                pincode: data.rows.item(i).pincode,
                pancard: data.rows.item(i).pancard,
                aadhaar: data.rows.item(i).aadhaar,
                RelationshipwithApplicant: selectedRelation.llvOptionDesc,
                company: data.rows.item(i).app_CompanyName,
                district: data.rows.item(i).districtName,
                perdistrict: data.rows.item(i).perdistrict,
                peraddress1: data.rows.item(i).peraddress1,
                peraddress2: data.rows.item(i).peraddress2,
                perstate: perstate,
                percity: percity,
                perpincode: data.rows.item(i).perpincode
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getGuarantDetails(refId) {
    // alert("refin coapp===>" + refId);
    let data = [refId];
    return this.database
      .executeSql(
        "SELECT a.refId, a.id, a.firstName, a.lastName, a.gender, a.dob, a.middleName, a.address1, a.address2, a.stateName, a.cityName,a.districtName,a.perstate,a.percity,a.perdistrict,a.peraddress1,a.peraddress2,a.perpincode, a.pincode,a.app_relationship,a.app_CompanyName,a.usertype, b.pancard, b.aadhaar FROM ORIG_APPLICATION a LEFT OUTER JOIN ORIG_PAN_DETAILS b ON a.id=b.id WHERE usertype='G' and a.refId=?",
        data
      )
      .then(
        data => {
          let details = [];
          //console.log(data);
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              let state;
              let city;
              let product;
              let gender;
              let perstate;
              let percity;
              let selectedState = this.globalFunction
                .getFullStateMaster()
                .find(f => {
                  return f.sgmStateCode === data.rows.item(i).stateName;
                });

              let selectedCity = this.globalFunction
                .getFullCityMaster()
                .find(f => {
                  return f.sgmCityCode === data.rows.item(i).cityName;
                });

              let selectedPro = this.globalFunction
                .getFullProductList()
                .find(f => {
                  return f.lpdProdNewId === data.rows.item(i).product;
                });
              let selectedPerState = this.globalFunction
                .getFullStateMaster()
                .find(f => {
                  return f.sgmStateCode === data.rows.item(i).perstate;
                });

              let selectedPerCity = this.globalFunction
                .getFullCityMaster()
                .find(f => {
                  return f.sgmCityCode === data.rows.item(i).percity;
                });
              let selectedGender = this.globalFunction
                .getGenderList()
                .find(f => {
                  return f.llvOptionVal === data.rows.item(i).gender;
                });
              if (selectedGender != undefined && selectedGender != '') {
                gender = selectedGender.llvOptionDesc;
              } else {
                gender = '';
              }
              if (selectedPro != undefined && selectedPro != '') {
                product = selectedPro.lpdPrdDesc;
              } else {
                product = '';
              }
              if (selectedCity != undefined && selectedCity != '') {
                city = selectedCity.sgmCityName;
              } else {
                city = '';
              }
              if (selectedState != undefined && selectedState != '') {
                state = selectedState.sgmStateName;
              } else {
                state = '';
              }
              if (selectedPerCity != undefined && selectedPerCity != '') {
                percity = selectedPerCity.sgmCityName;
              } else {
                percity = '';
              }
              if (selectedPerState != undefined && selectedPerState != '') {
                perstate = selectedPerState.sgmStateName;
              } else {
                perstate = '';
              }
              let selectedRelation = this.globalFunction
                .getRelationShipList()
                .find(f => {
                  return f.llvOptionVal === data.rows.item(i).app_relationship;
                });
              details.push({
                usertype: data.rows.item(i).usertype,
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                firstName: data.rows.item(i).firstName,
                lastName: data.rows.item(i).lastName,
                gender: gender,
                dob: data.rows.item(i).dob,
                middleName: data.rows.item(i).middleName,
                address: data.rows.item(i).address1,
                address2: data.rows.item(i).address2,
                state: state,
                city: city,
                pincode: data.rows.item(i).pincode,
                pancard: data.rows.item(i).pancard,
                aadhaar: data.rows.item(i).aadhaar,
                RelationshipwithApplicant: selectedRelation.llvOptionDesc,
                company: data.rows.item(i).app_CompanyName,
                district: data.rows.item(i).districtName,
                perdistrict: data.rows.item(i).perdistrict,
                peraddress1: data.rows.item(i).peraddress1,
                peraddress2: data.rows.item(i).peraddress2,
                perstate: perstate,
                percity: percity,
                perpincode: data.rows.item(i).perpincode
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  /*   getAllImageDetails(refId) {
      // alert("refin coapp===>" + refId);
      let data = [refId]
      return this.database.executeSql("SELECT a.refId, a.id, a.imagepath, b.proofimgpath, c.panImageName, d.aadharImageName, e.otherimgpath FROM ORIG_APPLICATION a LEFT OUTER JOIN ORIG_PROOFIMG_DETAILS b ON a.id=b.id LEFT OUTER JOIN ORIG_PANIMG_DETAILS c ON b.id=c.id LEFT OUTER JOIN ORIG_AADHARIMG_DETAILS d ON c.id=d.id LEFT OUTER JOIN ORIG_OTHERDOCIMG_DETAILS e ON d.id=e.id WHERE a.refId=?", data).then(data => {
        let details = [];
        //console.log(data);
        //  alert(data.rows.length);
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            details.push({
              imagepath: data.rows.item(i).imagepath,
              proofimgpath: data.rows.item(i).proofimgpath,
              panImageName: data.rows.item(i).panImageName,
              aadharImageName: data.rows.item(i).aadharImageName,
              otherimgpath: data.rows.item(i).otherimgpath
            });
          }
        }
        return details;
      }, err => {
        console.log('Error: ', err);
        return [];
      });
    }
   */

  getProfImages(refId) {
    // alert("refin coapp===>" + refId);
    let data = [refId];
    return this.database
      .executeSql(
        'SELECT refId, id, imagepath FROM ORIG_APPLICATION WHERE refId=?',
        data
      )
      .then(
        data => {
          let details = [];
          //console.log(data);
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                imagepath: data.rows.item(i).imagepath
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getKYCImages(refId) {
    // alert("refin coapp===>" + refId);
    let data = [refId];
    console.log('data------------------------' + JSON.stringify(data));
    return this.database
      .executeSql(
        'SELECT a.refId, a.id, a.panImageName, b.aadharImageName, c.proofimgpath FROM ORIG_PANIMG_DETAILS a LEFT OUTER JOIN ORIG_AADHARIMG_DETAILS b ON a.id=b.id LEFT OUTER JOIN ORIG_PROOFIMG_DETAILS c ON a.id=c.id WHERE a.refId=?',
        data
      )
      .then(
        data => {
          let details = [];
          //console.log(data);
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                panImageName: data.rows.item(i).panImageName,
                aadharImageName: data.rows.item(i).aadharImageName,
                proofimgpath: data.rows.item(i).proofimgpath
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getOtherImages(refId) {
    // alert("refin coapp===>" + refId);
    let data = [refId];
    return this.database
      .executeSql(
        'SELECT refId, id, otherimgpath FROM ORIG_OTHERDOCIMG_DETAILS WHERE refId=?',
        data
      )
      .then(
        data => {
          let details = [];
          //console.log(data);
          //  alert(data.rows.length);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                otherimgpath: data.rows.item(i).otherimgpath
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getPanImgs(refId) {
    let data = [refId];
    return this.database
      .executeSql('SELECT * FROM ORIG_PANIMG_DETAILS WHERE refId=?', data)
      .then(
        data => {
          let details = [];
          if (data.rows.length > 0) {
            // alert("pan data.rows.length" + data.rows.length);
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                panId: data.rows.item(i).panId,
                panImgId: data.rows.item(i).panImgId,
                panImageName: data.rows.item(i).panImageName
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getAadharImgs(refId) {
    let data = [refId];
    return this.database
      .executeSql('SELECT * FROM ORIG_AADHARIMG_DETAILS WHERE refId=?', data)
      .then(
        data => {
          let details = [];
          if (data.rows.length > 0) {
            //alert("data.rows.length" + data.rows.length);
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                id: data.rows.item(i).id,
                panId: data.rows.item(i).panId,
                aadharImgId: data.rows.item(i).aadharImgId,
                aadharImageName: data.rows.item(i).aadharImageName
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getProofImgs(refId) {
    let data = [refId];
    return this.database
      .executeSql('SELECT * FROM ORIG_PROOFIMG_DETAILS WHERE refId=?', data)
      .then(
        data => {
          let details = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              details.push({
                refId: data.rows.item(i).refId,
                kycid: data.rows.item(i).kycid,
                proofimgid: data.rows.item(i).proofimgid,
                proofimgpath: data.rows.item(i).proofimgpath,
                id: data.rows.item(i).id
              });
            }
          }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  CheckPanImg(refId, id) {
    let data = [refId, id];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_PANIMG_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          let detail = data.rows.length;

          return detail;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  checkidProof(refid, id) {
    let data = [refid, id, 'N'];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_KYC_DETAILS WHERE refId=? and id=? and imgadd=?',
        data
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  CheckAadharImg(refId, id) {
    let data = [refId, id];
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_AADHARIMG_DETAILS WHERE refId=? and id=?',
        data
      )
      .then(
        data => {
          let details = data.rows.length;

          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  removeCoAppDetails(refId, id) {
    //  alert("refid==>"+refId);
    let data = [refId, id];
    //alert("Prove: " + JSON.stringify(data));
    return (
      this.database.executeSql(
        'DELETE FROM ORIG_LOAN_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_APPLICATION where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_KYC_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_PAN_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_PROOFIMG_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_PANIMG_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_INCOME_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_EXPENSE_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_OTHERDOC_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_OTHERINCOME_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_BANK_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_OTHEREXPENCES_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_AADHARIMG_DETAILS where refId=? and id=?',
        data
      ),
      this.database
        .executeSql(
          'DELETE FROM ORIG_OTHERDOCIMG_DETAILS where refId=? and id=?',
          data
        )
        .then(
          data => {
            //alert("Prove: " + JSON.stringify(data));
            return data;
          },
          err => {
            console.log(err);
            return err;
          }
        )
    );
  }
  deleteotherdocproof(product) {
    let data = [product];
    return (
      this.database.executeSql(
        'DELETE FROM ORIG_OTHERDOC_DETAILS where loan_product != ?',
        data
      ),
      this.database
        .executeSql(
          'DELETE FROM ORIG_OTHERDOCIMG_DETAILS where loan_product != ?',
          data
        )
        .then(
          data => {
            return data;
          },
          err => {
            return err;
          }
        )
    );
  }
  removeGuaDetails(refId, id) {
    //  alert("refid==>"+refId);
    let data = [refId, id];
    //alert("SSProve: " + JSON.stringify(data));
    return (
      this.database.executeSql(
        'DELETE FROM ORIG_LOAN_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_APPLICATION where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_KYC_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_PAN_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_PROOFIMG_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_PANIMG_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_INCOME_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_EXPENSE_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_OTHERDOC_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_OTHERINCOME_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_BANK_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_OTHEREXPENCES_DETAILS where refId=? and id=?',
        data
      ),
      this.database.executeSql(
        'DELETE FROM ORIG_AADHARIMG_DETAILS where refId=? and id=?',
        data
      ),
      this.database
        .executeSql(
          'DELETE FROM ORIG_OTHERDOCIMG_DETAILS where refId=? and id=?',
          data
        )
        .then(
          data => {
            //alert("Prove: " + JSON.stringify(data));
            return data;
          },
          err => {
            console.log(err);
            return err;
          }
        )
    );
  }

  coapplicantcheck(refId, usertype) {
    let data = [refId, usertype];
    //alert(JSON.stringify(data));
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_APPLICATION WHERE refId=? and usertype=?',
        data
      )
      .then(
        data => {
          let details = data.rows.length;
          // if (data.rows.length > 0) {
          //   //alert("data.rows.length" + data.rows.length);
          //   for (var i = 0; i < data.rows.length; i++) {
          //     details.push({
          //       refId: data.rows.item(i).refId,
          //       id: data.rows.item(i).id,
          //       panId: data.rows.item(i).panId,
          //       aadharImgId: data.rows.item(i).aadharImgId,
          //       aadharImageName: data.rows.item(i).aadharImageName,
          //     });
          //   }
          // }
          return details;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  /* Nidheesh Source */

  removeStates() {
    return this.database.executeSql('DELETE FROM STATE_MASTER', []).then(
      data => {
        return data;
      },
      err => {
        console.log('Error: ', err);
        return [];
      }
    );
  }
  InsertStateValue(sgmStateCode, sgmStateName) {
    let data = [sgmStateCode, sgmStateName];
    return this.database
      .executeSql(
        'INSERT INTO STATE_MASTER(sgmStateCode,sgmStateName) values (?,?)',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getAllStateValues() {
    return this.database.executeSql('SELECT * FROM STATE_MASTER', []).then(
      data => {
        return this.getAll(data);
      },
      err => {
        console.log('Error: ', err);
        return [];
      }
    );
  }

  getAll(result) {
    var output = [];
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }
  removeProductList() {
    return this.database.executeSql('DELETE FROM PRODUCT_LIST', []).then(
      data => {
        return data;
      },
      err => {
        console.log('Error: ', err);
        return [];
      }
    );
  }
  removedocumentList(prd) {
    return this.database
      .executeSql('DELETE FROM DOCUMENT_LIST where doc_product_id=?', [prd])
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  InsertProductListValue(
    lpdProdNewId,
    lpdAmtFrom,
    lpdAmtTo,
    lpdPrdDesc,
    lpdTenorFrom,
    lpdTenorTo,
    lpdMoratoriumMax,
    lpdPrdType
  ) {
    let data = [
      lpdProdNewId,
      lpdAmtFrom,
      lpdAmtTo,
      lpdPrdDesc,
      lpdTenorFrom,
      lpdTenorTo,
      lpdMoratoriumMax,
      lpdPrdType
    ];
    return this.database
      .executeSql(
        'INSERT INTO PRODUCT_LIST(lpdProdNewId,lpdAmtFrom,lpdAmtTo,lpdPrdDesc,lpdTenorFrom,lpdTenorTo,lpdMoratoriumMax,lpdPrdType) values (?,?,?,?,?,?,?,?)',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  InsertDocumentList(
    doc_product_id,
    doc_ldDocActive,
    doc_docId,
    doc_description,
    doc_ldDocType,
    doc_ldLegalDocActive
  ) {
    let data = [
      doc_product_id,
      doc_ldDocActive,
      doc_docId,
      doc_description,
      doc_ldDocType,
      doc_ldLegalDocActive
    ];
    return this.database
      .executeSql(
        'INSERT INTO DOCUMENT_LIST(doc_product_id,doc_ldDocActive,doc_docId,doc_description,doc_ldDocType,doc_ldLegalDocActive) values (?,?,?,?,?,?)',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllProductListValues() {
    return this.database.executeSql('SELECT * FROM PRODUCT_LIST', []).then(
      data => {
        return this.getAll(data);
      },
      err => {
        console.log('Error: ', err);
        return [];
      }
    );
  }
  getAllDocumentList() {
    return this.database.executeSql('SELECT * FROM DOCUMENT_LIST', []).then(
      data => {
        return this.getAll(data);
      },
      err => {
        console.log('Error: ', err);
        return [];
      }
    );
  }
  getAllDocumentListbyID(prod_id) {
    return this.database
      .executeSql('SELECT * FROM DOCUMENT_LIST where doc_product_id=?', [
        prod_id
      ])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  removeStaticDataList() {
    return this.database.executeSql('DELETE FROM STATIC_DATA', []).then(
      data => {
        return this.getAll(data);
      },
      err => {
        console.log('Error: ', err);
        return [];
      }
    );
  }
  insertStaticData(llvHeader, llvOptionDesc, llvOptionVal) {
    let staticData = [llvHeader, llvOptionDesc, llvOptionVal];
    return this.database
      .executeSql(
        'INSERT INTO STATIC_DATA(llvHeader,llvOptionDesc,llvOptionVal) values (?,?,?)',
        staticData
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getallStaticvalue(llvHeader) {
    let data = [llvHeader];
    return this.database
      .executeSql('SELECT * FROM STATIC_DATA where llvHeader=(?) ', [data])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  /* 17/08/2018 Moorthy Source */
  InserCityValue(sgmStateCode, sgmCityCode, sgmCityName) {
    let data = [sgmStateCode, sgmCityCode, sgmCityName];
    //alert(JSON.stringify(data));
    return this.database
      .executeSql(
        'INSERT INTO CITY_MASTER(sgmStateCode,sgmCityCode,sgmCityName) values (?,?,?)',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  deleteCityEntry() {
    //alert(JSON.stringify(data));
    return this.database.executeSql('delete from CITY_MASTER', []).then(
      data => {
        return data;
      },
      err => {
        console.log('Error: ', err);
        return [];
      }
    );
  }

  deleteCityEntrybyId(city_id) {
    //alert(JSON.stringify(data));
    return this.database
      .executeSql('delete from CITY_MASTER where sgmStateCode=?', [city_id])
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getCityDetails(statecode) {
    let data = [statecode];
    return this.database
      .executeSql('SELECT * FROM CITY_MASTER WHERE sgmStateCode=?', data)
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ' + JSON.stringify(err));
          return err;
        }
      );
  }
  getAllCityDetails() {
    return this.database.executeSql('SELECT * FROM CITY_MASTER', []).then(
      data => {
        return this.getAll(data);
      },
      err => {
        console.log('Error: ' + JSON.stringify(err));
        return err;
      }
    );
  }
  getAllRateOfInterest() {
    return this.database
      .executeSql('SELECT * FROM RATE_INTERESTIN_MOBILE', [])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ' + JSON.stringify(err));
          return err;
        }
      );
  }
  removeAllRateOfInterest() {
    return this.database
      .executeSql('DELETE FROM RATE_INTERESTIN_MOBILE', [])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  InsertRateOfInterestPerProduct(val) {
    let data = [
      val.lirProdId,
      val.lirAmtFrom,
      val.lirAmtTo,
      val.lirMclrPrefr,
      val.lirIntType,
      val.lirTrPrefr,
      val.lirPriority
    ];
    return this.database
      .executeSql(
        'INSERT INTO RATE_INTERESTIN_MOBILE(lirProdId,lirAmtFrom,lirAmtTo,lirMclrPrefr,lirIntType,lirTrPrefr,lirPriority) values (?,?,?,?,?,?,?)',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getProductListById(prid) {
    return this.database
      .executeSql('SELECT * FROM PRODUCT_LIST WHERE lpdProdNewId=(?)', [prid])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getInterestRateOfProductById(prid) {
    return this.database
      .executeSql('SELECT * FROM RATE_INTERESTIN_MOBILE WHERE lirProdId=(?)', [
        prid
      ])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getInterestRateOfProductByType(prtype, pid) {
    return this.database
      .executeSql(
        'SELECT * FROM RATE_INTERESTIN_MOBILE WHERE lirIntType=(?) and lirProdId=(?)',
        [prtype, pid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  validateLoanValue(amount, Product, IType) {
    return this.database
      .executeSql(
        'SELECT * FROM RATE_INTERESTIN_MOBILE WHERE lirProdId=(?)',
        []
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getAllApplicantByRefId(refid) {
    return this.database
      .executeSql(
        "select title, firstName ,middleName, lastName, gender,phone,email, dob, address1, address2,app_CompanyName, stateName, cityName, pincode,peraddress1,peraddress2,perstate,percity,perpincode,districtName,perdistrict, imagepath,usertype,product,amount, tenure, moratorium, rio, cost,interesttype,priority,mclr,loan_purpose,category,incometype,grossincome,statutory,other,netincome,incomeyesno,pancard, aadhaar FROM ORIG_APPLICATION o left outer join ORIG_LOAN_DETAILS ln on o.id = ln.id left outer join ORIG_INCOME_DETAILS inc on o.id = inc.id left outer join ORIG_PAN_DETAILS pdet on o.id=pdet.id where o.refId=? and o.usertype='A'",
        [refid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllApplicantKycIdProof(refid, userid) {
    return this.database
      .executeSql('SELECT * FROM ORIG_KYC_DETAILS WHERE refId=? and id=?', [
        refid,
        userid
      ])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllAppOtherIncome(refid, userid) {
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_OTHERINCOME_DETAILS WHERE refId=? and id=?',
        [refid, userid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllAppOtherExpense(refid, userid) {
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_OTHEREXPENCES_DETAILS WHERE refId=? and id=?',
        [refid, userid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllAppLiability(refid, userid) {
    return this.database
      .executeSql('SELECT * FROM ORIG_BANK_DETAILS WHERE refId=? and id=?', [
        refid,
        userid
      ])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  checkOtherIncome(refid, id, income) {
    return this.database
      .executeSql(
        'SELECT * FROM ORIG_OTHERINCOME_DETAILS WHERE refId=? and id=? and otherincome=?',
        [refid, id, income]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllCoApplicantByRefIdWithValues(refid, userid) {
    return this.database
      .executeSql(
        "select title, firstName ,middleName, lastName, gender, dob,phone,email, address1, address2, stateName, cityName, pincode, peraddress1,peraddress2,perstate,percity,perpincode,perdistrict,districtName,imagepath,usertype,app_relationship,app_CompanyName,product,amount, tenure, moratorium, rio, cost,interesttype,category,incometype,grossincome,statutory,other,netincome,incomeyesno,pancard, aadhaar FROM ORIG_APPLICATION o left outer join ORIG_LOAN_DETAILS ln on o.id = ln.id left outer join ORIG_INCOME_DETAILS inc on o.id = inc.id left outer join ORIG_PAN_DETAILS pdet on o.id=pdet.id where o.refId=? and o.id=? and o.usertype='C'",
        [refid, userid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllCoApplicants(refid) {
    return this.database
      .executeSql(
        "select * from ORIG_APPLICATION where refId=? and usertype='C'",
        [refid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllGuApplicants(refid) {
    return this.database
      .executeSql(
        "select * from ORIG_APPLICATION where refId=? and usertype='G'",
        [refid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllGuApplicantByRefIdWithValues(refid, userid) {
    return this.database
      .executeSql(
        "select title, firstName ,middleName, lastName, gender, dob,email,phone, address1, address2, stateName, cityName, pincode,peraddress1,peraddress2,percity,perstate,perpincode,perdistrict,districtName,imagepath,usertype,app_relationship,app_CompanyName,product,amount, tenure, moratorium, rio, cost,interesttype,category,incometype,grossincome,statutory,other,netincome,incomeyesno,pancard, aadhaar FROM ORIG_APPLICATION o left outer join ORIG_LOAN_DETAILS ln on o.id = ln.id left outer join ORIG_INCOME_DETAILS inc on o.id = inc.id left outer join ORIG_PAN_DETAILS pdet on o.id=pdet.id where o.refId=? and o.id=? and o.usertype='G'",
        [refid, userid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  UpdateApplicationStatus(apprefno, status, date, refid, submitdata) {
    return this.database
      .executeSql(
        'UPDATE ORIG_APP_DETAILS set app_reference_number=?, app_submit_status=?,app_submit_date=? where id=?',
        [
          apprefno,
          status,
          date,
          refid
        ]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  updateCompleteDetails(refId, id, filled) {
    let data = [filled, refId, id];
    return this.database
      .executeSql(
         'UPDATE ORIG_APPLICATION SET filled=?, refId=? WHERE id=?',
        //'UPDATE ORIG_APPLICATION SET filled=? WHERE id=? AND refId=?',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }
  getPendingFilledStatus(refid) {
    return this.database
      .executeSql(
        "select id,usertype,filled from ORIG_APPLICATION where refId=? and filled='N'",
        [refid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getApplicationSubmitStatus(refid) {
    return this.database
      .executeSql('select * from ORIG_APP_DETAILS where id=?', [refid])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllApplicantProfileDoc(refid, type) {
    return this.database
      .executeSql(
        'select * from ORIG_APPLICATION where refId=? and usertype=?',
        [refid, type]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getApplicantAllKycAadharDoc(refid, userid) {
    return this.database
      .executeSql(
        'select * from ORIG_AADHARIMG_DETAILS where id=? and refId=?',
        [userid, refid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getApplicantAllKycPanDoc(refid, userid) {
    return this.database
      .executeSql('select * from ORIG_PANIMG_DETAILS where id=? and refId=?', [
        userid,
        refid
      ])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getApplicantAllKycOtherProofImgDoc(refid, userid) {
    return this.database
      .executeSql(
        'select k.refId,k.id,k.kycid,k.kycNum,k.kycDesc,i.proofimgid,i.proofimgpath from ORIG_KYC_DETAILS k left outer join ORIG_PROOFIMG_DETAILS i on k.kycid = i.kycid where k.id=? and k.refId=?',
        [userid, refid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getApplicantAllKycOtherImgDoc(refid, userid) {
    return this.database
      .executeSql(
        'select o.refId,o.id,o.otherdoctype,o.otherdocid,op.otherimgpath from ORIG_OTHERDOC_DETAILS o left outer join ORIG_OTHERDOCIMG_DETAILS op on o.otherid=op.otherdocid where o.id=? and o.refId=?',
        [userid, refid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllApplicantProfileDocbyId(refid, usertype, userid) {
    return this.database
      .executeSql(
        'select * from ORIG_APPLICATION where refId=(?) and usertype=(?) and id=(?)',
        [refid, usertype, userid]
      )
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  insertSubmitTimestamp(refid, refappno, sdata, stime) {
    let data = [refid, refappno, sdata, stime];
    return this.database
      .executeSql(
        'INSERT INTO SUBMIT_TIMESTAMP(app_refid,app_reference_number,app_submit_date,app_submit_time) values (?,?,?,?)',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getSubmitTimestamp(refid) {
    return this.database
      .executeSql('select * from SUBMIT_TIMESTAMP where app_refid=?', [refid])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  updateSubmitTimestamp(refid, refappno, sdata, stime) {
    let data = [refappno, sdata, stime, refid];
    return this.database
      .executeSql(
        'UPDATE SUBMIT_TIMESTAMP SET app_reference_number=?, app_submit_date=?,app_submit_time=? WHERE app_refid=?',
        data
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return err;
        }
      );
  }
  deleteentry(refid) {
    return this.database.executeSql(
      "Update ORIG_APP_DETAILS set app_submit_status='N',app_reference_number='',app_submit_date='' where id=?",
      [refid]
    );
  }
  deletesubentry(refid) {
    return this.database.executeSql(
      'delete SUBMIT_TIMESTAMP where app_refid=?',
      [refid]
    );
  }
  deletelogin(uname) {
    return this.database
      .executeSql('delete from LOGIN_DETAILS where userid=?', [uname])
      .then(
        data => {
          return data;
        },
        err => {
          return err;
        }
      );
  }
  insertLogin(pwd, data) {
    let pdata = [
      data.username,
      data.userid,
      pwd,
      data.branchcode,
      data.empId,
      data.organisationLevel,
      data.organisationcode,
      data.organisationName,
      data.city,
      data.districtCode,
      data.publicKey
    ];
    return this.database
      .executeSql(
        'INSERT INTO LOGIN_DETAILS(username,userid,password,branchcode,empId,organisationLevel,organisationcode,organisationName,city,districtCode,publickey) values (?,?,?,?,?,?,?,?,?,?,?)',
        pdata
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getLastLoginValues() {
    return this.database
      .executeSql('select * from LOGIN_DETAILS ORDER BY seqid DESC LIMIT 1', [])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  deleteBranch() {
    return this.database.executeSql('DELETE FROM BRANCH', []).then(
      data => {
        return data;
      },
      err => {
        console.log('Error: ', err);
        return [];
      }
    );
  }
  insertBranch(data) {
    let val = [data.userid, data.rolelocation, data.rolelocationname];
    return this.database
      .executeSql(
        'INSERT INTO BRANCH(userid,rolelocation,rolelocationname) values (?,?,?)',
        val
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllBranch() {
    return this.database.executeSql('select * from BRANCH', []).then(
      data => {
        return this.getAll(data);
      },
      err => {
        console.log('Error: ', err);
        return [];
      }
    );
  }
  insertBranchUser(data, branchCode) {
    let val = [
      branchCode,
      data.UserId,
      data.UserFirstName,
      data.UserDesignation
    ];
    return this.database
      .executeSql(
        'INSERT INTO BRANCH_USER(branchCode,UserId,UserFirstName,UserDesignation) values (?,?,?,?)',
        val
      )
      .then(
        data => {
          return data;
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  getAllBranchUser(branch) {
    return this.database
      .executeSql('select * from BRANCH_USER where branchCode=?', [branch])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }
  deleteBranchUser(branch) {
    return this.database
      .executeSql('DELETE from BRANCH_USER where branchCode=?', [branch])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          console.log('Error: ', err);
          return [];
        }
      );
  }

  getSumofIncome(refid) {
    return this.database
      .executeSql('SELECT * FROM ORIG_INCOME_DETAILS WHERE refId=?', [refid])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          return [];
        }
      );
  }

  getAllLoanDetails(refId) {
    return this.database
      .executeSql('SELECT * FROM ORIG_LOAN_DETAILS WHERE refId=?', [refId])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          return [];
        }
      );
  }

  getAllLoanRepay(refid) {
    return this.database
      .executeSql('SELECT * FROM ORIG_BANK_DETAILS WHERE refId=?', [refid])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          return [];
        }
      );
  }

  getIncomeTypeCheck(refid, userid) {
    return this.database
      .executeSql('SELECT * FROM ORIG_INCOME_DETAILS WHERE refId=? and id=?', [
        refid,
        userid
      ])
      .then(
        data => {
          return this.getAll(data);
        },
        err => {
          return [];
        }
      );
  }

  getSubmittedDetails(refId, id) {

    let data = [refId];

    // return this.database.executeSql("SELECT * FROM ORIG_APPLICATION a LEFT OUTER JOIN ORIG_LOAN_DETAILS b ON (b.refId=a.refId) LEFT OUTER JOIN ORIG_INCOME_DETAILS c ON (c.refId=b.refId)  WHERE a.refId=? and a.id=?", data).then(data => {

    return this.database.executeSql("SELECT * FROM ORIG_APPLICATION b LEFT OUTER JOIN ORIG_LOAN_DETAILS c ON (c.refId=b.refId) LEFT OUTER JOIN ORIG_INCOME_DETAILS d ON (d.refId=b.refId) WHERE b.refId=? AND b.userType= 'A' AND d.userType= 'A' ", data).then(data => {
      console.log(data);
      return this.getAll(data);

    }, err => {
      console.log('Error: ', err);
      return [];
    })
  }

  getCoSubmittedDetails(refId, id) {

    let data = [refId];

    // return this.database.executeSql("SELECT * FROM ORIG_APPLICATION a LEFT OUTER JOIN ORIG_LOAN_DETAILS b ON (b.refId=a.refId) LEFT OUTER JOIN ORIG_INCOME_DETAILS c ON (c.refId=b.refId)  WHERE a.refId=? and a.id=?", data).then(data => {

    return this.database.executeSql("SELECT * FROM ORIG_APPLICATION b LEFT OUTER JOIN ORIG_INCOME_DETAILS d ON (d.refId=b.refId) WHERE d.refId=? AND b.userType= 'C' AND d.userType= 'C' ", data).then(data => {
      console.log(data);
      return this.getAll(data);

    }, err => {
      console.log('Error: ', err);
      return [];
    })
  }

  getGuSubmittedDetails(refId, id) {

    let data = [refId];

    // return this.database.executeSql("SELECT * FROM ORIG_APPLICATION a LEFT OUTER JOIN ORIG_LOAN_DETAILS b ON (b.refId=a.refId) LEFT OUTER JOIN ORIG_INCOME_DETAILS c ON (c.refId=b.refId)  WHERE a.refId=? and a.id=?", data).then(data => {

    return this.database.executeSql("SELECT * FROM ORIG_APPLICATION b LEFT OUTER JOIN ORIG_INCOME_DETAILS d ON (d.refId=b.refId) WHERE b.refId=? AND b.userType= 'G' AND d.userType= 'G' ", data).then(data => {
      console.log(data);
      return this.getAll(data);

    }, err => {
      console.log('Error: ', err);
      return [];
    })
  }

searchByRefId(refid)
{
  return this.database.executeSql("SELECT * FROM ORIG_APPLICATION WHERE refId=?",[refid]).then(data =>
    {
      console.log(data, "get all data from sql");
      return this.getAll(data);
    },
    err=>
    {
      console.log('Error: ', err);
          return [];
    }
  );
      
    
}

getLoanValue(refId,id)
{
  let data = [refId, id];
  return this.database.executeSql("SELECT * FROM ORIG_LOAN_DETAILS WHERE refId=? and id=?",data).then(data =>
    {
      console.log(data, "loan value for type A");
      return this.getAll(data);
    }, err =>
    {
      console.log("Error:",err);
      return [];
    });
}

getIncomeValue(refId,id)
{
  let data = [refId, id];
  return this.database.executeSql("SELECT * FROM ORIG_INCOME_DETAILS WHERE refId=? and id=?",data).then(data =>
    {
      console.log(data, "income value from SQL");
      return this.getAll(data);
    },err =>
    {
      console.log("Error:", err);
      return [];
    });
}


}
