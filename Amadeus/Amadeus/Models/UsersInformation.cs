using System;
using System.Collections.Generic;

#nullable disable

namespace Amadeus
{
    public partial class UsersInformation
    {
        public int IdUser { get; set; }
        public string LevelStatus { get; set; }
        public int? SubscriptionTraining { get; set; }
        public byte[] WasOnTraining { get; set; }
        public int? CanceledTraining { get; set; }
        public int? AmountTraining { get; set; }
        public string TrainerDiscription { get; set; }

        public virtual User IdUserNavigation { get; set; }
    }
}
