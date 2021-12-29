using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Amadeus.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Amadeus.Controllers
{
    public class AdminController : Controller
    {
        private AmadeusContext _context;
        public AdminController(AmadeusContext context)
        {
            _context = context;
        }

        

        [HttpPost]
        [Route("addTrainer")]
        public async Task<IActionResult> AddTrainer([FromBody]RegisterTrainer model)
        {
            if (ModelState.IsValid)
            {
                User user = await _context.Users.FirstOrDefaultAsync(u => u.Login == model.Login);
                if (user == null)
                {
                    string passwordhash = generateSHA512(model.Password);
                    // добавляем пользователя в бд
                    var user_inf = _context.UsersInformations;
                    user = new User { Login = model.Login, Password = passwordhash, Name = model.Name, Surname = model.Surname, Phone = model.Phone };
                    
                    Role userRole = await _context.Roles.FirstOrDefaultAsync(r => r.Id == 2);
                    if (userRole != null)
                        user.IdRole = userRole.Id;

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                    UsersInformation userinf = new UsersInformation { IdUser = user.Id, TrainerDiscription = model.TrainerDiscription };
                    _context.Add(userinf);
                    await _context.SaveChangesAsync();



                    return Json("Тренер добавлен");
                }
                else
                    ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }
            return Json(model);
        }

        public static string generateSHA512(string input)
        {
            input = input + "KLDFN1523DFV4";
            SHA256 shaM = new SHA256Managed();
            // Convert the input string to a byte array and compute the hash.
            byte[] data = shaM.ComputeHash(Encoding.UTF8.GetBytes(input));
            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();
            // Loop through each byte of the hashed data
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }
            // Return the hexadecimal string.
            input = sBuilder.ToString();
            return (input);
        }

        [HttpPut]
        [Route("editTrainer")]
        public async Task<IActionResult> EditTrainer([FromBody]EditTrainer model)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    var users_inf = _context.UsersInformations;
                    if (users_inf != null)
                    {
                        List<UsersInformation> user1 = new List<UsersInformation>();
                        foreach (var a in users_inf)
                        {
                            if (a.IdUser == model.Id)
                            {
                                a.TrainerDiscription = model.TrainerDiscription;

                            }
                        }
                        await _context.SaveChangesAsync();

                        return Json("Описание тренера изменено");
                    }

                    else
                    {
                        return Json(NotFound(new { errorMsg = "Нет данных" }));
                    }
                }
                else
                    ModelState.AddModelError("", "Некорректные данные");
                    return Json(new BadResponse("Некорректные данные"));


            }
            catch (Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));
            }


        }

        [HttpDelete]
        [Route("deleteUser")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var users = _context.Users;
                var users_inf = _context.UsersInformations;
                var sch = _context.Shedules;
                var tr_user = _context.training.Where(t => t.IdSheduleNavigation.IdTrainer == id).ToList();
                var user = _context.Users.SingleOrDefault(u => u.Id == id);
                if (tr_user.Count != 0)
                {
                    return Json(new BadResponse("Тренер ведет тренировки, его нельзя удалить"));

                }
               /* if (tr_user != null)
                {
                    foreach (var a in _context.training)
                    {
                        if (a.Id == id)
                        {
                            _context.training.Remove(a);

                        }
                    }
                }*/
                if(user.IdRole.Value == 2)
                {
                    foreach(var u in sch)
                    {
                        if(u.IdTrainer == id)
                        {
                            sch.Remove(u);
                        }
                    }
                }
                foreach (var a in users)
                {
                    if(a.Id == id)
                    {
                        users.Remove(a);

                    }
                }
                foreach (var a in users_inf)
                {
                    if (a.IdUser == id)
                    {
                        users_inf.Remove(a);

                    }
                }
                _context.SaveChanges();


                return Json("Запись пользователя удалена");

            }
            catch(Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));
            }

        }

        [HttpPost]
        [Route("addShedule")]
        public async Task<IActionResult> AddShedule([FromBody]AddSchedule model)
        {
            try
            {
                if (model.IdTrainer != 0 && model.Data != null && model.HoursStart != null && model.HoursEnd != null)
                {

                    var beginworktime = model.HoursStart.Value;
                    var endworktime = model.HoursEnd.Value;
                    TimeSpan diff = endworktime.Subtract(beginworktime);
                    var shedule = _context.Shedules;

                    for (int i = 0; i < diff.Hours; i++)
                    {
                        var isshedule = _context.Shedules.Any(x => x.IdTrainer == model.IdTrainer && x.Data == model.Data && x.HoursStart == beginworktime.Add(new TimeSpan(i, 0, 0)) && x.HoursEnd == beginworktime.Add(new TimeSpan(i + 1, 0, 0)));
                        if (!isshedule)
                        {
                            var shedule_element = new Shedule { IdTrainer = model.IdTrainer, Data = model.Data, HoursStart = beginworktime.Add(new TimeSpan(i, 0, 0)), HoursEnd = beginworktime.Add(new TimeSpan(i + 1, 0, 0)) };
                            shedule.Add(shedule_element);
                            await _context.SaveChangesAsync();
                        }
                        else
                        {
                            return Json("Такая запись уже существует");
                        }
                    }
                    return Json("Запись добавлена");

                }
                else
                {
                    return Json("Не все данные введены");

                }
            }
            catch(Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));

            }

        }


        [HttpGet]
        [Route("listUsers")]
        public async Task<IActionResult> ListUsers()
        {
            try
            {
                
                var users = _context.Users.Where(u => u.IdRole == 1).Select(u => new { u.Id, u.Name,u.Login, u.Surname, u.Phone, u.UsersInformation.LevelStatus, u.UsersInformation.AmountTraining, u.UsersInformation.CanceledTraining}).ToList();
                if (users != null)
                {
                    return Json(users);

                }
                else 
                    return Json(new BadResponse("Нет пользователей"));


            }
            catch(Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));

            }
        }


        [HttpPut]
        [Route("editUser")]
        public async Task<IActionResult> EditUser([FromBody]EditUser model)
        {
            try
            {
                if(model.Id != 0)
                {
                    var users = _context.Users.Where(u => u.IdRole == 1).ToList();
                    var users_inf = _context.UsersInformations.ToList();
                    if (users != null)
                    {
                        foreach (var a in users)
                        {
                            if (a.Id == model.Id)
                            {
                                if(model.Name != null)
                                    a.Name = model.Name;
                                if(model.Surname != null)
                                    a.Surname = model.Surname;
                                if (model.Phone != null)
                                    a.Phone = model.Phone;
                            }
                           
                        }

                        if(users_inf != null)
                        {
                            foreach(var inf in users_inf)
                            {
                                if(inf.IdUser == model.Id)
                                {
                                    if (model.LevelStatus != null)
                                        inf.LevelStatus = model.LevelStatus;
                                }
                               
                            }
                        }
                       
                        await _context.SaveChangesAsync();

                        return Json("Данные пользователя изменены");

                    }
                    else
                    {
                        return Json(NotFound(new { errorMsg = "Нет данных" }));
                    }


                }
                else
                {
                    return Json(NotFound(new { errorMsg = "Пользователь не выбран" }));

                }

            }
            catch (Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));

            }
        }

        [HttpGet]
        [Route("getCalls")]
        public async Task<IActionResult> GetCalls()
        {
            try
            {
                var calls = _context.Calls.ToList();
                if (calls != null)
                {
                    return Json(calls);

                }
                else
                    return Json(new BadResponse("Нет пользователей"));


            }
            catch (Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));

            }
        }

        [HttpDelete]
        [Route("deleteCall")]
        public async Task<IActionResult> deleteCall(int id)
        {
            try
            {
                var calls = _context.Calls;
                foreach (var a in calls)
                {
                    if (a.Id == id)
                    {
                        calls.Remove(a);
                    }
                }
               

                await _context.SaveChangesAsync();
                return Json("Запись на звонок удалена");

            }
            catch (Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));
            }

        }

        [HttpGet]
        [Route("getSchedule")]
        public async Task<IActionResult> GetSchedule()
        {
            try
            {
                var shedule = _context.Shedules.Select(sch => new { sch.Id, sch.IdTrainerNavigation.Name, sch.IdTrainerNavigation.Surname, sch.Data, sch.HoursStart, sch.HoursEnd}).ToList();
                if (shedule != null)
                {
                    return Json(shedule);

                }
                else
                    return Json(new BadResponse("Нет доступного расписания"));


            }
            catch (Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));

            }
        }

        [HttpDelete]
        [Route("deleteScheduleItem")]
        public async Task<IActionResult> DeleteScheduleItem(int id)
        {
            try
            {
                var shedule = _context.Shedules;
                var shedule_trainer = _context.Shedules.Where(sch => sch.Id == id).Select(sch_t => sch_t.IdTrainer).SingleOrDefault();
                var tr_user = _context.training.Where(t => t.IdSheduleNavigation.IdTrainer == shedule_trainer && t.IdShedule == id).ToList();
                if (tr_user.Count != 0)
                {
                    return Json(new BadResponse("Тренер ведет тренировки, его нельзя удалить из расписания"));

                }

                foreach (var a in shedule)
                {
                    if (a.Id == id)
                    {
                        shedule.Remove(a);
                    }
                }


                await _context.SaveChangesAsync();
                return Json("Запись удалена из расписания");

            }
            catch (Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));
            }

        }

    }
}