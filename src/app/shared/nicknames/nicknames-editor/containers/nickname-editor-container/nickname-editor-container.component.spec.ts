import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { NicknameEditorContainerComponent } from './nickname-editor-container.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NicknamesValidationService } from '../../services/nicknames-validation.service';

describe('NicknameEditorContainerComponent', () => {
  let component: NicknameEditorContainerComponent;
  let fixture: ComponentFixture<NicknameEditorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NicknameEditorContainerComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: NicknamesValidationService, useValue: new NicknamesValidationService() },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NicknameEditorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('button events', () => {
    it('#"add nickname button" should call onAddNicknameClick()', async(() => {
      spyOn(component, 'onAddNicknameClick');

      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();

      fixture.whenStable().then(() => {
        expect(component.onAddNicknameClick).toHaveBeenCalledTimes(1);
      });
    }))

    it('#"add nickname" button should create new text input', fakeAsync(() => {
      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();

      fixture.detectChanges();
      tick(500);
      fixture.whenStable().then(() => {
        let newInput = fixture.debugElement.nativeElement.querySelector('input');
        let att = newInput.getAttribute("ng-reflect-name");
        expect(newInput).not.toBeNull();
        expect(att).toBe('0');
      });
    }))
  });

  describe('validator: ', async () => {
    it('#should show "Not starting with A"', fakeAsync(inject([NicknamesValidationService, FormBuilder], (validationService: NicknamesValidationService, fb: FormBuilder) => {
      component.existingNicknames = ["b"];
      component.ngOnInit();

      fixture.detectChanges();

      tick(500);
      fixture.whenStable().then(() => {
        let divFieldDuplicate = fixture.debugElement.nativeElement.querySelector('div[name="validatorisduplicate"]');
        let divFieldStartsA = fixture.debugElement.nativeElement.querySelector('div[name="validatornotstartsa"]');

        expect(divFieldDuplicate).toBeNull();
        expect(divFieldStartsA).not.toBeNull();
      });
    })));

    it('#should show "Duplicate"', fakeAsync(inject([NicknamesValidationService, FormBuilder], (validationService: NicknamesValidationService, fb: FormBuilder) => {
      component.existingNicknames = ["aAAA", "aBBB", "aAAA"];
      component.ngOnInit();

      fixture.detectChanges();
      tick(500);
      fixture.whenStable().then(() => {
        let divFieldDuplicate = fixture.debugElement.nativeElement.querySelector('div[name="validatorisduplicate"]');
        let divFieldStartsA = fixture.debugElement.nativeElement.querySelector('div[name="validatornotstartsa"]');

        expect(divFieldDuplicate).not.toBeNull();
        expect(divFieldStartsA).toBeNull();
      });
    })));
  });

  describe('save button: ', async () => {
    it('#should be "Disabled" if any nicknames done begin with "a"', fakeAsync(inject([NicknamesValidationService, FormBuilder], (validationService: NicknamesValidationService, fb: FormBuilder) => {
      component.existingNicknames = ["bAAA", "aAAA"];
      component.ngOnInit();

      fixture.detectChanges();
      tick(500);
      fixture.whenStable().then(() => {
        let saveButton = fixture.debugElement.nativeElement.querySelector('button[name="savebutton"]');
        let att = saveButton.getAttribute("disabled");
        expect(saveButton).not.toBeNull();
        expect(att).not.toBeNull();
      });
    })));

    it('#should be "Disabled" if any nicknames are duplicates', fakeAsync(inject([NicknamesValidationService, FormBuilder], (validationService: NicknamesValidationService, fb: FormBuilder) => {
      component.existingNicknames = ["aAAA", "aBBB", "aAAA"];
      component.ngOnInit();

      fixture.detectChanges();
      tick(500);
      fixture.whenStable().then(() => {
        let saveButton = fixture.debugElement.nativeElement.querySelector('button[name="savebutton"]');
        let att = saveButton.getAttribute("disabled");
        expect(saveButton).not.toBeNull();
        expect(att).not.toBeNull();
      });
    })));

    it('#should be "Enabled" if list is valid', fakeAsync(inject([NicknamesValidationService, FormBuilder], (validationService: NicknamesValidationService, fb: FormBuilder) => {
      component.existingNicknames = ["aAAA", "aBBB", "aCCC"];
      component.ngOnInit();

      fixture.detectChanges();
      tick(500);
      fixture.whenStable().then(() => {
        let saveButton = fixture.debugElement.nativeElement.querySelector('button[name="savebutton"]');
        let att = saveButton.getAttribute("disabled");
        expect(saveButton).not.toBeNull();
        expect(att).toBeNull();
      });
    })));

    it('#should be "Enabled" if list is empty', fakeAsync(inject([NicknamesValidationService, FormBuilder], (validationService: NicknamesValidationService, fb: FormBuilder) => {
      component.existingNicknames = [];
      component.ngOnInit();

      fixture.detectChanges();
      tick(500);
      fixture.whenStable().then(() => {
        let saveButton = fixture.debugElement.nativeElement.querySelector('button[name="savebutton"]');
        let att = saveButton.getAttribute("disabled");
        expect(saveButton).not.toBeNull();
        expect(att).toBeNull();
      });
    })));
  });
});
