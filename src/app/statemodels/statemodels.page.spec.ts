import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatemodelsPage } from './statemodels.page';

describe('StatemodelsPage', () => {
  let component: StatemodelsPage;
  let fixture: ComponentFixture<StatemodelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatemodelsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatemodelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
