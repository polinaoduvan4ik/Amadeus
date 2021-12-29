using System;
using System.Collections.Generic;

#nullable disable

namespace Amadeus
{
    public partial class training
    {
        public int Id { get; set; }
        public int? IdShedule { get; set; }
        public int? IdUser { get; set; }
        public string Status { get; set; }
        public bool? NeedEquipment { get; set; }

        public virtual Shedule IdSheduleNavigation { get; set; }
        public virtual User IdUserNavigation { get; set; }

        public training(int? idShedule, int? idUser, string status, bool? needEquipment)
        {
            IdShedule = idShedule;
            IdUser = idUser;
            Status = status;
            NeedEquipment = needEquipment;
        }
    }
}
