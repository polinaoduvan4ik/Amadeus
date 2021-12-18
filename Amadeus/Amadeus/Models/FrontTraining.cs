using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class FrontTrainingParticipant
    {
        public string FullName;
        public string Phone;
        public string Status;

        public FrontTrainingParticipant(string fullName, string phone, string status)
        {
            FullName = fullName;
            Phone = phone;
            Status = status;
        }
    }

    public class FrontTraining
    {
        public DateTime? Data;
        public TimeSpan? HoursStart;
        public TimeSpan? HoursEnd;
        public string TrainerFullName;
        public string TrainerPhone;

        public List<FrontTrainingParticipant> Participants;

        public FrontTraining(DateTime? data, TimeSpan? hoursStart, TimeSpan? hoursEnd, string trainerFullName, string trainerPhone)
        {
            Data = data;
            HoursStart = hoursStart;
            HoursEnd = hoursEnd;
            TrainerFullName = trainerFullName;
            TrainerPhone = trainerPhone;

            Participants = new List<FrontTrainingParticipant>();
        }
    }
}
