using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class BadResponse
    {
       
            public string error;

            public BadResponse(string inMessage)
            {
                error = inMessage;
                
            }
        
    }
}
