import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.page.html',
  styleUrls: ['./popup-modal.page.scss']
})
export class PopupModalPage implements OnInit {
  parameter: any;
  proimg: any;

  @Input() img: any;

  constructor(
    public modalCtrl: ModalController,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.img, 'valueeeeeeeeeeeeeeeeeeeeeeeee');
    // this.route.paramMap.subscribe(data => {
    //   console.log(data, 'hahahahaahah');
    //   this.parameter = data;
    //   this.proimg = JSON.parse(this.parameter.get('img'));
    // });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
