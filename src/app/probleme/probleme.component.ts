import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { emailMatcherValidator} from "../shared/email-matcher/email-matcher.component"
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
import { Router } from '@angular/router';
import { ProblemeService } from './probleme.service';
import { IProbleme } from './probleme';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  categoriesProblemes: ITypeProbleme[];
  errorMessage: string;

  probleme: IProbleme;
  
  constructor(private fb: FormBuilder, private categories: TypeproblemeService, private route : Router, private problemeService: ProblemeService) { }

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
      noUnite: '',
      descriptionProbleme: ['', [Validators.required, ZonesValidator.longueurMinimum(5)]]
      //dateProbleme: {value: Date(), disabled: true}

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
    if (this.problemeForm.dirty && this.problemeForm.valid) {
        // Copy the form values over the problem object values
        this.probleme = this.problemeForm.value;
        this.probleme.id = 0;
        if (this.problemeForm.get('courrielGroup.courriel').value != ''){

          this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
        }
        //this.probleme.dateProbleme = new Date();
        this.problemeService.saveProbleme(this.probleme)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } else if (!this.problemeForm.dirty) {
        this.onSaveComplete();
    }
  }
  
  onSaveComplete(): void { 
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.route.navigate(['/accueil']);
  }

}
