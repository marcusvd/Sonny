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

        public List<CreditCardExpenseDto> CreditCardExpensesInstallmentListMake(CreditCardExpenseDto creditCardExpenseEntity)
        {
            var creditCardExpenses = new List<CreditCardExpenseDto>();

            if (creditCardExpenseEntity.InstallmentNumber > 1)

                for (int n = 0; n < creditCardExpenseEntity.InstallmentNumber; n++)
                    creditCardExpenses.Add(InstallmentObjectMaker(creditCardExpenseEntity, n));

            if (creditCardExpenseEntity.InstallmentNumber == 1)
                creditCardExpenses.Add(creditCardExpenseEntity);


            return creditCardExpenses;
        }
        private CreditCardExpenseDto InstallmentObjectMaker(CreditCardExpenseDto creditCardExpenseEntity, int month)
        {
            string InstallmentId = Guid.NewGuid().ToString();
            CreditCardExpenseDto creditCardExpense;

            creditCardExpense = new CreditCardExpenseDto()
            {
                Id = creditCardExpenseEntity.Id,
                InstallmentId = InstallmentId,
                CurrentInstallment = $"{month + 1}/{creditCardExpenseEntity.InstallmentNumber}",
                Name = creditCardExpenseEntity.Name,
                CategoryExpenseId = creditCardExpenseEntity.CategoryExpenseId,
                SubcategoryExpenseId = creditCardExpenseEntity.SubcategoryExpenseId,
                CompanyId = creditCardExpenseEntity.CompanyId,
                UserId = creditCardExpenseEntity.UserId,
                BankAccountId = creditCardExpenseEntity.BankAccountId,
                Card = creditCardExpenseEntity.Card,
                CardId = creditCardExpenseEntity.CardId,
                CreditCardExpenseInvoiceId = creditCardExpenseEntity.CreditCardExpenseInvoiceId,
                CreditCardLimitOperation = creditCardExpenseEntity.CreditCardLimitOperation,
                PixId = null,
                OthersPaymentMethods = null,
                WasPaid = DateTime.MinValue,
                Document = creditCardExpenseEntity.Document,
                Expires = creditCardExpenseEntity.Expires.AddMonths(month),
                InstallmentNumber = creditCardExpenseEntity.InstallmentNumber,
                InstallmentPrice = creditCardExpenseEntity.InstallmentPrice,
                ExpenseDay = creditCardExpenseEntity.ExpenseDay,
                Registered = CurrentDate,
                Price = creditCardExpenseEntity.Price,
                Interest = creditCardExpenseEntity.Interest,
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
                    UserId = x.UserId ?? 0,
                    CompanyId = x.CompanyId,
                    CardId = x.CardId ?? 0,
                    Price = x.Price,
                    Interest = x.Interest,
                    Expires = x.Expires,
                    ClosingDate = x.Card.ClosingDate,
                    WasPaid = MinDate,
                    OthersPaymentMethods = null,
                    Document = null,
                    Description = x.Card.Description,
                    Registered = DateTime.UtcNow,
                    Deleted = false,
                };

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
                     BankAccountId = x.BankAccountId,
                     Deleted = x.Deleted,
                     CardId = x.CardId,
                     PixId = x.PixId,
                     Price = x.Price,
                     Interest = x.Interest,
                     Expires = x.Expires,
                     Registered = x.Registered,
                     WasPaid = x.WasPaid,
                     OthersPaymentMethods = x.OthersPaymentMethods,
                     Document = x.Document,
                     Description = x.Description,
                     LinkCopyBill = x.LinkCopyBill,
                     USERLinkCopyBill = x.USERLinkCopyBill,
                     PASSLinkCopyBill = x.PASSLinkCopyBill,
                     InstallmentNumber = x.InstallmentNumber,
                     InstallmentPrice = x.InstallmentPrice,
                     InstallmentId = x.InstallmentId,
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
