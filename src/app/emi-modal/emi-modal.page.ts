import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController  } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';

@Component({
  selector: 'app-emi-modal',
  templateUrl: './emi-modal.page.html',
  styleUrls: ['./emi-modal.page.scss'],
})
export class EmiModalPage implements OnInit {

  emiModal    : FormGroup;
  disableScope: boolean=true;
  showSave    :boolean=false;
  perDisable  : any;

  constructor(public navCtrl       : NavController,
              public ngzone        : NgZone,
              public modalCtrl     : ModalController,
              public navParams     : NavParams,
              public formBuilder   : FormBuilder,
              public global        : GlobalfunctionsProvider) { }

  ngOnInit() {
    console.log(this.navParams.get('index'), "value from user page");

    this.emiModal = this.formBuilder.group({
      emiamount_new:['4561', Validators.compose([Validators.minLength(1), Validators.maxLength(10),Validators.pattern('[0-9]*'),Validators.required])],
      startdate: ['2020-01-20', Validators.compose([Validators.required])],
      enddate: ['2021-01-20', Validators.compose([ Validators.required])],
    });
  }

  getToday(): string {
    var yesterday = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
    //console.log(yesterday);
    return yesterday;
 }

 disableScope_edit()
 {
   this.disableScope=false;
   this.showSave=true;
 }

 savevalue(value)
 {
   console.log(value, "value in emi modal");
  this.modalCtrl.dismiss(value);
 }

 close_emiModal()
 {
  this.modalCtrl.dismiss();
 }

}
