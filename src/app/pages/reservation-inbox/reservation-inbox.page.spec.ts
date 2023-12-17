import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationInboxPage } from './reservation-inbox.page';

describe('ReservationInboxPage', () => {
  let component: ReservationInboxPage;
  let fixture: ComponentFixture<ReservationInboxPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReservationInboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
