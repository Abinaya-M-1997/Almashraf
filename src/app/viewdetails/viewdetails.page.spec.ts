import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewdetailsPage } from './viewdetails.page';

describe('ViewdetailsPage', () => {
  let component: ViewdetailsPage;
  let fixture: ComponentFixture<ViewdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
