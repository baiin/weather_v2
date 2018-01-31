import { TestBed, inject } from '@angular/core/testing';

import { HelperService } from './helper.service';

describe('HelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelperService]
    });
  });

  it('should be created', inject([HelperService], (service: HelperService) => {
    expect(service).toBeTruthy();
  }));

  it('format date properly', inject([HelperService], (service: HelperService) => {

    var timeStamp = "Wed Jan 31 2018 02:14:46 GMT-0800 (Pacific Standard Time)";
    
    expect(service.getFormattedTime(timeStamp)).toEqual('2:14 AM');
    expect(service.formatDate(timeStamp)).toBe('1/31/2018');
    expect(service.getNameOfDay('Mon')).toBe('Monday');
  }));
});
