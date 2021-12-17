using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Amadeus.Models;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Linq;

namespace Amadeus.Controllers
{
    
    public class AccountController : Controller
    {
        private AmadeusContext _context;
        public AccountController(AmadeusContext context)
        {
            _context = context;
        }
       
        [HttpPost]
       // [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register([FromBody]RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                User user = await _context.Users.FirstOrDefaultAsync(u => u.Login == model.Login);
                if (user == null)
                {
                    string passwordhash = generateSHA512(model.Password);
                    // добавляем пользователя в бд
                    user = new User { Login = model.Login, Password = passwordhash, Name = model.Name, Surname = model.Surname, Phone = model.Phone };
                    Role userRole = await _context.Roles.FirstOrDefaultAsync(r => r.Id == 1);
                    if (userRole != null)
                        user.IdRole = userRole.Id;

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                    UsersInformation userinf = new UsersInformation { IdUser = user.Id };
                    _context.Add(userinf);
                    await _context.SaveChangesAsync();


                    await Authenticate(user); // аутентификация

                    return RedirectToAction("Index", "Home");
                }
                else
                    ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }
            return Json(model);
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([FromBody]LoginModel model)
        {
            if (ModelState.IsValid)
            {
                string passwordhash = generateSHA512(model.Password);
                User user = await _context.Users
                    //.Include(u => u.IdRole)
                    .FirstOrDefaultAsync(u => u.Login == model.Login && u.Password == passwordhash);
                if (user != null)
                {
                    await Authenticate(user); // аутентификация
                    var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
                    var id = int.Parse(identity.Claims.Where(l => l.Type == "id").Select(l => l.Value).SingleOrDefault());
                    var role = identity.Claims.Where(r => r.Type == ClaimTypes.Role).Select(r => r.Value).SingleOrDefault();


                    return Json(new { id = id, role = role });
                }
                ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }
            return Json(model);
        }
        private async Task<ClaimsIdentity> Authenticate(User user)
        {
            // создаем один claim
            var claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.IdRole.ToString())
            };
            // создаем объект ClaimsIdentity
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            // установка аутентификационных куки
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
            return id;
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
    }
}