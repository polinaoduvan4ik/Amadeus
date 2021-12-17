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


                    return RedirectToAction("Index", "Home");
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
        public async Task<IActionResult> EditTrainer(int id, string text)
        {
            try
            {
                var users = _context.Users;
                if (users != null)
                {
                    List<User> user1 = new List<User>();
                    foreach (var a in users)
                    {
                        if (a.Id == id)
                        {
                            a.UsersInformation.TrainerDiscription = text;
                            await _context.SaveChangesAsync();
                        }
                    }
                    return Json("Описание тренера изменено");
                }
                else
                {
                    return Json(NotFound(new { errorMsg = "Нет данных" }));
                }
            }
            catch(Exception ex)
            {
                return Json(BadRequest(new { errorMsg = ex.Message }));
            }


        }

        /*[HttpDelete]
        [Route("deleteUser")]
        public async Task<IActionResult> DeleteUser(User model)
        {

        }*/

        [HttpPost]
        [Route("addShedule")]
        public async Task<IActionResult> AddShedule(int id, DateTime date, DateTime beginwork, DateTime endwork)
        {
            try
            {
                if (id != 0 && date != null && beginwork != null && endwork != null)
                {

                    var beginworktime = beginwork.TimeOfDay;
                    var endworktime = endwork.TimeOfDay;
                    TimeSpan diff = endworktime.Subtract(beginworktime);
                    var shedule = _context.Shedules;

                    for (int i = 0; i < diff.Hours; i++)
                    {
                        var isshedule = _context.Shedules.Any(x => x.IdTrainer == id && x.Data == date && x.HoursStart == beginworktime.Add(new TimeSpan(i, 0, 0)) && x.HoursEnd == beginworktime.Add(new TimeSpan(i + 1, 0, 0)));
                        if (!isshedule)
                        {
                            var shedule_element = new Shedule { IdTrainer = id, Data = date, HoursStart = beginworktime.Add(new TimeSpan(i, 0, 0)), HoursEnd = beginworktime.Add(new TimeSpan(i + 1, 0, 0)) };
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

        

        
    }
}