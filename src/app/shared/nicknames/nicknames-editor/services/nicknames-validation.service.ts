import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn } from '@angular/forms';

@Injectable()
export class NicknamesValidationService {
  formBuilder: FormBuilder = new FormBuilder;

  constructor() { }

  duplicateValidator = (formControls: AbstractControl[]): ValidatorFn => 
    (control: AbstractControl): { [key: string]: any } | null => 
      this.isDuplicateEntry(control.value, formControls.map(x => x.value)) ? { 'isDuplicate': { value: control.value } } : null;

  startsWithAValidator = (): ValidatorFn =>
    (control: AbstractControl): { [key: string]: any } | null => 
    control.value.length > 0 && !(control.value.match(/^[a]/) !== null) ? { 'notStartsWithA': { value: control.value } } : null;

  isDuplicateEntry(key: string, arrayOfString: string[]): boolean {
    let sets = {};
    arrayOfString.forEach(x => sets[x] = (sets[x] || 0) + 1);
    for (let t in sets)
      if (t === key && Number(sets[t]) > 1) return true;

    return false;
  }
}