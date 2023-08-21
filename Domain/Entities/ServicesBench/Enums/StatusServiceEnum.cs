using System;
using System.Collections.Generic;

namespace Domain.Entities.ServicesBench.Enums
{
    public enum StatusServiceEnum
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