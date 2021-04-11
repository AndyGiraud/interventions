import { AbstractControl } from "@angular/forms";

import { ZonesValidator } from "./longueur-minimum.component";

describe('longueur Zones Validator', () => {

    it('#7 | une chaîne avec 10 espaces est invalide', () => {

        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum();
        let valeurControle = { value: "          " };

        //Faire l'appel du validateur 
        let result = validator(valeurControle as AbstractControl);

        //Comparer le resultat OBTENUE avec le résutat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);

    });

    it('#8 | Une phrase avec des mots est valide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum();
        let valeurControle = { value: "Vive angular" };
        //Faire l'appel du validateur 
        let result = validator(valeurControle as AbstractControl);
        //Comparer le resultat OBTENUE avec le résutat PRÉVU
        expect(result).toBeNull();

    });

    it('#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum();
        let valeurControle = { value: "   je le veux   " };
        //Faire l'appel du validateur 
        let result = validator(valeurControle as AbstractControl);
        //Comparer le resultat OBTENUE avec le résutat PRÉVU
        expect(result).toBeNull();

    });

    it('#10 | Une phrase avec 1 espace et 2 caractères est invalide.', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum();
        let valeurControle = { value: " xx" };
        //Faire l'appel du validateur 
        let result = validator(valeurControle as AbstractControl);
        //Comparer le resultat OBTENUE avec le résutat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);

    });

    it('#11 | Une phrase avec 2 espace et 1 caractères est invalide.', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum();
        let valeurControle = { value: "  x" };
        //Faire l'appel du validateur 
        let result = validator(valeurControle as AbstractControl);
        //Comparer le resultat OBTENUE avec le résutat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);

    });

    it('#12 | Une phrase avec 3 espaces et 3 caractères est valide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum();
        let valeurControle = { value: "   xxx" };
        //Faire l'appel du validateur 
        let result = validator(valeurControle as AbstractControl);
        //Comparer le resultat OBTENUE avec le résutat PRÉVU
        expect(result).toBeNull();

    });

    it('#13 | Une phrase avec 3 espaces et 3 caractères est valide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum();
        let valeurControle = { value: "     xxxxx     " };
        //Faire l'appel du validateur 
        let result = validator(valeurControle as AbstractControl);
        //Comparer le resultat OBTENUE avec le résutat PRÉVU
        expect(result).toBeNull();

    });

    it('#14 | Une chaîne nulle est invalide', () => {
        //Préparer une variable pour manipuler le validateur
        let validator = ZonesValidator.longueurMinimum();
        let valeurControle = { value: null };
        //Faire l'appel du validateur 
        let result = validator(valeurControle as AbstractControl);
        //Comparer le resultat OBTENUE avec le résutat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);

    });

});