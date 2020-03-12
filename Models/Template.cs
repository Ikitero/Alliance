using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alliance.Models
{
    public class Template
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string TemplateJson { get; set; }
        public int PostId { get; set; }
    }
}
