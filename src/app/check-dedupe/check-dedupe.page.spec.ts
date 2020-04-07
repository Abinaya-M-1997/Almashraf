import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckDedupePage } from './check-dedupe.page';

describe('CheckDedupePage', () => {
  let component: CheckDedupePage;
  let fixture: ComponentFixture<CheckDedupePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckDedupePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckDedupePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
