import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      })
      // ,
      // aliases: this.fb.array([
      //   this.fb.control('')
      // ])
    });
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  zipCodeToCity: { [key: string]: string } = {
    "30002": "Avondale Estates",
    "30004": "Alpharetta",
    "30005": "Alpharetta",
    "30008": "Marietta",
    "30009": "Alpharetta",
    "30011": "Auburn",
    "30012": "Conyers",
    "30013": "Conyers",
    "30014": "Covington",
    "30016": "Covington",
    "30017": "Grayson",
    "30019": "Dacula",
    "30021": "Clarkston",
    "30022": "Alpharetta",
    "30024": "Suwanee",
    "30025": "Social Circle",
    "30030": "Decatur",
    "30032": "Decatur",
    "30033": "Decatur",
    "30034": "Decatur",
    "30035": "Decatur",
    "30038": "Lithonia",
    "30039": "Snellville",
    "30040": "Cumming",
    "30041": "Cumming",
    "30043": "Lawrenceville",
    "30044": "Lawrenceville",
    "30045": "Lawrenceville",
    "30046": "Lawrenceville",
    "30047": "Lilburn",
    "30052": "Loganville",
    "30054": "Oxford",
    "30055": "Mansfield",
    "30056": "Newborn",
    "30058": "Lithonia",
    "30060": "Marietta",
    "30061": "Marietta",
    "30062": "Marietta",
    "30063": "Marietta",
    "30064": "Marietta",
    "30065": "Marietta",
    "30066": "Marietta",
    "30067": "Marietta",
    "30068": "Marietta",
    "30069": "Marietta",
    "30144": "Kennesaw", 
    "30150": "Marietta",
    "30152": "Marietta",
    "30188": "Woodstock",
    "30189": "Woodstock"
  };

  stateToZipCode: {[state: string]: string[]} = {
    "Georgia": [
      "30002", "30004", "30005", "30008", "30009", "30011", "30012", "30013", "30014",
      "30016", "30017", "30019", "30021", "30022", "30024", "30025", "30030", "30032",
      "30033", "30034", "30035", "30038", "30039", "30040", "30041", "30043", "30044",
      "30045", "30046", "30047", "30052", "30054", "30055", "30056", "30058", "30060",
      "30061", "30062", "30063", "30064", "30065", "30066", "30067", "30068", "30069",
      "30144", "30150", "30152", "30188", "30189"
    ]
  };


  
  

  onZipChange() {
    const zipControl = this.profileForm.get('address.zip');
    const cityControl = this.profileForm.get('address.city');
    const stateControl = this.profileForm.get('address.state')

    const zipCodeToState: { [zipCode: string]: string } = {};
     for (const stateName of Object.keys(this.stateToZipCode)) {
            const zipCodes = this.stateToZipCode[stateName];
            for (const zipCode of zipCodes) {
                zipCodeToState[zipCode] = stateName;
        }
     }

    if (zipControl && cityControl) {
      const zipCode = zipControl.value;

      if (zipCode && this.zipCodeToCity.hasOwnProperty(zipCode)) {
        const cityName = this.zipCodeToCity[zipCode];
        const stateName = zipCodeToState[zipCode]
        cityControl.setValue(cityName);
        stateControl?.setValue(stateName)
      } else {
        cityControl.setValue('');
        stateControl?.setValue('');
      }
    }
  }
}
