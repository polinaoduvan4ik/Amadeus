using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class AddNews
    {
        public string NewsHeading { get; set; }
        public string NewsElement { get; set; }

        public AddNews()
        {
        }

        public AddNews(string newsHeading, string newsElement)
        {
            NewsHeading = newsHeading;
            NewsElement = newsElement;
        }
    }
}
