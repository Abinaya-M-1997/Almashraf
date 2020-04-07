import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PanModalPage } from './pan-modal.page';

describe('PanModalPage', () => {
  let component: PanModalPage;
  let fixture: ComponentFixture<PanModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PanModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
