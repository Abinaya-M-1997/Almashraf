import { TestBed } from '@angular/core/testing';

import { OcrAPIService } from './ocr-api.service';

describe('OcrAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OcrAPIService = TestBed.get(OcrAPIService);
    expect(service).toBeTruthy();
  });
});
