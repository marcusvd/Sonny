export class FinancialStaticBusinessRule {

  static minValue = new Date('0001-01-01T00:00:00');
  static currentDate: Date = new Date();


  //Grid html View
  static compareDateWasPaidGridButton(value: string) {
    const wasPaid: Date = new Date(value);
    if (wasPaid.getFullYear() != this.minValue.getFullYear())
      return false
    else
      return true;
  }

  static checkIfExpiredClassCssGrid(field: string, value: any) {

    const currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)
    const paidDate = new Date(value.wasPaid).setHours(0, 0, 0, 0);
    const expired = new Date(value.expiration).setHours(0, 0, 0, 0);

    const paidDateYear = new Date(value.wasPaid).getFullYear();

    if (field == 'expirationView') {
      if (paidDateYear != this.minValue.getFullYear())
        return "paid"

      if (expired < currentDateWithoutHours)
        return "expired"

      if (expired >= currentDateWithoutHours)
        return "will-expire"
    }

    return null;
  }

  static isPaidGrid(field: string, value: any) {

    const paidDate: Date = new Date(value.wasPaid);

    if (field == 'expirationView') {

      if (paidDate.getFullYear() != this.minValue.getFullYear())
        return "paid"
      else
        return null;

    }
    else
      return null;

  }

  //Class
  static isExpired(value: string): boolean {

    const expired = new Date(value).setHours(0, 0, 0, 0);
    const currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)

    if (expired < currentDateWithoutHours)
      return true;

    if (expired >= currentDateWithoutHours)
      return false;


    return null;
  }

  static numberOfDaysToExpire(value: string) {
    const expire: Date = new Date(value);
    const currentDate: Date = this.currentDate;

    const timeDiff = Math.abs(currentDate.getTime() - expire.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
  }

  static isPaid(value: string) {

    const paidDate: Date = new Date(value);

    return paidDate.getFullYear() != this.minValue.getFullYear();

  }


}
