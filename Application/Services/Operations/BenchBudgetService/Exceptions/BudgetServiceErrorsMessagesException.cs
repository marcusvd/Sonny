namespace Application.Services.Operations.BenchBudgetService.Exceptions
{

    public static class BudgetServiceErrorsMessagesException
    {
        //Adding BudgetService
         public static readonly string CollectDeliverCost = "500.0| costs not filled correct.";
         public static readonly string IncorrectCost = "500.1| has a cost, but the cost is equal 0. fill form from customer in the part of physical collect deliver costs";
         public static readonly string ServicesPricesInvalid = "500.2| list of services prices has some services name invalid, different from tableProvidedService.";
         public static readonly string startedDate = "500.3| can't to be less than current date.";
         public static readonly string finishedDate = "500.4| can't to be longer than StartedDate";
       
    }
}














