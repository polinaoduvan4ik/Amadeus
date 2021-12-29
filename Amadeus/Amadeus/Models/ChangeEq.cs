using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class ChangeEq
    {
        public int ScheduleId { get; set; }
        public int UserId { get; set; }
        public bool? NewNeedEquipment { get; set; }

        public ChangeEq(int scheduleId, int userId, bool? newNeedEquipment)
        {
            ScheduleId = scheduleId;
            UserId = userId;
            NewNeedEquipment = newNeedEquipment;
        }

        public ChangeEq()
        {
        }
    }
}
