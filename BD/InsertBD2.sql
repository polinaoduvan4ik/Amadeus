use Amadeus;

insert into Trainers([Name],Surname, Trainer_discription, Trainer_photo)
values ('Елена','Беспалова', '  Елена всегда поможет вам в знакомстве с таким спортом, как конный.
Объяснит и подробно покажет все этапы подготовки и обучения. Вы можете задавать любые вопросы в процессе тренировки,
главное - внимательно слушать и следовать всем правилам и советам.', BulkColumn 
from Openrowset(Bulk N'D:\4k1s\kurs\BD\Elena.jpg', SINGLE_BLOB) as image);
 



insert into Trainers([Name],Surname)
values ('Светлана','Никифоренко');
insert into Trainer_information(Id_trainer, Trainer_discription, Trainer_photo)
select 2, '  Светлана расскажет все хитрости и секреты успешного обучения конному спорту и 
продуктивных тренировок. Вы никогда не почувствуете себя потеряно, потому что она будет `вести вас за руку`
во всех тяжелых ситуациях.', BulkColumn 
from Openrowset(Bulk N'D:\4k1s\kurs\BD\Sveta.jpg', SINGLE_BLOB) as image


insert into Users([Login], [Password])
values('admin', 'df4d6c95c5321330bd1d93c4c14f31006e041ec9dc5ccaadf463a7e586cc661c');

update Users set Id_role = 2 where Surname = 'Беспалова'

insert into Users_information(Id_user, Trainer_discription)
values(1004, 'Елена всегда поможет вам в знакомстве с таким спортом, как конный.
Объяснит и подробно покажет все этапы подготовки и обучения. Вы можете задавать любые вопросы в процессе тренировки,
главное - внимательно слушать и следовать всем правилам и советам')

update Users_information set Trainer_discription = 'Елена всегда поможет вам в знакомстве с таким спортом, как конный.
Объяснит и подробно покажет все этапы подготовки и обучения. Вы можете задавать любые вопросы в процессе тренировки,
главное - внимательно слушать и следовать всем правилам и советам' where Id_user = 1004;

select * from Users_information;