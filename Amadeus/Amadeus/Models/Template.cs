﻿using System;
using System.Collections.Generic;

#nullable disable

namespace Amadeus
{
    public partial class Template
    {
        public Template()
        {
            Shedules = new HashSet<Shedule>();
        }

        public string TemplateName { get; set; }
        public int? Ozn { get; set; }
        public int? Z { get; set; }
        public int? FirstLevel { get; set; }
        public int? SecondLevel { get; set; }
        public int? Poni { get; set; }

        public virtual ICollection<Shedule> Shedules { get; set; }
    }
}
