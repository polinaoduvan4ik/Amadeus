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
                var trainers = _context.Users;
                var trainers_inf = _context.UsersInformations;
                foreach(var a in trainers)
                {
                    if(a.Id == id)
                    {
                        trainers.Remove(a);
                    }
                }
                foreach (var a in trainers_inf)
                {
                    if (a.IdUser == id)
                    {
                        trainers_inf.Remove(a);
                    }
                }

                await _context.SaveChangesAsync();
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
                var users = _context.Users;
                List<User> users1 = new List<User>();
                foreach(var a in users)
                {
                    if (a.IdRole == 1)
                        users1.Add(a);
                            
                }

                return Json(users1);

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
                    var users = _context.Users;
                    if (users != null)
                    {
                        List<User> user1 = new List<User>();
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
            catch(Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));

            }
        }

        

        
    }
}