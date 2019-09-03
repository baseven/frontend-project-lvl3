
/**
 * Реализуем скачивание потока и парсинг полученных данных потока.
 * ! Добавление нужных данных в соответствующие списки выполняется в watch
 * -
 * Скачиваем данные. upd. вынес в utils
 * Парсим данные
 * Проверяем, соответствуют ли формат, скачанных данных, xml
 * Возвращаем структуру следующего формата: { newsFeed: [article1, article2, ..., arcticleN] }
 */
export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/rss+xml');
  return doc;
};
