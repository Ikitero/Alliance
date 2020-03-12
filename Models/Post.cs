using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alliance.Models
{
    public class Post
    {
        public int Id { get; set; }
        public IEnumerable<Template> Templates { get; set; }
    }
}
