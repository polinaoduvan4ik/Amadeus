
use Amadeus

create table Roles
(
  Id int primary key identity(1,1),
  Role_name nvarchar(20)
)
drop table Roles;

create table Users
(
  Id int primary key identity(1,1),
  [Login] nvarchar(20),
  [Password] nvarchar(20),
  [Name] nvarchar(20),
  Surname nvarchar(20),
  Phone nvarchar(15),
  Id_role int,
  foreign key (Id_role) references Roles(Id)
)
drop table Users

create table Users_information
(
  Id_user int primary key,
  foreign key (Id_user) references Users(Id),
  Level_status nvarchar(20),
  Subscription_training int,
  Was_on_training binary,
  Canceled_training int,
  Amount_training int,
  Trainer_discription text,
  Trainer_photo varbinary(MAX)
)
drop table Users_information
ALTER TABLE Users_information ALTER COLUMN Was_on_training BIT;

create table Template
(
  Template_name nvarchar(50) primary key,
  Ozn int,
  Z int,
  FirstLevel int,
  SecondLevel int,
  Poni int
)
drop table Template

create table Shedule
(
  Id int primary key identity(1,1),
  Id_trainer int
  foreign key(Id_trainer) references Users(id),
  [Data] date,
  Hours_start time,
  Hours_end time,
  Template_training nvarchar(50)
  foreign key(Template_training) references Template(Template_name)
)
drop table Shedule

create table Training
(
  Id int primary key identity(1,1),
  Id_shedule int
  foreign key(Id_shedule) references Shedule(Id),
  Id_user int
  foreign key(Id_user) references Users(Id),
  Status nvarchar(20)
)
drop table Training

create table Calls
(
 Id int identity(1,1),
 [Name] nvarchar(30),
 Surname nvarchar(30),
 Phone nvarchar(15)
)

ALTER TABLE Calls ADD PRIMARY KEY (Id);





