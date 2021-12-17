use Amadeus;

create table News
(
	Id int primary key identity(1,1),
	News_heading nvarchar(350),
	News_element text
)

insert into News(News_heading, News_element)
values('»зменение в расписании', 'ƒорогие друзь€, у нас изменилось расписание на этой неделе,
следите за обновлени€ми.');

insert into News(News_heading, News_element)
values('ѕоздравл€ем вас с наступающими праздниками!', '—коро наступают праздники,
не забудьте поздравить своих близких и родных!');

select * from News;
select * from Users;