import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmiModalPage } from './emi-modal.page';

describe('EmiModalPage', () => {
  let component: EmiModalPage;
  let fixture: ComponentFixture<EmiModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmiModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmiModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
