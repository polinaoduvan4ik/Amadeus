using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus
{
    public static class AmadeusContextSeed
    {
        public static void SeedSampleData(AmadeusContext context)
        {
            IList<Role> sampleRole = new List<Role>();
            IList<User> sampleUser = new List<User>();

            if (!context.Roles.Any())
            {
                sampleRole.Add(new Role()
                {
                    RoleName = "User"
                });
                sampleRole.Add(new Role()
                {
                    RoleName = "Trainer"
                });
                sampleRole.Add(new Role()
                {
                    RoleName = "Admin"
                });

                context.Roles.AddRange(sampleRole);

                context.SaveChanges();
            }

           

           
        }
    }
}
