import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AadharModalPage } from './aadhar-modal.page';

describe('AadharModalPage', () => {
  let component: AadharModalPage;
  let fixture: ComponentFixture<AadharModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AadharModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AadharModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
