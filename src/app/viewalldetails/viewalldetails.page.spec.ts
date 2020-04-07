import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewalldetailsPage } from './viewalldetails.page';

describe('ViewalldetailsPage', () => {
  let component: ViewalldetailsPage;
  let fixture: ComponentFixture<ViewalldetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewalldetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewalldetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
