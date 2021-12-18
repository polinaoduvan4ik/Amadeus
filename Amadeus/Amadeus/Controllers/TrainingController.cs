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
                string tokenData = this.HttpContext.Request.Headers["Authorization"];

                if (tokenData == null)
                {
                    return Unauthorized();
                }
                string token = tokenData.Split(" ")[1];
                var login = AccountController.UncodeJwt(token);

                int? id = _context.Users.Where(x => x.Login == login).Select(x => x.Id).FirstOrDefault();
                int? role = _context.Users.Where(x => x.Id == id).Select(x => x.IdRole).FirstOrDefault();

                if (role.HasValue)
                {
                    
                    List<Shedule> schedules = new List<Shedule>();
                    if (role.Value == 3) //Admin
                    {
                        schedules = _context.Shedules.ToList();
                    }
                    else if (role.Value == 2) //Trainer
                    {
                        schedules = _context.Shedules.Where(sch => sch.IdTrainer == id.Value).ToList();
                    }
                    else if (role.Value == 1) //User
                    {
                        List<training> trainings_elems = _context.training.Where(t => t.IdUser == id.Value).ToList();

                        foreach (training training_el in trainings_elems)
                        {
                            schedules = _context.Shedules.Where(sch => sch.Id == training_el.IdShedule).ToList();
                        }
                    }


                    List<FrontTraining> front_trainings = new List<FrontTraining>();
                    foreach (Shedule shedule_note in schedules)
                    {
                        User trainer_info = _context.Users.Where(u => u.Id == shedule_note.IdTrainer).FirstOrDefault();

                        FrontTraining front_training_data = new FrontTraining(shedule_note.Data,
                                                                                shedule_note.HoursStart,
                                                                                shedule_note.HoursEnd,
                                                                                trainer_info.Surname + " " + trainer_info.Name,
                                                                                trainer_info.Phone);

                        List<training> temp_trainings = _context.training.Where(tr => tr.IdShedule == shedule_note.Id).ToList();

                        foreach (training training in temp_trainings)
                        {
                            User participant_info = _context.Users.Where(u => u.Id == training.IdUser).FirstOrDefault();
                            FrontTrainingParticipant participant = new FrontTrainingParticipant(participant_info.Surname + " " + participant_info.Name,
                                                                                                participant_info.Phone,
                                                                                                training.Status);
                            front_training_data.Participants.Add(participant);
                        }

                        front_trainings.Add(front_training_data);
                    }

                    return Json(front_trainings);
                }

                return Json(BadRequest(new { errorMsg = "Некорректные данные" }));
            }
            catch(Exception ex)
            {
                return Json(BadRequest(new { errorMsg = "Некорректные данные" }));
            }
        }

        /*
         * 
        [HttpPost]
        [Route("searchTrainings")]
        public async Task<IActionResult> SearchTrainings()
        {
        
        }

        */

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