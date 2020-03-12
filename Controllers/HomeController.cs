using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Alliance.Models;
using Alliance.ViewModels;
using Newtonsoft.Json;

namespace Alliance.Controllers
{
    public class HomeController : Controller
    {
        private readonly AppDbContext _context;
        public HomeController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var templates = _context.Templates;
            List<TemplateViewModel> models = new List<TemplateViewModel>();
            foreach(var temp in templates)
            {
                models.Add(JsonConvert.DeserializeObject<TemplateViewModel>(temp.TemplateJson));
            }
            return View(models);
        }

        public IActionResult AboutCompany()
        {
            return View();
        }

        public IActionResult Articles()
        {
            return View();
        }

        public IActionResult Projects()
        {
            return View();
        }

        public IActionResult Services()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
