export class FinancialStaticBusinessRule {

  static minValue = new Date('0001-01-01T00:00:00');
  static currentDate: Date = new Date();
  static currentDateWithoutHours = this.currentDate.setHours(0, 0, 0, 0)


  //Grid html View
  static compareDateWasPaidGridButton(value: string) {
    console.log(value)
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
  static isExpired(expiresDate: string, wasPaidDate: string): boolean {

    const expired = new Date(expiresDate).setHours(0, 0, 0, 0);
    const wasPaid = new Date(wasPaidDate).setHours(0, 0, 0, 0);

    if (expired >= this.currentDateWithoutHours)
      return false;

    if (expired < this.currentDateWithoutHours && wasPaid == this.minValue.setHours(0, 0, 0, 0))
      return true;

    return null;
  }

  static checkYearAndMonthIsCurrent(value: string) {

    const expiration = new Date(value);

    return this.currentDate.getFullYear() == expiration.getFullYear() && expiration.getMonth() <= this.currentDate.getMonth();
  }

  static isPending(expiration: string, wasPaid: string): boolean {

    const was = new Date(wasPaid).setHours(0, 0, 0, 0);
    const expire = new Date(expiration).setHours(0, 0, 0, 0);

    if (new Date(was).getFullYear() == this.minValue.getFullYear())
      return new Date(expire) >= new Date(this.currentDateWithoutHours)

      return false;

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
