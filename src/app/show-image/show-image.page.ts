import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalfunctionsProvider } from '../services/globalfunctions/globalfunctions';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.page.html',
  styleUrls: ['./show-image.page.scss']
})
export class ShowImagePage implements OnInit {
  @Input() imageSrc: any;
  applicant = true;

  constructor(
    public global: GlobalfunctionsProvider,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  updateimage() {
    if (this.global.getApplicationSubStatus() !== 'Y') {
      this.modalCtrl.dismiss('updateProfileIMAGE');
    }
  }
}
