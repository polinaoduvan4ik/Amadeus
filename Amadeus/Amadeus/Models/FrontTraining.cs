using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class FrontTrainingParticipant
    {
        public int UserId;
        public string FullName;
        public string Phone;
        public string Status;
        public bool? NeedEquipment;

        public FrontTrainingParticipant(int userId, string fullName, string phone, string status, bool? needEquipment)
        {
            UserId = userId;
            FullName = fullName;
            Phone = phone;
            Status = status;
            NeedEquipment = needEquipment;
        }
    }

    public class FrontTraining
    {
        public int ScheduleId;
        public DateTime? Data;
        public TimeSpan? HoursStart;
        public TimeSpan? HoursEnd;
        public string TrainerFullName;
        public string TrainerPhone;

        public List<FrontTrainingParticipant> Participants;

        public FrontTraining(int scheduleId, DateTime? data, TimeSpan? hoursStart, TimeSpan? hoursEnd, string trainerFullName, string trainerPhone)
        {
            ScheduleId = scheduleId;
            Data = data;
            HoursStart = hoursStart;
            HoursEnd = hoursEnd;
            TrainerFullName = trainerFullName;
            TrainerPhone = trainerPhone;

            Participants = new List<FrontTrainingParticipant>();
        }
    }
}
