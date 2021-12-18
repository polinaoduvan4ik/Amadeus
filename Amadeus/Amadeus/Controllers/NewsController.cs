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
            var news = _context.News;
            if(news != null)
            {
                List<News> news_element = new List<News>();
                foreach (var a in news)
                {
                    news_element.Add(a);
                }

                return Json(news_element);
            }
            else
            {
                return Json(NotFound(new { errorMsg = "Нет данных" }));
            }

        }

        [HttpPost]
        [Route("addNews")]
        //добавить новость
        public async Task<IActionResult> AddNews(string heading, string text)
        {
            try
            {
                if (heading.Length > 0 && text.Length > 0)
                {
                    var news = _context.News;
                    News news1 = new News { NewsHeading = heading, NewsElement = text };
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
