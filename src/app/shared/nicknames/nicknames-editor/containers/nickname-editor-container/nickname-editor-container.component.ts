import { Component, Input, Output, EventEmitter, OnInit, ViewRef, ViewChildren, QueryList } from '@angular/core';
import { NicknamesValidationService } from '../../services/nicknames-validation.service';
import { FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { timeout } from 'q';

@Component({
  selector: 'nickname-editor-container',
  templateUrl: './nickname-editor-container.component.html'
})
export class NicknameEditorContainerComponent implements OnInit {
  @Input() existingNicknames: Array<string> = [];
  @Output() emittingSave: EventEmitter<{ nicknames: Array<string> }> = new EventEmitter<{nicknames: Array<string>}>();
  @ViewChildren('input') controls: QueryList<any>;

  constructor(
    private validationService: NicknamesValidationService,
    private fb: FormBuilder) {
  }

  fg = this.fb.group({ fa: this.fb.array([]) });

  get fa(): FormArray {
    return this.fg.get('fa') as FormArray;
  }

  ngOnInit() {
    this.existingNicknames.forEach((nickname) => {
      this.createNicknameControl(nickname)
    });
  }

  onAddNicknameClick() {
    this.createNicknameControl();
  }

  onSubmit() {
    const nicknames = this.getFormControlValuesAsArray();
    this.emittingSave.emit({ nicknames: nicknames });
    console.log("SAVING..." + nicknames);
  }

  grabControl = (index: number): AbstractControl => this.getFormControls().controls[index];

  private createNicknameControl(nickname: string = "") {
    const newControl = this.fb.control(nickname, [
      this.validationService.startsWithAValidator(),
      this.validationService.duplicateValidator(this.getFormControls().controls)
    ])

    this.fa.push(newControl);
    
    this.focusIt();
  }

  private focusIt() {
    setTimeout(()=>{
      const nicknames = document.getElementsByName("nickname");
      const last = nicknames.length;
      nicknames[last-1].focus();
    })
  }
  private getFormControls = (): FormArray => <FormArray>this.fg.get('fa');

  private getFormControlValuesAsArray = () => this.getFormControls().controls.map(x => x.value);
}
