use Amadeus;

create table News
(
	Id int primary key identity(1,1),
	News_heading nvarchar(350),
	News_element text
)

insert into News(News_heading, News_element)
values('��������� � ����������', '������� ������, � ��� ���������� ���������� �� ���� ������,
������� �� ������������.');

insert into News(News_heading, News_element)
values('����������� ��� � ������������ �����������!', '����� ��������� ���������,
�� �������� ���������� ����� ������� � ������!');

select * from News;
select * from Users;