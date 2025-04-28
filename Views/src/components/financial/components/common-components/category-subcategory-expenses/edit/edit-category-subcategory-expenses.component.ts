import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckbox as MatCheckbox, MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CategoryExpenseDto } from '../dto/category-expense-dto';
import { PayCycleArray } from '../dto/pay-cycle-dto';
import { SubcategoryExpenseDto } from '../dto/subcategory-expense-dto';
import { CategorySubcategoryExpensesService } from '../services/category-subcategory-expenses.service';

@Component({
  selector: 'edit-category-subcategory-expenses',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    NgFor,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,

  ],
  templateUrl: './edit-category-subcategory-expenses.component.html',
  styleUrls: ['./edit-category-subcategory-expenses.component.css']
})
export class EditCategorySubcategoryExpensesComponent extends Add implements OnInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _service: CategorySubcategoryExpensesService,
    private _dialog: MatDialog,
  ) {
    super(_breakpointObserver);
  }

  payCycle = PayCycleArray.payCycle;

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

  deleteCategory(x: CategoryExpenseDto) {

    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { id: x.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${x.name}` },
      autoFocus: true,
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'delete-dialog-class',

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.id != null) {
        this.fillersExpenses.pipe(
          map((x: CategoryExpenseDto[]) => {
            x.find(xy => {
              if (xy.id == result.id) {
                const toDelete = xy;
                this.formMain = this._fb.group(toDelete);
                this._service.delete(this.formMain);
              }
            })
            const toDelete = x.find(x => x.id == result.id)
            toDelete.deleted = true;
            toDelete.subcategoriesExpenses.forEach(x => x.deleted = true);
          }),
        ).subscribe()
      }
      this.removeDeletedItemFromMatSelect(result.id)
    })
  }

  findToDelete() {
    const id: number = this.formMain.get('name').value;
    this.fillersExpenses.pipe(
      map((x: CategoryExpenseDto[]) => {
        x.forEach(Xid => {
          if (Xid.id == id)
            this.deleteCategory(Xid)
        })
      }),
    ).subscribe();
  }

  removeDeletedItemFromMatSelect(id: number) {
    this.fillersExpenses = this.fillersExpenses.pipe(map(m => {
      const index = m.findIndex(ind => ind.id === id)
      console.log(index)
      m.splice(index, 1);
      return m;
    }))
  }

  editChk: boolean = true;
  btnSave: boolean = true;
  editCheck(edit: MatCheckbox) {
    if (edit.checked)
      this.editChecked(!edit.checked)
    else
      this.editUnChecked(!edit.checked);
  }

  editChecked(checked: boolean) {
    const id: number = this?.formMain?.get('name').value;
    this.delete = false;

    if (this.getSubcategories)
      this.getSubcategories?.controls?.forEach(x => x.enable())

    this.btnSave = checked;
    this.editChk = checked;
    this.fillersExpenses.pipe(
      map((x: CategoryExpenseDto[]) => {
        //this.formMain.get('payCycle').setValue(x.find(Xid => Xid.id == id).payCycle);
        x.forEach(Xid => {
          if (Xid.id == id)
            this.formLoadEditCategory(Xid);
        })
      }),
    ).subscribe();
  }

  editUnChecked(checked: boolean) {
    this.getSubcategories.controls.forEach(x => x.disable())
    this.btnSave = checked;
    this.editChk = checked;
    this.formLoadEditCat.reset();
    this.delete = true;
  }

  disableToAdd: boolean = false;
  delete: boolean = false;
  selectedCategoryExpensesId(id: number) {

    if (this.formMain.get('name').value == -1) {
      this.disableToAdd = true;
      this.formLoadEditCat.get('name').setValue('Nova Categoria');
      this.formLoadEditCat.get('id').setValue(0);
      this.editChk = false;
      this.btnSave = false;
      this.delete = false;
    }
    else {
      this.disableToAdd = false;
      this.editChk = true;
      this.btnSave = true;
      this.delete = true;

    }

    this.getSubcategories.clear();
    this.getSubcategories.reset();

    const selected = this.fillersExpenses.pipe(
      map((x: CategoryExpenseDto[]) => {
        // this.formMain.get('payCycle').setValue(x.find(Xid => Xid.id == id).payCycle);
        return x.find(Xid => Xid.id == id).subcategoriesExpenses;
      }),
    ).subscribe(
      x => {
        this.subcategoryFormLoaded(x);
      });

  }
  selectedCycle(id: number) {
    console.log(id)

  }

  back() {
    window.history.back();
  }

  formLoad(x?: CategoryExpenseDto) {
    // console.log(x?.payCycle)
    this.formMain = this._fb.group({
      id: [x?.id || 0, [Validators.required]],
      name: [x?.name || '', [Validators.required, Validators.maxLength(30)]],
      // payCycle: [x?.payCycle || '', [Validators.required]],
      companyId: [x?.companyId || this.companyId, []],
      subcategoriesExpenses: this._fb.array([]),
      deleted: [false, []],
    })
    this.subcategoryFormLoaded(x?.subcategoriesExpenses);
  }

  formLoadEditCat: FormGroup;
  formLoadEditCategory(x?: CategoryExpenseDto) {
    this.formLoadEditCat = this._fb.group({
      id: [x?.id || 0, [Validators.required]],
      name: [x?.name.toUpperCase() || '', [Validators.required, Validators.maxLength(30)]],
      // payCycle: [x?.payCycle || '', [Validators.required]],
    })
  }

  subcategoryFormLoaded(x?: SubcategoryExpenseDto[]) {
    x?.forEach(y => {
      this.getSubcategories.push(
        this._fb.group(
          {
            id: [y?.id || 0, [Validators.required]],
            name: [{ value: y?.name.toUpperCase() || '', disabled: true }, [Validators.required, Validators.maxLength(50)]],
            payCycle: [y?.payCycle || '', [Validators.required]],
            categoryExpensesId: [y?.categoryExpensesId || 0, []],
            deleted: [y?.deleted || false, []],
          }
        )
      )
    });
  }

  get getSubcategories() {
    return <FormArray>this.formMain.get('subcategoriesExpenses')
  }

  subcategoryFormLoad() {
    return this._fb.group({
      id: [0, [Validators.required]],
      name: [null, [Validators.required, Validators.maxLength(30)]],
      payCycle: ['', [Validators.required]],
      categoryExpensesId: [0, []],
      deleted: [false, []],
    })
  }

  addSubcategories() {
    this.getSubcategories.push(this.subcategoryFormLoad());
    this.validationSubcategory();
  }

  isExists(value: string) {
    const selected = this.fillersExpenses.pipe(
      map((x: CategoryExpenseDto[]) => {
        if (x.find(xy => xy.name.toLowerCase() == value.toLowerCase()))
          this.validationCategoryIsExist();
        else
          this.validationCategoryIsExistClearError();
      }),
    ).subscribe();
  }

  removeSubcategory(index: number) {
    this.getSubcategories.controls.forEach((value, ind) => {
      if (index == ind) {
        value.get('deleted').setValue(true);
        if (!value.valid)
          this.getSubcategories.removeAt(index);

        if (value.valid && value.value.id == 0)
          this.getSubcategories.removeAt(index);
      }
    })
    this.validationSubcategory();
  }

  validationSubcategory() {

    const length: boolean[] = [];

    this.getSubcategories.controls.forEach(x => {

      if (x.get('deleted').value != true) {
        length.push(true);
      }

      if (length.length > 0)
        this.formLoadEditCat.controls['name'].setErrors(null);

      if (length.length == 0) {
        this.formLoadEditCat.controls['name'].setErrors({ requiredSubcategory: true });
        this.formLoadEditCat.controls['name'].markAsTouched();
      }
    })

    if (length.length == 0)
      return false;

    return true;
  }

  requiredSubcategory() {
    return this.formMain?.get('name')?.hasError('requiredSubcategory')
      ? `${'Subcategoria' + ' Preenchimento obrigatório.'}` : ''
  }

  requiredSubcategoryEditCat() {
    return this.formLoadEditCat?.get('name')?.hasError('requiredSubcategory')
      ? `${'Subcategoria' + ' Preenchimento obrigatório.'}` : ''
  }

  validationCategoryIsExist() {

    this.formMain.controls['name'].setErrors({ alreadyExists: true })
    this.formLoadEditCat.controls['name'].setErrors({ alreadyExists: true })
  }
  validationCategoryIsExistClearError() {

    this.formMain.controls['name'].setErrors(null)
    this.formLoadEditCat.controls['name'].setErrors(null)
  }

  categoryIsExist() {
    return this.formMain?.get('name')?.hasError('alreadyExists')
      ? `${'Categoria já cadastrada!'}` : ''
  }

  save() {

    if (this.validationSubcategory()) {

      this.makeFormBeforeSaveUpdate();

      if (this.alertSave(this.formMain)) {
        this.saveBtnEnabledDisabled = true;
        this._service.updateOrSave(this.formMain)

      }
    }
    else {
      // this.formLoadEditCat.controls['name'].setErrors({ requiredSubcategory: true });
      this.formLoadEditCat.controls['name'].markAsTouched();
    }
  }

  makeFormBeforeSaveUpdate() {
    const id = this.formLoadEditCat.get('id').value;
    const name = this.formLoadEditCat.get('name').value;

    this.formMain.get('id').setValue(id);
    this.formMain.get('name').setValue(name);
  }

  fillersExpenses = new Observable<CategoryExpenseDto[]>();
  newCat() {
    const newCategory = new CategoryExpenseDto();
    newCategory.id = -1;
    newCategory.name = "INSERIR -- (NOVA CATEGORIA)";
    return newCategory;
  }

  loadData() {
    this.formLoad();
    this.formLoadEditCategory();
    this.fillersExpenses = this._service.getFillers().pipe(
      map(x => [...x, this.newCat()]),
    )
  }

  ngOnInit(): void {
    this.screen();
    this.loadData();
  }
}
