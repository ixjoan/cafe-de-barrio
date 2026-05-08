import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar';  // ← cambiar 'Navbar' por 'NavbarComponent'

describe('Navbar', () => {
  let component: NavbarComponent;           // ← cambiar aquí
  let fixture: ComponentFixture<NavbarComponent>;  // ← y aquí

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],           // ← y aquí
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);  // ← y aquí
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});