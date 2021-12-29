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
    //[Authorize(Roles = "Trainer,Admin")]
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
                            var sch = _context.Shedules.Where(sch => sch.Id == training_el.IdShedule).FirstOrDefault();
                            if (sch != null)
                            {
                                schedules.Add(sch);
                            }
                        }
                    }


                    List<FrontTraining> front_trainings = new List<FrontTraining>();
                    foreach (Shedule shedule_note in schedules)
                    {
                        User trainer_info = _context.Users.Where(u => u.Id == shedule_note.IdTrainer).FirstOrDefault();

                        FrontTraining front_training_data = new FrontTraining(shedule_note.Id,
                                                                                shedule_note.Data,
                                                                                shedule_note.HoursStart,
                                                                                shedule_note.HoursEnd,
                                                                                trainer_info.Surname + " " + trainer_info.Name,
                                                                                trainer_info.Phone);

                        List<training> temp_trainings = _context.training.Where(tr => tr.IdShedule == shedule_note.Id).ToList();

                        foreach (training training in temp_trainings)
                        {
                            User participant_info = _context.Users.Where(u => u.Id == training.IdUser).FirstOrDefault();
                            FrontTrainingParticipant participant = new FrontTrainingParticipant(participant_info.Id,
                                                                                                participant_info.Surname + " " + participant_info.Name,
                                                                                                participant_info.Phone,
                                                                                                training.Status,
                                                                                                training.NeedEquipment);
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

        [HttpPost]
        [Route("searchTrainings")]
        public IActionResult SearchTrainings([FromBody] TrainingSearchModel searchModel)
        {
            if (searchModel == null)
            {
                return Json(new BadResponse("Некорректные данные"));
            }

            List<Shedule> schedules = _context.Shedules.Where(s => s.Data.Value == searchModel.Data &&
                                                                  s.IdTrainer == searchModel.TrainerId).ToList();

            List<FrontTraining> front_trainings = new List<FrontTraining>();
            foreach (Shedule sc in schedules)
            {
                if (DoesTrainingSuitForUser(sc, searchModel.SearcherId))
                {
                    User trainer_info = _context.Users.Where(u => u.Id == sc.IdTrainer).FirstOrDefault();

                    FrontTraining front_training_data = new FrontTraining(sc.Id,
                                                                            sc.Data,
                                                                            sc.HoursStart,
                                                                            sc.HoursEnd,
                                                                            trainer_info.Surname + " " + trainer_info.Name,
                                                                            trainer_info.Phone);

                    List<training> temp_trainings = _context.training.Where(tr => tr.IdShedule == sc.Id).ToList();

                    foreach (training training in temp_trainings)
                    {
                        User participant_info = _context.Users.Where(u => u.Id == training.IdUser).FirstOrDefault();
                        FrontTrainingParticipant participant = new FrontTrainingParticipant(participant_info.Id,
                                                                                            participant_info.Surname + " " + participant_info.Name,
                                                                                            participant_info.Phone,
                                                                                            training.Status,
                                                                                            training.NeedEquipment);
                        front_training_data.Participants.Add(participant);
                    }

                    front_trainings.Add(front_training_data);
                }
            }

            if (front_trainings.Count == 0)
            {
                return Json(new BadResponse("Тренировки по заданными параметрами не найдены"));
            }
            else
            {
                return Json(front_trainings);
            }
        }

        [HttpDelete]
        [Route("deleteTrainingParticipant")]
        public async Task<IActionResult> DeleteTrainingParticipant(int ScheduleId, int UserId) 
        {
            if (ScheduleId == 0 || UserId == 0)
            {
                return Json(new BadResponse("Некорректные данные"));
            }

            foreach (var t in _context.training)
            {
                if (t.IdShedule == ScheduleId && t.IdUser == UserId)
                {
                    _context.training.Remove(t);
                    
                }
            }
            await _context.SaveChangesAsync();
            return Json("Запись на тренировку удалена");
        }

        [HttpPost]
        [Route("addTrainingParticipant")]
        public async Task<IActionResult> AddTrainingParticipant([FromBody]AddTraining model)
        {
            if (model.ScheduleId == 0 || model.UserId == 0)
            {
                return Json(new BadResponse("Некорректные данные"));
            }

            training training_participant = _context.training.Where(t => t.IdShedule == model.ScheduleId && t.IdUser == model.UserId).FirstOrDefault();
            if (training_participant != null)
            {
                return Json(new BadResponse("Пользователь уже записан"));
            }

            Shedule schedule = _context.Shedules.Where(s => s.Id == model.ScheduleId).FirstOrDefault();
            if (!DoesTrainingSuitForUser(schedule, model.UserId))
            {
                return Json(new BadResponse("Пользователь уже записан"));
            }


            _context.training.Add(new training(model.ScheduleId, model.UserId, "Записан", model.NeedEquipment));
            await _context.SaveChangesAsync();

            return Json("Запись на тренировку добавлена");
        }

        [HttpPut]
        [Route("сhangeEquipmentNecessity")]
        public async Task<IActionResult> ChangeEquipmentNecessity([FromBody]ChangeEq model)
        {
            if (model.ScheduleId == 0 || model.UserId == 0)
            {
                return Json(new BadResponse("Некорректные данные"));
            }

            training training_participant = _context.training.Where(t => t.IdShedule == model.ScheduleId && t.IdUser == model.UserId).FirstOrDefault();
            if (training_participant == null)
            {
                return Json(new BadResponse("Пользователь не записан"));
            }

            training_participant.NeedEquipment = model.NewNeedEquipment;
            await _context.SaveChangesAsync();

       
            return Json("Необходимость экипировки для клиента изменена");
        }

        bool DoesTrainingSuitForUser(Shedule shedule, int userId)
        {

            List<training> trainings_participants = _context.training.Where(t => t.IdShedule == shedule.Id).ToList();

            if (trainings_participants.Count == 0)
                return true;

            UsersInformation users_information = _context.UsersInformations.Where(u => u.IdUser == userId).FirstOrDefault();
            if (users_information == null)
                return false;
            string new_user_level_status = users_information.LevelStatus;

            Template current_template = new Template();
            foreach (training training_participant in trainings_participants)
            {
                UsersInformation user_information = _context.UsersInformations.Where(u => u.IdUser == training_participant.IdUser).FirstOrDefault();
                AddUserLvlToTemplate(current_template, user_information.LevelStatus);
            }

            AddUserLvlToTemplate(current_template, new_user_level_status);

            Template result_template = _context.Templates.Where(t => t.Ozn >= current_template.Ozn &&
                                                                     t.Z >= current_template.Z &&
                                                                     t.FirstLevel >= current_template.FirstLevel &&
                                                                     t.SecondLevel >= current_template.SecondLevel &&
                                                                     t.Poni >= current_template.Poni).FirstOrDefault();

            return result_template != null;
        }

        void AddUserLvlToTemplate(Template template, string userLvl)
        {
            switch (userLvl)
            {
                case "Ozn": template.Ozn++; break;
                case "Z": template.Z++; break;
                case "1": template.FirstLevel++; break;
                case "2": template.SecondLevel++; break;
                case "Poni": template.Poni++; break;
                default: break;
            }
        }

        [HttpPut]
        [Route("сhangeStatus")]
        public async Task<IActionResult> сhangeStatus([FromBody]ChangeStatus model)
        {
            if (model.ScheduleId == 0 || model.UserId == 0 || model.NewStatus == null)
            {
                return Json(new BadResponse("Некорректные данные"));
            }

            training training_participant = _context.training.Where(t => t.IdShedule == model.ScheduleId && t.IdUser == model.UserId).FirstOrDefault();
            if (training_participant == null)
            {
                return Json(new BadResponse("Пользователь не записан"));
            }

            training_participant.Status = model.NewStatus;
            var users_inf = _context.UsersInformations.Where(u => u.IdUser == model.UserId).FirstOrDefault();
            if(users_inf == null)
            {
                return Json(new BadResponse("Пользователь не записан"));
            }
            if (model.NewStatus == "Завершен")
            {
                users_inf.CanceledTraining = 0;
                users_inf.AmountTraining++;
                await _context.SaveChangesAsync();
                //if (users_inf.AmountTraining % 10 == 0)
                //    return Json("Следующая тренировка для пользователя будет бесплатная!");

            }
            if (model.NewStatus == "Отменен")
            {
                users_inf.CanceledTraining++;
                await _context.SaveChangesAsync();
                //if (users_inf.CanceledTraining >= 3)
                //    return Json("Предупреждение пользователя о частой отмене тренировок");
            }
            await _context.SaveChangesAsync();
            return Json("Статус записи изменен");


        }
    }
}