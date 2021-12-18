using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class BadResponse
    {
       
            public string UserMessage;

            public BadResponse(HttpContext inHttpContext, string inMessage)
            {
                inHttpContext.Response.StatusCode = 400;
                UserMessage = inMessage;
                
            }
        
    }
}
