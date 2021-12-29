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
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

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
                    UsersInformation userinf = new UsersInformation { IdUser = user.Id, AmountTraining = 0, CanceledTraining = 0, LevelStatus = "Ozn" };
                    _context.Add(userinf);
                    await _context.SaveChangesAsync();


                    await Authenticate(user); // аутентификация

                    return Json("Вы зарегистрировались");
                }
                else
                    ModelState.AddModelError("", "Некорректные данные");
            }
            return new JsonResult(new BadResponse("Некорректные данные"));
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
/*                    await Authenticate(user); // аутентификация
*/                    var identity = await this.Authenticate(user);
                    if (user == null)
                    {
                        return StatusCode(500, "Invalid username or password.");
                    }

                    var encodedJwt = GetJwtToken(user, identity);

                    

                    return Json(encodedJwt);


                }
                return new JsonResult(new BadResponse("Такого пользователя не существует"));
            }
            return new JsonResult(new BadResponse("Некорректные логин и(или) пароль"));
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
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            // установка аутентификационных куки
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
            return claimsIdentity;
        }

        private string GetJwtToken(User login, ClaimsIdentity identity)
        {
            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: Options.ISSUER,
                    audience: Options.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(Options.LIFETIME)),
                    signingCredentials: new SigningCredentials(Options.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        static public string UncodeJwt(string token)
        {
            string secret = "mysupersecret_secretkey!123";
            var key = Encoding.ASCII.GetBytes(secret);
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
            ClaimsPrincipal claims = handler.ValidateToken(token, validations, out var tokenSecure);
            return claims.Identity.Name;
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

