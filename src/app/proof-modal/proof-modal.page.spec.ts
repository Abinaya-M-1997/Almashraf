import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProofModalPage } from './proof-modal.page';

describe('ProofModalPage', () => {
  let component: ProofModalPage;
  let fixture: ComponentFixture<ProofModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProofModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProofModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
