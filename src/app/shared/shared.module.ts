import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NicknameEditorContainerComponent } from './nicknames/nicknames-editor/containers/nickname-editor-container/nickname-editor-container.component';
import { NicknamesValidationService } from './nicknames/nicknames-editor/services/nicknames-validation.service';

@NgModule({
  declarations: [
    NicknameEditorContainerComponent, 
  ],
  exports: [
    NicknameEditorContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    NicknamesValidationService
  ],
})
export class SharedModule { }
