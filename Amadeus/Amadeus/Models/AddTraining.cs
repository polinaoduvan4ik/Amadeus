using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class AddTraining
    {
        public int ScheduleId { get; set; }
        public int UserId { get; set; }
        public bool? NeedEquipment { get; set; }

        public AddTraining()
        {
        }

        public AddTraining(int scheduleId, int userId, bool? needEquipment)
        {
            ScheduleId = scheduleId;
            UserId = userId;
            NeedEquipment = needEquipment;
        }
    }
}
