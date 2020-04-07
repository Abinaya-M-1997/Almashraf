import { Component, OnInit } from '@angular/core';
import {NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-infoslide',
  templateUrl: './infoslide.page.html',
  styleUrls: ['./infoslide.page.scss'],
})
export class InfoslidePage implements OnInit {

  imgVals=[];
  panimgVals=[];
  aadharimgVals=[];
  proofimgVals=[];
  otherimgVals=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ngOnInit() {
    this.imgVals = this.navParams.get('imgval');
    console.log(this.imgVals);
    this.panimgVals = this.navParams.get('panimgval');
    this.aadharimgVals = this.navParams.get('aadharimgval');
    console.log(this.aadharimgVals);
    this.proofimgVals = this.navParams.get('proofimgval');
    console.log(this.proofimgVals);
    this.otherimgVals = this.navParams.get('otherimgval');
  }

}
