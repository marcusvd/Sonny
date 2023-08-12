using System;

namespace Application.Services.Operations.BenchBudgetService.Dtos
{
    public enum StatusServiceDto
    {
        Testing = 0,
        HardwareWaiting = 1,
        InProcess = 2,
        TalkCustomer = 3,
        Assessing = 4
    }
}