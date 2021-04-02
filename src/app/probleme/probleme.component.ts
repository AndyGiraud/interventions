import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
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
    this.problemeForm =this.fb.group({
      prenom: ['', [Validators.required, ZonesValidator.longueurMinimum()]],
      nom: ['', [Validators.required, ZonesValidator.longueurMaximum()]]
    });

    this.categories.obtenirCategories()
    .subscribe(cat => this.categoriesProblemes = cat,
               error => this.errorMessage = <any>error);  

  }

  save(): void{
    
  }

}
