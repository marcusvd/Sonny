
export class PhoneHandlers {

  static handlerApiPhoneNumberFromReceitaWs(phoneNumber: string): { phoneNum: string, isMobile: boolean } {
    {

      const justOnePhoneNumber = phoneNumber.split('/')[0]

      const cleanedNumber = justOnePhoneNumber.replace(/\D/g, '');

      const localArea = cleanedNumber.slice(0, 2);
      const pureNumber = cleanedNumber.substring(2);

      if (pureNumber.length < 9 &&
        pureNumber.startsWith('6')
        || pureNumber.startsWith('7')
        || pureNumber.startsWith('8')
        || pureNumber.startsWith('9')) {

        const resultMobileHandled = `${localArea} 9 ${pureNumber}`

        return { phoneNum: resultMobileHandled, isMobile: true }
      }

      if (pureNumber.length > 8)
        return this.isMobileNumber(cleanedNumber)


      if (pureNumber.length < 9)
        return this.isMobileNumber(cleanedNumber)


      return null;
    }

  }


  static isMobileNumber(phoneNumber: string): { phoneNum: string, isMobile: boolean } {

    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    const phoneNumberRegex = /^(\(?(0?[1-9]{2}\)?\s?)(9\d{4}-\d{4}|\d{4}-\d{4}))$/;

    return { phoneNum: cleanedNumber, isMobile: phoneNumberRegex.test(cleanedNumber) };

  }
}
