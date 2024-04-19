
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
// import { CollectDeliverValidators } from "../validators/collect-deliver-to-delete.validators";
import { BaseForm } from "src/shared/helpers/forms/base-form";
import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/dto/partner-dto";
import { IRadiosDictionary } from "src/shared/components/radio-button-g/interfaces/Iradios-dictionary";
import { ValidatorMessages } from "src/shared/helpers/validators/validators-messages";
import { CollectDeliverToDeleteValidators } from "../validators/collect-deliver-to-delete.validators";


export class CollectDeliverFormHandle extends BaseForm {

  constructor(private _fb?: FormBuilder) {
    super()
  }

  private valLocal = CollectDeliverToDeleteValidators;
  get validatorLocal() {
    return this.valLocal
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  onChangeRadioDestinyHandle(forms: FormGroup[], choice: string) {

    const chosen = choice;
    const formsReceived = forms;

    formsReceived?.forEach(form => {

      if (form.contains('noRegisterName') && chosen === 'others') {
        this.validatorLocal.required(form, ['noRegisterName', 'noRegisterAddress']);
        this.removeValidatorsSetFormFieldsValueNull(form, ['partnerId', 'customerId'])
      }

      if (form.contains('companyId') && chosen === 'others') this.validatorLocal?.atLeastOneCheckBox(form, ['collect', 'deliver', 'other'])


      if (form.contains('companyId') && chosen !== 'others') this.removeValidatorsSetFormFieldsValueNull(form, ['collect', 'deliver', 'other'])
    })

  }

  onChangeRadioPaymentHandle(forms: FormGroup[], choice: string) {

    const chosen = choice;
    const formsReceived = forms;

    formsReceived.forEach(form => {

      if (form.contains('base') && chosen === 'customer') {
        this.validatorLocal.required(form, ['customerId']);
        this.removeValidatorsSetFormFieldsValueNull(form, ['partnerId'])
      }

      if (form.contains('base') && chosen === 'partner') {
        this.validatorLocal.required(form, ['partnerId']);
        this.removeValidatorsSetFormFieldsValueNull(form, ['customerId'])
      }
    })

  }

  selectedEntityToPayHandle(form: FormGroup, selected: any) {

    const selectedEntitytype = selected;
    const formReceived = form;

    switch (selectedEntitytype.type) {

      case 'customer':
        this.removeValidatorsSetFormFieldsValueNull(formReceived, ['partnerId']);
        formReceived.get('base').setValue(false)
        formReceived.get('customerId').setValue(`${selectedEntitytype.entity.id}`)
        break;

      case 'partner':
        this.removeValidatorsSetFormFieldsValueNull(formReceived, ['customerId']);
        formReceived.get('base').setValue(false)
        formReceived.get('partnerId').setValue(`${selectedEntitytype.entity.id}`)
        break;
    }
  }


  mtdFormsControlsCleanRadioDestinyHandle(forms: FormGroup[]) {

    const formsReceived = forms;
    const fields = ['collect', 'deliver', 'other']

    formsReceived.forEach(form => {

      if (form.contains('noRegisterName')) {
        this.SetFormFieldsValueNull(form, ['partnerId', 'customerId', 'noRegisterName', 'noRegisterAddress']);
      }

      if (form.contains('companyId')) {
        fields.forEach(field => {
          form.get(field).setValue(false);
        })
      }
    })

  }

  mtdSetFormDestinyHandle(forms: FormGroup[], selected: any, status: boolean, field: string) {

    const statusChanged = status;
    const formsReceived = forms;
    const fieldReceived = field;

    if (selected.obj.hasOwnProperty('assured')) {

      const entityReceived: CustomerDto = selected.obj;

      formsReceived.forEach(form => {

        if (form.contains('companyId')) form.get(fieldReceived).setValue(statusChanged)

        if (form.contains('noRegisterName')) {
          form.get('customerId').setValue(entityReceived.id);

          if (!statusChanged)
            form.get('customerId').setValue(null);
        }
      })

    }

    if (selected.obj.hasOwnProperty('businessLine')) {

      const entityReceived: PartnerDto = selected.obj;

      formsReceived.forEach(form => {

        if (form.contains('companyId')) form.get(fieldReceived).setValue(statusChanged)

        if (form.contains('noRegisterName')) {
          form.get('partnerId').setValue(entityReceived.id);

          if (!statusChanged)
            form.get('partnerId').setValue(null);
        }

      })

    }

  }

  destinySubFormSetValidator(form: FormGroup) {
    this.validatorLocal.required(form, ['partnerId', 'customerId', 'noRegisterName', 'noRegisterAddress']);
  }

  mtdfomMainErrorValidationMessage() {
    return this._fb.group({
      transporterId: ['Transportador', []],
      subjectReason: ['Motivo', []],
      contactName: ['Contato no local', []],
      price: ['Valor', []],
      collect: ['Coleta', []],
      deliver: ['Entrega', []],
      other: ['Serviços', []],
      taskOverView: ['Descrição', []]
    })
  }

  mtdbillingFromFormErrorValidationMessage() {
    return this._fb.group({
      customerId: ['Receber de cliente', []],
      partnerId: ['Receber de parceiro ', []],
      base: ['Custo da propria empresa', []],
    })
  }

  mtddestinySubFormErrorValidationMessage() {
    return this._fb.group({
      customerId: ['Destino cliente', []],
      partnerId: ['Destino parceiro', []],
      noRegisterName: ['Destino não cadastrado', []],
      noRegisterAddress: ['Destino não cadastrado', []],
      collectDeliverId: ['', []]
    })
  }

  radiosEntitiesDic(value: string): IRadiosDictionary<string> {

    let entitiesPlace: IRadiosDictionary<string> =
      { "C,Não cadastrado": "others", "B,Parceiro": "partner", "A,Cliente": "customer" }

    let entitiesPayment: IRadiosDictionary<string> = { "B,Parceiro": "partner", "A,Cliente": "customer" }

    if (value === 'place')
      return entitiesPlace;

    if (value === 'payment')
      return entitiesPayment;

    return entitiesPlace;
  }

  validationDestinyWhenSaiving(form: FormGroup) {

    if (form.get('customerId').value) {
      this.removeValidatorsSetFormFieldsValueNull(form, ['partnerId', 'noRegisterName', 'noRegisterAddress']);
    }

    if (form.get('partnerId').value) {
      this.removeValidatorsSetFormFieldsValueNull(form, ['customerId', 'noRegisterName', 'noRegisterAddress']);
    }

    if (form.get('noRegisterName').value && !form.get('noRegisterAddress').value) {
      this.removeValidatorsSetFormFieldsValueNull(form, ['customerId', 'partnerId']);
    }
  }

  handleFormToShow(form: FormGroup, field: string) {

    switch (field) {
      case 'collect':
        if (!form.get('collect').value) {
          return ''
        }
        else {
          return 'Sim'
        }
        break;
      case 'deliver':
        if (!form.get('deliver').value) {
          return ''
        }
        else {
          return 'Sim'
        }
        break;
      case 'other':
        if (!form.get('other').value) {
          return ''
        }
        else {
          return 'Sim'
        }
        break;
      case 'base':
        if (form.get('billingFrom').get('base').value) {
          return 'Será adicionado como despesa da base'
        }
        else {
          return ''
        }
        break;
      case 'name':
        if (!form.get('destiny').get('noRegisterName').value) {
          return ''
        }
        else {
          return form.get('destiny').get('noRegisterName').value;
        }
        break;
      case 'address':
        if (!form.get('destiny').get('noRegisterAddress').value) {
          return ''
        }
        else {
          return form.get('destiny').get('noRegisterAddress').value;
        }
        break;
    }

    return '';
  }
  formToShowConfirmationPanel(form: FormGroup, nameEntityToGo: string, nameEntityToPayment: string, nameTransporter: string) {

    const entityToShow = {
      'A,Motivo': form.get('subjectReason').value,
      'E,Contato no local': form.get('contactName').value,
      'F,Descrição': form.get('taskOverView').value,
      'C,Preço': form.get('price').value,
      'G,Transportador': nameTransporter,
      'D,Coleta': this.handleFormToShow(form, 'collect'),
      'D,Entrega': this.handleFormToShow(form, 'deliver'),
      'D,Serviço/Outros': this.handleFormToShow(form, 'other'),

      'B,Destino': nameEntityToGo,
      'B,Nome': this.handleFormToShow(form, 'name'),
      'B,Endereço': this.handleFormToShow(form, 'address'),

      'H,Receber de': nameEntityToPayment,
      'H,Custo da base': this.handleFormToShow(form, 'base'),
    }

    return entityToShow;
  }



  // test() {

  //   const entityToShow = {
  //     'A,Motivo': 'Buscar NoteBook do cliente no reparo terceirizado',

  //     'B,Destino': 'Solution NoteBooks',
  //     'B,Nome': '',
  //     'B,Endereço': '',

  //     'C,Preço': 33.33,

  //     'D,Coleta': 'Sim',
  //     'D,Entrega': 'Não',
  //     'D,Serviço/Outros': 'Nenhum',

  //     'E,Contato no local': 'Atila ou qualquer atendente no local.',
  //     'F,Descrição': 'NoteBook Dell Inspiron 1535 preto com prata 16 GB ram hd 480GB',

  //     'G,Transportador': 'Marceleta Transportes',


  //     'H,Receber de': 'Laender Vianna',
  //     'H,Custo da base': '',
  //   }

  //   return entityToShow;
  // }



}
