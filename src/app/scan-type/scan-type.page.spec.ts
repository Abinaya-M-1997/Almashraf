import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanTypePage } from './scan-type.page';

describe('ScanTypePage', () => {
  let component: ScanTypePage;
  let fixture: ComponentFixture<ScanTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
