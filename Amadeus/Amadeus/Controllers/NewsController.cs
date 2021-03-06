using Amadeus.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Amadeus.Controllers
{
    public class NewsController : Controller
    {
        private AmadeusContext _context;
        public NewsController(AmadeusContext context)
        {
            _context = context;
        }

        [DisableCors]
        [HttpGet]
        [Route("home")]
        //загрузка всех новостей
        public async Task<IActionResult> LoadList(int page, int limit)
        {
            var news = _context.News.ToList();
            if(news != null)
            {
                int news_count = news.Count();
                var news_element = news.Skip(1 * page).Take(limit);

                return Json(new {news_element = news_element, news_count = news_count});
            }
            else
            {
                return Json(NotFound(new { errorMsg = "Нет данных" }));
            }

        }

        [HttpPost]
        [Route("addNews")]
        //добавить новость
        public async Task<IActionResult> AddNews([FromBody]AddNews model)
        {
            try
            {
                if (model.NewsElement != null && model.NewsHeading != null)
                {
                    var news = _context.News;
                    News news1 = new News { NewsHeading = model.NewsHeading, NewsElement = model.NewsElement};
                    news.Add(news1);
                    await _context.SaveChangesAsync();
                    return Json(news1);
                }
                else
                {
                    return Json(BadRequest(new { errorMsg = "Некорректные данные" }));
                }
            }
            catch(Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));
            }

            
        }

        [HttpDelete]
        [Route("deleteNews")]
        //удалить новость
        public async Task<IActionResult> DeleteNews(int id)
        {
            try
            {
                var news = _context.News;
                foreach(var a in news)
                {
                    if(id == 0)
                    {
                        return Json(NotFound(new { errorMsg = "Не выбран объект" }));
                    }
                    else if(a.Id == id)
                    {
                        news.Remove(a);

                    }

                }
                await _context.SaveChangesAsync();
                return Json("Объект удален");


            }
            catch (Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));
            }
        }
    }
}
