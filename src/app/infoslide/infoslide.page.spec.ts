import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoslidePage } from './infoslide.page';

describe('InfoslidePage', () => {
  let component: InfoslidePage;
  let fixture: ComponentFixture<InfoslidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoslidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoslidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
