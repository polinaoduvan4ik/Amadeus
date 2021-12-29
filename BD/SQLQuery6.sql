/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT TOP (1000) [Template_name]
      ,[Ozn]
      ,[Z]
      ,[FirstLevel]
      ,[SecondLevel]
      ,[Poni]
  FROM [Amadeus].[dbo].[Template]

  insert into Template(Template_name, Ozn, Z, FirstLevel, SecondLevel, Poni)
  values('first_template', 1, 0, 0, 2, 0)
   insert into Template(Template_name, Ozn, Z, FirstLevel, SecondLevel, Poni)
  values('second_template', 0, 1, 0, 2, 0)
   insert into Template(Template_name, Ozn, Z, FirstLevel, SecondLevel, Poni)
  values('third_template', 0, 0, 1, 2, 0)
   insert into Template(Template_name, Ozn, Z, FirstLevel, SecondLevel, Poni)
  values('fouth_template', 0, 0, 0, 2, 1)
   insert into Template(Template_name, Ozn, Z, FirstLevel, SecondLevel, Poni)
  values('fifth_template', 0, 0, 0, 3, 0)

  delete from Template;
