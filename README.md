# test1win

MySQL 8.0.12 (хранение информации)
Redis 4.0.10 (кеширование по запросу SQL)
Node 8.11.3 


пути для АПИ
get /book?orderBy=колонка&groupBy=колонка&page=число (параметры можно указывать все одновременно и с ошибками, LIMIT 50)
get /book/:bookId (получение информации о конкретной книге)
post /book (создание книги. Для успешного создания требуются все поля кроме id)
put /book/:bookId (обновление книги. Нужного указать id и список полей для изменения)
