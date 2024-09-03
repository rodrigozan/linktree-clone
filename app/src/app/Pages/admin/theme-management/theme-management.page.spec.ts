import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeManagementPage } from './theme-management.page';

describe('ThemeManagementPage', () => {
  let component: ThemeManagementPage;
  let fixture: ComponentFixture<ThemeManagementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
