import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ModifyProfilePage } from './modify-profile.page';

describe('ModifyProfilePage', () => {
  let component: ModifyProfilePage;
  let fixture: ComponentFixture<ModifyProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModifyProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
