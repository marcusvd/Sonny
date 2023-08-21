using System;

namespace Application.Services.Operations.BenchBudgetService.Dtos.Enums
{
    public enum StatusServiceEnumDto
    {
        Testing = 0,
        HardwareWaiting = 1,
        InProcess = 2,
        TalkCustomer = 3,
        Evaluating = 4,
        Finished = 5,
        WaitingAuthorized = 6,
    }
}