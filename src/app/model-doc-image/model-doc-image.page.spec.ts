import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModelDocImagePage } from './model-doc-image.page';

describe('ModelDocImagePage', () => {
  let component: ModelDocImagePage;
  let fixture: ComponentFixture<ModelDocImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDocImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModelDocImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
