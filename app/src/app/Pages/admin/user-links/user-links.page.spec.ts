import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserLinksPage } from './user-links.page';

describe('UserLinksPage', () => {
  let component: UserLinksPage;
  let fixture: ComponentFixture<UserLinksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
