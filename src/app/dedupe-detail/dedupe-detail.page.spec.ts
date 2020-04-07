import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DedupeDetailPage } from './dedupe-detail.page';

describe('DedupeDetailPage', () => {
  let component: DedupeDetailPage;
  let fixture: ComponentFixture<DedupeDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DedupeDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DedupeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
