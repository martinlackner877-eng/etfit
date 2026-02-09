import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router'; // WICHTIG: Damit routerLink funktioniert
import { CheckMailComponent } from './check-mail';

describe('CheckMailComponent', () => {
  let component: CheckMailComponent;
  let fixture: ComponentFixture<CheckMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckMailComponent],
      // Wir müssen den Router "mocken" (simulieren), da wir routerLink im HTML nutzen
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
