using System;
using System.Collections.Generic;

#nullable disable

namespace Amadeus
{
    public partial class User
    {
        public User()
        {
            Shedules = new HashSet<Shedule>();
            training = new HashSet<training>();
        }

        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public int? IdRole { get; set; }

        public virtual Role IdRoleNavigation { get; set; }
        public virtual UsersInformation UsersInformation { get; set; }
        public virtual ICollection<Shedule> Shedules { get; set; }
        public virtual ICollection<training> training { get; set; }
    }
}
