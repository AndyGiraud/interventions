import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProblemeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('champ PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['nomProbleme']
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy;

  })

  it('champ PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['nomProbleme']
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy;

  })
  it('champ PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['nomProbleme']
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy;

  })
});
