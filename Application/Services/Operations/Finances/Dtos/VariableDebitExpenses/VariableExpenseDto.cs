using Application.Services.Operations.Finances.Dtos.InheritanceDto;

namespace Application.Services.Operations.Finances.Dtos.VariableDebitExpenses
{
    public class VariableExpenseDto : BaseExpenseDto
    {
        // public string Item { get; set; }
        public string Place { get; set; }

    }
}