import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Wichtig für routerLink
import { ContactSuccessComponent } from './contact-success';

describe('ContactSuccessComponent', () => {
  let component: ContactSuccessComponent;
  let fixture: ComponentFixture<ContactSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // RouterTestingModule wird benötigt, weil du routerLink im HTML nutzt
      imports: [ContactSuccessComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger den ersten Lifecycle-Check
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
