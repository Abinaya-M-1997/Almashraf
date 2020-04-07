import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-scan-type',
  templateUrl: './scan-type.page.html',
  styleUrls: ['./scan-type.page.scss']
})
export class ScanTypePage implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public location: Location
  ) {}

  ngOnInit() {
    //console.log(this.route.snapshot.paramMap, 'paramMap');
    console.log(this.location.getState(), 'location state');
    //console.log(this.route.snapshot.queryParamMap);
  }
  openScanScreen(value) {
    this.router.navigate(['/new-scan-screen', { type: value ,skipLocationChange: true}]);
    // this.navCtrl.push(NewScanScreenPage, {type:value});
  }
}
