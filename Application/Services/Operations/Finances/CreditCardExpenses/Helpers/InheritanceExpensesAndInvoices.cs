using System;
using System.Collections.Generic;
using System.Linq;
using Application.Exceptions;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Domain.Entities.Finances.CreditCardExpenses;

namespace Application.Services.Operations.Finances.Helpers.CreditCardExpenses.Helpers
{
    public class InheritanceExpensesAndInvoices
    {
        public DateTime CurrentDate = DateTime.Now;
        public DateTime MinDate = DateTime.MinValue;

        // public List<CreditCardExpenseDto> CreditCardExpensesInstallmentListMake(CreditCardExpenseDto creditCardExpenseEntity)
        // {
        //     var creditCardExpenses = new List<CreditCardExpenseDto>();

        //     if (creditCardExpenseEntity.InstallmentsQuantity > 1)
        //         for (int n = 0; n < creditCardExpenseEntity.InstallmentsQuantity; n++)
        //         {
        //             var expenses = InstallmentObjectMaker(creditCardExpenseEntity, n);
        //             creditCardExpenses.Add(expenses);
        //         }

        //     if (creditCardExpenseEntity.InstallmentsQuantity == 1)
        //     {
        //         creditCardExpenseEntity.CurrentInstallment = $"{1}/{creditCardExpenseEntity.InstallmentsQuantity}";
        //         creditCardExpenses.Add(creditCardExpenseEntity);
        //     }

        //     return creditCardExpenses;
        // }
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
                // PixId = null,
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
                // Interest = creditCardExpenseEntity.Interest,
                Deleted = creditCardExpenseEntity.Deleted,
                Description = creditCardExpenseEntity.Description,
            };

            return creditCardExpense;

        }

        public CreditCardExpenseAndInvoiceReturnDto InstallmentWithInvoice(List<CreditCardExpenseInvoice> listFromDb, List<CreditCardExpenseDto> listDto)
        {

            if (listFromDb == null || listDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var withInvoice = listDto.Where(dto => listFromDb.Any(fdb => new DateTime(fdb.Expires.Year, fdb.Expires.Month, fdb.Expires.Day)
                     == new DateTime(dto.Expires.Year, dto.Expires.Month, dto.Expires.Day)
                     && fdb.WasPaid == MinDate)).ToList();
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
                                   var predicate = new DateTime(x.Expires.Year, x.Expires.Month, x.Expires.Day) == new DateTime(fdb.Expires.Year, fdb.Expires.Month, fdb.Expires.Day);

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

        public List<CreditCardExpenseInvoiceDto> InstallmentWithoutInvoice(List<CreditCardExpenseInvoice> listFromDb, List<CreditCardExpenseDto> listDto)
        {

            if (listFromDb == null || listDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var withoutInvoices = listDto.Where(dto => !listFromDb.Any(fdb => new DateTime(fdb.Expires.Year, fdb.Expires.Month, fdb.Expires.Day)
                     == new DateTime(dto.Expires.Year, dto.Expires.Month, dto.Expires.Day)
                     && fdb.WasPaid == MinDate)).ToList();

            return InvoicesListMake(withoutInvoices);
        }
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
                    Deleted = false,
                };
                x.Card = null;
                creditCardExpenseInvoice.CreditCardExpenses.Add(x);

                result.Add(creditCardExpenseInvoice);
            });

            return result;
        }


        public List<CreditCardExpense> DtoToEntity(List<CreditCardExpenseDto> listDto)
        {

            if (listDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            List<CreditCardExpense> result = new();

            listDto.ForEach(x =>
             {
                 CreditCardExpense creditCardExpense = new()
                 {
                     Id = x.Id,
                     Name = x.Name,
                     UserId = x.UserId,
                     CompanyId = x.CompanyId,
                     CategoryExpenseId = x.CategoryExpenseId,
                     SubcategoryExpenseId = x.SubcategoryExpenseId,
                    //  BankAccountId = x.BankAccountId,
                     Deleted = x.Deleted,
                     CardId = x.CardId,
                    //  PixId = x.PixId,
                     Price = x.Price,
                    //  Interest = x.Interest,
                     Expires = x.Expires,
                     Registered = x.Registered,
                     WasPaid = x.WasPaid,
                     OthersPaymentMethods = x.OthersPaymentMethods,
                     Document = x.Document,
                     Description = x.Description,
                    //  LinkCopyBill = x.LinkCopyBill,
                    //  USERLinkCopyBill = x.USERLinkCopyBill,
                    //  PASSLinkCopyBill = x.PASSLinkCopyBill,
                     InstallmentsQuantity = x.InstallmentsQuantity,
                     InstallmentPrice = x.InstallmentPrice,
                     TotalPriceInterest = x.TotalPriceInterest,
                     TotalPercentageInterest = x.TotalPercentageInterest,
                     PaymentAtSight = x.PaymentAtSight,
                     CurrentInstallment = x.CurrentInstallment,
                     ExpenseDay = x.ExpenseDay,
                     CreditCardExpenseInvoiceId = x.CreditCardExpenseInvoiceId ?? 0,
                 };
                 result.Add(creditCardExpense);
             });

            return result;

        }
    }
}
