using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class ChangeStatus
    {
        public int ScheduleId { get; set; }
        public int UserId { get; set; }

        public string NewStatus { get; set; }

        public ChangeStatus(int scheduleId, int userId, string newStatus)
        {
            ScheduleId = scheduleId;
            UserId = userId;
            NewStatus = newStatus;
        }
    }
}
