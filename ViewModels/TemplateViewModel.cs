using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alliance.ViewModels
{
    public class TemplateViewModel
    {
        public string MainHeader { get; set; }
        public string SubHeader { get; set; }
        public string Category { get; set; }
        public string ShortDescription { get; set; }
        public string Description { get; set; }
        public IEnumerable<string> ImageUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string RegularPrice { get; set; }
        public string Slug { get; set; }
    }
}
