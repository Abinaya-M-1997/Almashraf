import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopupModalPage } from './popup-modal.page';

describe('PopupModalPage', () => {
  let component: PopupModalPage;
  let fixture: ComponentFixture<PopupModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
