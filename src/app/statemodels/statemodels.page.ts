import { Component, OnInit } from '@angular/core';
import { ModalController,Platform} from '@ionic/angular';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';

@Component({
  selector: 'app-statemodels',
  templateUrl: './statemodels.page.html',
  styleUrls: ['./statemodels.page.scss'],
})
export class StatemodelsPage implements OnInit {

  stateInfo = [];
  searchTerm: string = '';
  items: any;
  public unregisterBackButtonAction:any;

  constructor(public global:GlobalfunctionsProvider,
              public platform: Platform,
              public modalCtrl : ModalController) { }

  ngOnInit() {
    this.stateInfo = this.global.getFullStateMaster();
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProofModalPage');
     this.initializeBackButtonCustomHandler();
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.backButton.subscribe(function(event){
        console.log('Prevent Back Button Page Change');
    }); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
    }  

  setFilteredItems() {
    this.stateInfo = this.global.filterStateItems(this.searchTerm);
  }
  
  selectState(state) {
    this.modalCtrl.dismiss(state);
  }
  closeStateModel() {
    this.modalCtrl.dismiss();
  }

}
