using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Amadeus.Models
{
    public class RegisterTrainer
    {
        [Required(ErrorMessage = "Не указан логин")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Не указан пароль")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Не указано имя")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Не указана фамилия")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Не указан телефон")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Не указано описание")]
        public string TrainerDiscription { get; set; }


        public RegisterTrainer()
        {

        }

        public RegisterTrainer(string login, string password, string name, string surname, string phone, string description)
        {
            Login = login;
            Password = password;
            Name = name;
            Surname = surname;
            Phone = phone;
            TrainerDiscription = description;
        }
    }
}
