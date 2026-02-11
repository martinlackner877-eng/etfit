import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Wichtig für den "Zurück zur Base" Link
import { SuccessComponent } from './success'; // Achte auf den Namen der Klasse

describe('SuccessComponent', () => {
  let component: SuccessComponent;
  let fixture: ComponentFixture<SuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Wir importieren die Standalone-Komponente und das Router-Testmodul
      imports: [SuccessComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
