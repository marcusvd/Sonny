import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function AtLeastOneDestinySelectedValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;

    const customerId = group.get('customerId')?.value as number;
    const partnerId = group.get('partnerId')?.value as number;
    const noRegisterName = group.get('noRegisterName')?.value as string;
    const noRegisterAddress = group.get('noRegisterAddress')?.value as string;

    // Verifica se nome e endereço estão preenchidos (não vazios)
    const nameAndAddressFilled = noRegisterName?.trim() && noRegisterAddress?.trim();

    // Verifica se pelo menos um ID está preenchido (não nulo e maior que 0)
    const hasValidId = (customerId > 0) || (partnerId > 0);

    const isValid = nameAndAddressFilled || hasValidId;

    if (!isValid) {
      // Aplica o erro a todos os campos
      group.get('customerId')?.setErrors({ atleastone: true });
      group.get('partnerId')?.setErrors({ atleastone: true });
      group.get('noRegisterName')?.setErrors({ atleastone: true });
      group.get('noRegisterAddress')?.setErrors({ atleastone: true });
      return { atleastone: true }; // Retorna o erro no nível do grupo também
    } else {
      // Remove os erros se válido
      group.get('customerId')?.setErrors(null);
      group.get('partnerId')?.setErrors(null);
      group.get('noRegisterName')?.setErrors(null);
      group.get('noRegisterAddress')?.setErrors(null);

      // Corrige possíveis problemas de validação
      const customerIdErrors = group.get('customerId')?.errors;
      const partnerIdErrors = group.get('partnerId')?.errors;
      const nameErrors = group.get('noRegisterName')?.errors;
      const addressErrors = group.get('noRegisterAddress')?.errors;

      if (customerIdErrors && Object.keys(customerIdErrors).length === 0) {
        group.get('customerId')?.setErrors(null);
      }
      if (partnerIdErrors && Object.keys(partnerIdErrors).length === 0) {
        group.get('partnerId')?.setErrors(null);
      }
      if (nameErrors && Object.keys(nameErrors).length === 0) {
        group.get('noRegisterName')?.setErrors(null);
      }
      if (addressErrors && Object.keys(addressErrors).length === 0) {
        group.get('noRegisterAddress')?.setErrors(null);
      }
    }

    return null;
  };
}
