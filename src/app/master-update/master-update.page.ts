import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-master-update',
  templateUrl: './master-update.page.html',
  styleUrls: ['./master-update.page.scss'],
})
export class MasterUpdatePage implements OnInit {

  constructor( public alertCtrl: AlertController,
               public global: GlobalfunctionsProvider,
               public network: Network) { }

  ngOnInit() {
  }


  getallmaster(){
   this.global.globalLodingPresent('Fetching All Masters..Please Wait!!')
   this.getStateListService();
 }

 getStateListService() {   
    
  if (this.network.type == 'none') {
   this.global.globalAlert("Alert", "Please Check Your Network Connection.");
 } 
 }

}
