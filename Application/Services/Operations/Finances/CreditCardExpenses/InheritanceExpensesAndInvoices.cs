using System;
using System.Collections.Generic;
using System.Linq;
using Application.Exceptions;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Domain.Entities.Finances.CreditCardExpenses;

namespace Application.Services.Operations.Finances.Helpers.CreditCardExpenses
{
    public class InheritanceExpensesAndInvoices
    {
        public DateTime CurrentDate = DateTime.Now;
        public DateTime MinDate = DateTime.MinValue;

        public List<CreditCardExpenseDto> CreditCardExpensesInstallmentListMake(CreditCardExpenseDto creditCardExpenseEntity)
        {
            var creditCardExpenses = new List<CreditCardExpenseDto>();

            if (creditCardExpenseEntity.InstallmentsQuantity > 1)
                for (int n = 0; n < creditCardExpenseEntity.InstallmentsQuantity; n++)
                {
                    var expenses = InstallmentObjectMaker(creditCardExpenseEntity, n);
                    creditCardExpenses.Add(expenses);
                }

            if (creditCardExpenseEntity.InstallmentsQuantity == 1)
            {
                creditCardExpenseEntity.CurrentInstallment = $"{1}/{creditCardExpenseEntity.InstallmentsQuantity}";
                creditCardExpenses.Add(creditCardExpenseEntity);
            }

            return creditCardExpenses;
        }
        private CreditCardExpenseDto InstallmentObjectMaker(CreditCardExpenseDto creditCardExpenseEntity, int month)
        {

            CreditCardExpenseDto creditCardExpense;

            creditCardExpense = new CreditCardExpenseDto()
            {
                Id = creditCardExpenseEntity.Id,

                CurrentInstallment = $"{month + 1}/{creditCardExpenseEntity.InstallmentsQuantity}",
                Name = creditCardExpenseEntity.Name,
                CategoryExpenseId = creditCardExpenseEntity.CategoryExpenseId,
                SubcategoryExpenseId = creditCardExpenseEntity.SubcategoryExpenseId,
                CompanyId = creditCardExpenseEntity.CompanyId,
                UserId = creditCardExpenseEntity.UserId,
                PaidFromBankAccountId = null,
                Card = creditCardExpenseEntity.Card,
                CardId = creditCardExpenseEntity.CardId,
                CreditCardExpenseInvoiceId = creditCardExpenseEntity.CreditCardExpenseInvoiceId,
                CreditCardLimitOperation = creditCardExpenseEntity.CreditCardLimitOperation,
                OthersPaymentMethods = null,
                WasPaid = DateTime.MinValue,
                Document = creditCardExpenseEntity.Document,
                Expires = creditCardExpenseEntity.Expires.AddMonths(month),
                InstallmentsQuantity = creditCardExpenseEntity.InstallmentsQuantity,
                TotalPriceInterest = creditCardExpenseEntity.TotalPriceInterest,
                TotalPercentageInterest = creditCardExpenseEntity.TotalPercentageInterest,
                InstallmentPrice = creditCardExpenseEntity.InstallmentPrice,
                PaymentAtSight = creditCardExpenseEntity.PaymentAtSight,
                ExpenseDay = creditCardExpenseEntity.ExpenseDay,
                Registered = CurrentDate,
                Price = creditCardExpenseEntity.Price,
                Deleted = creditCardExpenseEntity.Deleted,
                Description = creditCardExpenseEntity.Description,
            };

            return creditCardExpense;

        }
        public CreditCardExpenseAndInvoiceReturnDto ReturnInstallmentsWithInvoice(List<CreditCardExpenseInvoice> listFromDb, List<CreditCardExpenseDto> listDto)
        {

            if (listFromDb == null || listDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var withInvoice = listDto.Where(dto => listFromDb.Any(fdb => fdb.Expires.Date == dto.Expires.Date && fdb.WasPaid == MinDate)).ToList();
            var resultAssosiated = AssociateAndSetValues(listFromDb, withInvoice);

            return resultAssosiated;
        }
        private CreditCardExpenseAndInvoiceReturnDto AssociateAndSetValues(List<CreditCardExpenseInvoice> listFromDb, List<CreditCardExpenseDto> listDto)
        {
            CreditCardExpenseAndInvoiceReturnDto toReturn = new();

            listDto.ForEach(x =>
                           {
                               listFromDb.ForEach(fdb =>
                               {
                                   var predicate = x.Expires.Date == fdb.Expires.Date;

                                   if (predicate)
                                   {
                                       x.CreditCardExpenseInvoiceId = fdb.Id;
                                       fdb.Price += x.InstallmentPrice;
                                       fdb.PaidFromBankAccountId = null;
                                   }

                               });
                           });

            toReturn.CreditCardExpenses = listDto;
            toReturn.CreditCardExpensesInvoices = listFromDb;

            return toReturn;
        }
        public List<CreditCardExpenseInvoiceDto> ReturnInstallmentsWithoutInvoice(List<CreditCardExpenseInvoice> listFromDb, List<CreditCardExpenseDto> listDto)
        {

            if (listFromDb == null || listDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var withoutInvoices = listDto.Where(dto => !listFromDb.Any(fdb => fdb.Expires.Date == dto.Expires.Date && fdb.WasPaid == MinDate)).ToList();

            return InvoicesListMake(withoutInvoices);
        }
        // public CreditCardExpenseInvoice CheckIfExistInvoceForSingleExpense(List<CreditCardExpenseInvoice> listFromDb, DateTime expenseExpires)
        // {

        //     if (listFromDb == null || expenseExpires == DateTime.MinValue) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

        //     var invoiceReturn = listFromDb.Where(x=> x.Expires.Date == expenseExpires.Date && x.WasPaid == MinDate).FirstOrDefault();

        //     return invoiceReturn;
        // }
        private List<CreditCardExpenseInvoiceDto> InvoicesListMake(List<CreditCardExpenseDto> listDto)
        {
            if (listDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            List<CreditCardExpenseInvoiceDto> result = new();

            listDto.ForEach(x =>
            {
                var creditCardExpenseInvoice = new CreditCardExpenseInvoiceDto()
                {
                    Id = 0,
                    UserId = x.UserId,
                    CompanyId = x.CompanyId,
                    CardId = x.CardId,
                    Price = x.InstallmentPrice,
                    PaidFromBankAccountId = null,
                    Expires = x.Expires,
                    ClosingDate = new DateTime(x.Expires.Year, x.Expires.Month, x.Card.ClosingDate.Day),
                    WasPaid = MinDate,
                    OthersPaymentMethods = null,
                    Document = null,
                    Description = x.Card.Description,
                    Registered = DateTime.Now,
                    CreditCardExpenses = new(),
                    Deleted = DateTime.MinValue,
                };
                x.Card = null;
                creditCardExpenseInvoice.CreditCardExpenses.Add(x);

                result.Add(creditCardExpenseInvoice);
            });

            return result;
        }

    }
}
