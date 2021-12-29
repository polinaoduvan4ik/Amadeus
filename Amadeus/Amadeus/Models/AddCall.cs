using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class AddCall
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }

        public AddCall()
        {

        }
        public AddCall(string name, string surname, string phone)
        {
            Name = name;
            Surname = surname;
            Phone = phone;
        }
    }
}
