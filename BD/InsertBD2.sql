use Amadeus;

insert into Trainers([Name],Surname, Trainer_discription, Trainer_photo)
values ('�����','���������', '  ����� ������ ������� ��� � ���������� � ����� �������, ��� ������.
�������� � �������� ������� ��� ����� ���������� � ��������. �� ������ �������� ����� ������� � �������� ����������,
������� - ����������� ������� � ��������� ���� �������� � �������.', BulkColumn 
from Openrowset(Bulk N'D:\4k1s\kurs\BD\Elena.jpg', SINGLE_BLOB) as image);
 



insert into Trainers([Name],Surname)
values ('��������','�����������');
insert into Trainer_information(Id_trainer, Trainer_discription, Trainer_photo)
select 2, '  �������� ��������� ��� �������� � ������� ��������� �������� ������� ������ � 
������������ ����������. �� ������� �� ������������ ���� ��������, ������ ��� ��� ����� `����� ��� �� ����`
�� ���� ������� ���������.', BulkColumn 
from Openrowset(Bulk N'D:\4k1s\kurs\BD\Sveta.jpg', SINGLE_BLOB) as image


insert into Users([Login], [Password])
values('admin', 'df4d6c95c5321330bd1d93c4c14f31006e041ec9dc5ccaadf463a7e586cc661c');

update Users set Id_role = 2 where Surname = '���������'

insert into Users_information(Id_user, Trainer_discription)
values(1004, '����� ������ ������� ��� � ���������� � ����� �������, ��� ������.
�������� � �������� ������� ��� ����� ���������� � ��������. �� ������ �������� ����� ������� � �������� ����������,
������� - ����������� ������� � ��������� ���� �������� � �������')

update Users_information set Trainer_discription = '����� ������ ������� ��� � ���������� � ����� �������, ��� ������.
�������� � �������� ������� ��� ����� ���������� � ��������. �� ������ �������� ����� ������� � �������� ����������,
������� - ����������� ������� � ��������� ���� �������� � �������' where Id_user = 1004;

select * from Users_information;