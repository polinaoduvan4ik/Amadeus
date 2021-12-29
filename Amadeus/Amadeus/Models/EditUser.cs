using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class EditUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public string LevelStatus { get; set; }

        public EditUser()
        {

        }

        public EditUser(int id, string name, string surname, string phone, string levelstatus)
        {
            Id = id;
            Name = name;
            Surname = surname;
            Phone = phone;
            LevelStatus = levelstatus;
        }
    }
}
