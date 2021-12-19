using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class TrainingSearchModel
    {
        public DateTime? Data;
        public int TrainerId;
        public int SearcherId;

        public TrainingSearchModel(DateTime? data, int trainerId, int searcherId)
        {
            Data = data;
            TrainerId = trainerId;
            SearcherId = searcherId;
        }
    }
}
