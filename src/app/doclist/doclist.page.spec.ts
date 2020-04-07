import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoclistPage } from './doclist.page';

describe('DoclistPage', () => {
  let component: DoclistPage;
  let fixture: ComponentFixture<DoclistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoclistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoclistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
