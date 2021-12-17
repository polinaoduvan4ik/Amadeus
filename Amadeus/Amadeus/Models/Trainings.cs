using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class Trainings
    {
        public DateTime? Data { get; set; }
        public TimeSpan? HoursStart { get; set; }
        public TimeSpan? HoursEnd { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public string Status { get; set; }

    }
}
