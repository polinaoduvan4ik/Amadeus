using System;
using System.Collections.Generic;

#nullable disable

namespace Amadeus
{
    public partial class Shedule
    {
        public Shedule()
        {
            training = new HashSet<training>();
        }

        public int Id { get; set; }
        public int? IdTrainer { get; set; }
        public DateTime? Data { get; set; }
        public TimeSpan? HoursStart { get; set; }
        public TimeSpan? HoursEnd { get; set; }
        public string TemplateTraining { get; set; }

        public virtual User IdTrainerNavigation { get; set; }
        public virtual Template TemplateTrainingNavigation { get; set; }
        public virtual ICollection<training> training { get; set; }
    }
}
