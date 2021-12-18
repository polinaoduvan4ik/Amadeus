using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Amadeus.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Amadeus.Controllers
{
    [Authorize(Roles = "Trainer,Admin")]
    public class TrainingController : Controller
    {

        private AmadeusContext _context;
        public TrainingController(AmadeusContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        [Route("getTrainings")]
        public async Task<IActionResult> GetTrainings()
        {
            try
            {
                List<Trainings> gathered_trainings = new List<Trainings>();
                var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
                var id = int.Parse(identity.Claims.Where(l => l.Type == "id").Select(l => l.Value).SingleOrDefault());
                var role = identity.Claims.Where(r => r.Type == ClaimTypes.Role).Select(r => r.Value).SingleOrDefault();
                var info = _context.UsersInformations.First(i => i.IdUser == id);
                if (info != null)
                {
                    var trainytable = new Dictionary<int, Shedule>();
                    if (role == "Admin")
                    {
                        trainytable = _context.Shedules.ToDictionary(x => x.Id, y => y);

                    }
                    else if(role == "Trainer")
                    {
                        trainytable = _context.Shedules.Where(x => x.IdTrainer.Value == id).ToDictionary(x => x.Id, y => y);

                    }



                    var elementsTrainings = _context.training.Include(x => x.IdUserNavigation).Where(x => trainytable.Keys.Contains(x.IdShedule.Value)).ToList();
                    foreach (var a in trainytable)
                    {
                        var currentTrainees = elementsTrainings.Where(x => x.IdShedule.Value == a.Key).ToList();
                        if (!currentTrainees.Any())
                        {
                            gathered_trainings.Add(new Trainings()
                            {
                                Data = a.Value.Data,
                                HoursStart = a.Value.HoursStart,
                                HoursEnd = a.Value.HoursEnd
                            });

                        }
                        else
                        {
                            foreach (var currentTrainee in currentTrainees)
                            {
                                gathered_trainings.Add(new Trainings()
                                {
                                    Data = a.Value.Data,
                                    HoursStart = a.Value.HoursStart,
                                    HoursEnd = a.Value.HoursEnd,
                                    Name = currentTrainee.IdUserNavigation.Name,
                                    Surname = currentTrainee.IdUserNavigation.Surname,
                                    Phone = currentTrainee.IdUserNavigation.Phone,
                                    Status = currentTrainee.Status


                                });
                            }
                        }

                    }
                }
                    return Json(gathered_trainings);
                

            }
            catch(Exception ex)
            {
                return Json(BadRequest(new { errorMsg = "Некорректные данные" }));
            }
        }

        [HttpDelete]
        [Route("deleteTraining")]
        public async Task<IActionResult> DeleteTraining(training model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var trainings = _context.training;
                    foreach(var a in trainings)
                    {
                        trainings.Remove(a);
                    }
                    await _context.SaveChangesAsync();
                    return Json("Запись на тренировку удалена");
                }
                else
                {
                    return Json(BadRequest(new { errorMsg = "Нет данных" }));
                }
            }
            catch(Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));
            }
        }

        

    }
}