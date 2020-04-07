import { Component, OnInit, Input } from '@angular/core';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';
import { NavController,ModalController, NavParams ,Platform} from '@ionic/angular';


@Component({
  selector: 'app-doclist',
  templateUrl: './doclist.page.html',
  styleUrls: ['./doclist.page.scss'],
})
export class DoclistPage implements OnInit {

doclist =[{
        doc_description:"Bank Statement",
        doc_docId:1
    },{
        doc_description:"Financial Document",
        doc_docId:2
    },{
        doc_description:"Salary Slip",
        doc_docId:3
    },{
        doc_description:"Employer Authorization Letter",
        doc_docId:4
    }];
  searchTerm: string = '';
  public unregisterBackButtonAction:any;
  @Input()data:any;

  constructor(public global:GlobalfunctionsProvider,
        public navCtrl: NavController,
        public modaCtrl: ModalController,
        public navParams: NavParams,
        public platform : Platform) { }

  ngOnInit() {
  console.log(this.data, "value from user details page");
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    }

    initializeBackButtonCustomHandler(): void {
      this.unregisterBackButtonAction = this.platform.backButton.subscribe(function(event){
          //console.log('Prevent Back Button Page Change');
      }); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
      }   

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProofModalPage');
     this.initializeBackButtonCustomHandler();
  }
    setFilteredItems() {
         /* this.global.filterDocItems(this.searchTerm); */
    }
    
    selectDocument(doc) {      
        this.modaCtrl.dismiss(doc);
    }
    closeDocModel() {
        this.modaCtrl.dismiss();
    }

}
