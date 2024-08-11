import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { CategorySubcategoryExpensesSelectAddComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select-add/components/category-subcategory-expenses-select-add.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CategorySubcategoryExpensesService } from '../services/category-subcategory-expenses.service';

@Component({
  selector: 'category-subcategory-expenses',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    CategorySubcategoryExpensesSelectAddComponent

  ],
  templateUrl: './add-category-subcategory-expenses.component.html',
  styleUrls: ['./add-category-subcategory-expenses.component.css']
})
export class AddCategorySubcategoryExpensesComponent extends Add implements OnInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _service: CategorySubcategoryExpensesService
  ) {
    super(_breakpointObserver);
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  screenFieldPosition: string = 'column';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'

            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'


            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'

            break;
          }
        }
      }
    })


  }

  back() {
    window.history.back();
  }

  formLoad() {
    return this.formMain = this._fb.group({
      id: [0, [Validators.required]],
      name: [null || '', [Validators.required, Validators.maxLength(30)]],
      companyId: [this.companyId, []],
      subcategoriesExpenses: this._fb.array([]),
      deleted: [false, []],
    })
  }

  subcategoryFormLoad() {
    return this._fb.group({
      id: [0, [Validators.required]],
      name: [null, [Validators.required, Validators.maxLength(30)]],
      categoryExpensesId: [0, []],
      deleted: [false, []],
    })

  }

  get getSubcategories() {
    return <FormArray>this.formMain.get('subcategoriesExpenses')
  }

  addSubcategories() {
    this.getSubcategories.push(this.subcategoryFormLoad());
    this.validationSubcategory();
  }

  removeSubcategory(index: number) {
    this.getSubcategories.removeAt(index);
    this.validationSubcategory();
  }

  validationSubcategory() {
    if (this.getSubcategories.length == 0)
      this.formMain.controls['name'].setErrors({ requiredSubcategory: true })
    else
      this.formMain.controls['name'].setErrors(null);
  }

  save() {
    this.validationSubcategory();

    if (this.alertSave(this.formMain))
      this._service.save(this.formMain);
  }



  requiredSubcategory() {
    return this.formMain?.get('name')?.hasError('requiredSubcategory')
      ? `${'Subcategoria' + ' Preenchimento obrigatório.'}` : ''
  }


  ngOnInit(): void {
    this.formLoad();
    this.screen();
    this.addSubcategories();
  }
}
