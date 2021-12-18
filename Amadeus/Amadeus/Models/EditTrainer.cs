using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class EditTrainer
    {
        public int Id { get; set; }
        public string TrainerDiscription { get; set; }

        public EditTrainer()
        {

        }

        public EditTrainer(int id, string text)
        {
            Id = id;
            TrainerDiscription = text;
        }
    }
}
