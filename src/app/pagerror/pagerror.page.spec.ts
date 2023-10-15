import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagerrorPage } from './pagerror.page';

describe('PagerrorPage', () => {
  let component: PagerrorPage;
  let fixture: ComponentFixture<PagerrorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagerrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
