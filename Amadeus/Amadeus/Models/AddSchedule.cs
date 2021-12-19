using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class AddSchedule
    {
        public int? IdTrainer { get; set; }
        public DateTime? Data { get; set; }
        public TimeSpan? HoursStart { get; set; }
        public TimeSpan? HoursEnd { get; set; }


        public AddSchedule()
        {

        }

        public AddSchedule(int id, DateTime date, TimeSpan beginwork, TimeSpan endwork)
        {
            IdTrainer = id;
            Data = date;
            HoursStart = beginwork;
            HoursEnd = endwork;
        }

    }
}
