using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Windows.UI.Xaml.Media.Imaging;

namespace Amadeus.Controllers
{
    public class UserController : Controller
    {
        private AmadeusContext _context;
        public UserController(AmadeusContext context)
        {
            _context = context;
        }

        //выгрузка изображения
        /* public BitmapImage LoadImage()
         {
             var users = _context.UsersInformations;
             UsersInformation user1 = new UsersInformation();
             var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
             var id = int.Parse(identity.Claims.Where(r => r.Type == "id").Select(r => r.Value).SingleOrDefault());
             foreach (var a in users)
                 {
                     user1 = users.FirstOrDefault(x => x.IdUser == id);

                 }

             var image = new BitmapImage();
             using (var mem = new MemoryStream(user1.TrainerPhoto))
             {
                 mem.Position = 0;
                 image.
                 image.BeginInit();
                 image.CreateOptions = BitmapCreateOptions.PreservePixelFormat;
                 image.CacheOption = BitmapCacheOption.OnLoad;
                 image.UriSource = null;
                 image.StreamSource = mem;
                 image.EndInit();
             }
             image.Freeze();
             return image;


         }*/

        /*  public Image LoadImage()//правильно ли?
          {
              var users = _context.UsersInformations;
              UsersInformation user1 = new UsersInformation();
              var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
              var id = int.Parse(identity.Claims.Where(r => r.Type == "id").Select(r => r.Value).SingleOrDefault());
              foreach (var a in users)
              {
                  user1 = users.FirstOrDefault(x => x.IdUser == id);

              }

              MemoryStream ms = new MemoryStream(user1.TrainerPhoto);
              Image image = Image.FromStream(ms);
              return image;
          }*/

        [HttpGet]
        [Route("getUser")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                string tokenData = this.HttpContext.Request.Headers["Authorization"];
                
                if (tokenData == null)
                {
                    return Unauthorized();
                }
                string token = tokenData.Split(" ")[1];
                var login = AccountController.UncodeJwt(token);

                var users = _context.Users;
                var id = users.Where(x => x.Login == login).Select(x => x.Id).FirstOrDefault();
                var role = users.Where(x => x.Id == id).Select(x => x.IdRole).FirstOrDefault();
                var name = users.Where(x => x.Id == id).Select(x => x.Name).FirstOrDefault();
                var surname = users.Where(x => x.Id == id).Select(x => x.Surname).FirstOrDefault();
                var phone = users.Where(x => x.Id == id).Select(x => x.Phone).FirstOrDefault();





                return Json(new { id = id, role = role, name = name, surname = surname, phone = phone });

            }
            catch (Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));
            }
        }



        [HttpGet]
        [Route("loadProfile")]
        public async Task<IActionResult> Account(User model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
                    var id = int.Parse(identity.Claims.Where(l => l.Type == "id").Select(l => l.Value).SingleOrDefault());
                    var role = identity.Claims.Where(r => r.Type == ClaimTypes.Role).Select(r => r.Value).SingleOrDefault();
                    var info = _context.UsersInformations.First(i => i.IdUser == id);
                    if (info != null && role == "User")
                    {
                            var level = info.LevelStatus;
                            var training = info.AmountTraining;
                            if (info.SubscriptionTraining != null)
                            {
                                var subscr = info.SubscriptionTraining;
                                return Json(new { level = level, training = training, subscr = subscr });
                            }
                            return Json(new { level = level, training = training });
                        
                    }
                    else
                    {
                        return Json(BadRequest(new { errorMsg = "Некорректные данные" }));
                    }
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



        [HttpPost]
        [Route("addTraining")]
        public async Task<IActionResult> AddTraining(DateTime date, DateTime begintrain, string trainer)
        {
            try
            {
                if(date != null && begintrain != null && trainer.Length>0)
                {
                    var trainerid = await _context.Users.Where(t => t.Surname == trainer).Select(t => t.Id).SingleOrDefaultAsync();
                    var begintraintime = begintrain.TimeOfDay; 
                    var shedule =await _context.Shedules.FirstOrDefaultAsync(s => s.Data == date && s.HoursStart == begintraintime && s.IdTrainer == trainerid);
                    if(shedule != null)
                    {

                        var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
                        var id = int.Parse(identity.Claims.Where(l => l.Type == "id").Select(l => l.Value).SingleOrDefault());
                        training training1 = new training { IdShedule = shedule.Id, IdUser = id };
                    }
                    else
                    {
                        return Json("Такого времени в расписании нет");
                    }
                    return Json("Запись добавлена");

                }
                else
                {
                    return Json("Не все данные заполнены");
                }
            }
            catch(Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));
            }
        }

        [HttpPost]
        [Route("addCall")]
        public async Task<IActionResult> AddCall(Call model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var calls = _context.Calls;
                    Call call_element = new Call { Name = model.Name, Surname = model.Surname, Phone = model.Phone };
                    calls.Add(call_element);
                    await _context.SaveChangesAsync();
                    return Json("Запись на звонок добавлена");
                }
                else
                {
                    return Json("Неправильно введены данные");

                }
            }
            catch(Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));
            }


        }

        /*   [HttpPost]
           [Route("getFilters")]
           public async T<IActionResult> GetFilters(DateTime data, DateTime begin, DateTime end, int idtrainer)
           {
               var training_list = _context.
           }*/


        [HttpGet]
        [Route("trainers")]
        public async Task<IActionResult> GetTrainers()
        {
            var trainer = _context.Users.Where(t => t.IdRole == 2).Select(t => new { t.Id, t.Name, t.Surname, t.Phone, t.UsersInformation.TrainerDiscription }).ToList();
            if (trainer != null)
            {
               

                return Json(trainer);
            }
            else
            {
                return Json(NotFound(new { errorMsg = "Нет данных" }));
            }
        }

        [HttpGet]
        [Route("trainers_inf")]
        public async Task<IActionResult> GetTrainersInfo()
        {
            var trainer = _context.Users.Where(x => x.IdRole == 2).Select(x => x.UsersInformation).Select(x => new { x.IdUser, x.TrainerDiscription });


            if (trainer != null)
            {
                

                return Json(trainer);
            }
            else
            {
                return Json(NotFound(new { errorMsg = "Нет данных" }));
            }
        }

    }


        

}
