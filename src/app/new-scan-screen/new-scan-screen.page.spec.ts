import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewScanScreenPage } from './new-scan-screen.page';

describe('NewScanScreenPage', () => {
  let component: NewScanScreenPage;
  let fixture: ComponentFixture<NewScanScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewScanScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewScanScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
