using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Alliance.Models;
using Alliance.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Alliance.Controllers
{
    public class TemplateController : Controller
    {
        private readonly AppDbContext _context;
        public TemplateController(AppDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult AddingList()
        {
            return View();
        }

        [HttpPost]
        public PartialViewResult Load(string templateName)
        {
            TemplateViewModel model = new TemplateViewModel();
            model.Slug = templateName;
            return PartialView(templateName, model);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Create(string data)
        {
            if (ModelState.IsValid)
            {
                Post post = new Post();
                await _context.Posts.AddAsync(post);
                await _context.SaveChangesAsync();
                var postTmp = _context.Posts.OrderByDescending(p => p.Id).FirstOrDefault();
                List<TemplateViewModel> templates = JsonConvert.DeserializeObject<List<TemplateViewModel>>(data);
                foreach (var template in templates)
                {
                    template.DateCreated = DateTime.Now;
                    template.DateModified = DateTime.Now;
                    _context.Templates.Add(new Template { TemplateJson = JsonConvert.SerializeObject(template), Slug = template.Slug, PostId = post.Id });
                }
                _context.SaveChanges();
            }
            return Json(new { result = "Redirect", url = Url.Action("Index", "Home") });
        }

    }
}
