import { TestBed } from '@angular/core/testing';

import { TimeConverterService } from './time-converter.service';

describe('TimeConverterService', () => {
  let service: TimeConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('timeToMs convert time XXhXX to x milliseconds', () => {
    expect(service.timeToMs('00h01')).toBe(60000);
    expect(service.timeToMs('00h10')).toBe(600000);
    expect(service.timeToMs('01h40')).toBe(6000000);
    expect(service.timeToMs('16h40')).toBe(60000000);
    expect(service.timeToMs('1')).toBe(60000);
    expect(service.timeToMs('10')).toBe(600000);
    expect(service.timeToMs('0140')).toBe(6000000);
    expect(service.timeToMs('1640')).toBe(60000000);
  });

  it('msToTime convert x milliseconds to time XXhXX', () => {
    expect(service.msTotime(60000)).toBe('00h01');
    expect(service.msTotime(600000)).toBe('00h10');
    expect(service.msTotime(6000000)).toBe('01h40');
    expect(service.msTotime(60000000)).toBe('16h40');
  });
});
