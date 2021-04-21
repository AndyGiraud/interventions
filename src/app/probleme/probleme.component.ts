import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { emailMatcherValidator} from "../shared/email-matcher/email-matcher.component"
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  categoriesProblemes: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private categories: TypeproblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom: ['', [Validators.required, ZonesValidator.longueurMinimum(3)]],
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      noTypeProbleme: ['', Validators.required],
      notifications: ['AucuneNotif'],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }]
      }),
      telephone: [{ value: '', disabled: true }],
      descriptionProbleme: ['', [Validators.required, ZonesValidator.longueurMinimum(5)]]

    });

    this.categories.obtenirCategories()
      .subscribe(cat => this.categoriesProblemes = cat,
        error => this.errorMessage = <any>error);

        this.problemeForm.get('notifications').valueChanges
        .subscribe(value => this.appliquerNotifications(value));

  }

  appliquerNotifications(notifications: string): void {

    const courrielGroupControl = this.problemeForm.get('courrielGroup');

    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephoneControl = this.problemeForm.get('telephone');

    courrielControl.clearValidators
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if (notifications == 'ParTelephone') {
      telephoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+')]);
      telephoneControl.enable();

      // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
      // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
    } else {
      if (notifications == 'ParCourriel') {
        courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
        courrielControl.enable();
        courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
        courrielConfirmationControl.enable();
        //courrielGroupControl.setValidators([Validators.compose([courrielDifferents])]);
        courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);
      }
    }
    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();

  }

  save(): void {

  }

}
