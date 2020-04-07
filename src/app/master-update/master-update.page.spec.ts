import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MasterUpdatePage } from './master-update.page';

describe('MasterUpdatePage', () => {
  let component: MasterUpdatePage;
  let fixture: ComponentFixture<MasterUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
