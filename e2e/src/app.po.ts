import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {

  obtenirClasseZoneNomProbleme(): any {
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  }

  async navigateTo(): Promise<unknown> {
    return browser.get("/probleme");
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root h5')).getText();
  }

  
  async setChampsValidesScenarioNominal() : Promise<void> {
    await element(by.id('prenomId')).sendKeys('tonprenom');
    await element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('noTypeProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('NotifiezMoiId')).get(0).click();  
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }
  
  
  // Permet de vider toutes les zones.  A appeller dans chaque test.
  async viderToutesLesZones() : Promise<void> {
    await element(by.id('prenomId')).clear();  
    await element(by.id('nomId')).clear();     
    // Sélectionner le premier élément dans la zone de liste déroulante (Sélectionner un type de problème (obligatoire))
    await element(by.id('noTypeProblemeId')).all(by.tagName('option')).get(0).click();      
    // Cliquer sur le bouton radio par défaut (Pas de notification)
    await element.all(by.id('NotifiezMoiId')).get(0).click();
    //await element(by.id('courrielId')).clear();
    //await element(by.id('courrielConfirmationId')).clear();   
    //await element(by.id('telephoneId')).clear();       
    await element(by.id('noUniteId')).clear();
    await element(by.id('descriptionProblemeId')).clear();     
  }
  
  async setChampsValidesScenarioAlternatifParMessageTexte  () : Promise<void> {
    await element(by.id('prenomId')).sendKeys('tonprenom');
    await element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('noTypeProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('NotifiezMoiId')).get(1).click(); 
    await element(by.id('telephoneId')).sendKeys('1234567890');  
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
    
  }
  
   // Inscrire tous les renseignements obligatoires pour le scénario alternatif de notification par courriel (scénario nominal + courriel/courrielConfirmation doivent être consignés)
  async setChampsValidesScenarioAlternatifParCourriel() : Promise<void> {
    await element(by.id('prenomId')).sendKeys('tonprenom');
    await element(by.id('nomId')).sendKeys('tonnom');    
    // Sélectionner le X élément dans la zone de liste déroulante
    await element(by.id('noTypeProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur le bouton radio voulu
    await element.all(by.id('NotifiezMoiId')).get(2).click(); 
    await element(by.id('courrielId')).sendKeys('abc@abc.com');
    await element(by.id('courrielConfirmationId')).sendKeys('abc@abc.com');
    
    await element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
    
  }
  
  // Permet d'obtenir toutes les propriétés et leurs valeurs du bouton Sauvegarder
  boutonSubmit() : ElementFinder { 
      return element(by.buttonText('Sauvegarder'));
    } 
    
    setZoneNomProblemeCaracteresInsuffisant() {
      element(by.id('descriptionProblemeId')).clear();
      element(by.id('descriptionProblemeId')).sendKeys('XX')
    }
    
    // Permet d'obtenir la classe appliquee actuellement dans la zone Description (entre autres is-valid ou is-invalid)
  obtenirClasseZoneDescriptionProbleme(): any { 
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  } 
}
  