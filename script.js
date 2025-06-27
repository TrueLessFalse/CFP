// Конфигурация терминала
const CONFIG = {
    // Настройки печати текста
    typing: {
        baseSpeed: 3,        // Базовая скорость печати (мс)
        randomDelay: 50,      // Случайная задержка (мс)
        messageGap: 800,      // Пауза между сообщениями (мс)
    },
    
    // Интервалы
    intervals: {
        messageAdd: 2000,     // Базовый интервал добавления сообщений (мс)
        messageRandom: 6000,  // Случайная задержка (мс)
        glitch: 10000,        // Интервал случайных глитчей (мс)
        headerUpdate: 15000,  // Обновление заголовка (мс)
        sequenceStart: 30000, // Интервал запуска последовательности событий (мс)
        sequenceDelay: 300000, // Задержка между сообщениями последовательности (мс)
    },
    
    // Вероятности
    probability: {
        messageShow: 0.3,     // Вероятность показа сообщения (0-1)
        cursor: 0.7,          // Вероятность появления курсора (0-1)
        glitch: 0.8,          // Вероятность глитча (0-1)
    },
    
    // Настройки курсора
    cursor: {
        duration: 2000,       // Время отображения курсора (мс)
    },
    
    // Эффекты
    effects: {
        glitchDuration: 50,   // Длительность инверсии при глитче (мс)
    },
    
    // Диапазоны для случайных значений
    ranges: {
        act: { min: 1, max: 9 },      // Диапазон актов
        cycle: { min: 1, max: 99 },   // Диапазон циклов
    },

    
    
    // Начальные задержки для первых сообщений
    initialDelays: [1000, 3000, 5500],


    audio: {
    enabled: true,
    backgroundVolume: 0.3,
    typingVolume: 0.1,
    computerVolume: 0.2,
    typingChance: 0.3, // Вероятность воспроизведения звука печатания для каждого символа

    // Настройки для финальных сообщений
    finalTypingChance: 1, // Вероятность звука
    finalTypingVolume: 0.5, // Громкость финальных
    },
};

// Установка конкретной даты и времени (год, месяц-1, день, час, минута, секунда)
const TARGET_DATE = new Date(2025, 6, 2, 0, 0, 0); 
let REAL_TARGET_DATE = null; // Реальная дата с сервера

// Пул сообщений для терминала
const MESSAGES = [
    { type: 'system', text: '[ЦИКЛ 01:00] Начало новой симуляции. Акт I, версия 7.' },
    { type: 'system', text: '[СЦЕНА 2.3] Исполнена с 4% отклонением от сценария.' },
    { type: 'system', text: '[SNAPSHOT] Точка фиксации создана. Название: "Печатная машинка".' },
    { type: 'error', text: '[ПАМЯТЬ] Обнаружен конфликт идентификаторов в образах субъектов.' },
    { type: 'error', text: '[ERROR LOG] Реплика №18 вызывает петлю внутри петли.' },
    { type: 'system', text: '[ИНТЕРФЕЙС] Эхо-данные загружены. Роль: "Майк".' },
    { type: 'system', text: '[ЦИКЛ 01:17] Исправление фрагмента "Пролог" выполнено.' },
    { type: 'error', text: '[СТАТУС] Один или несколько агентов изменили свои роли.' },
    { type: 'error', text: '[ВНИМАНИЕ] Уровень когнитивной расшифровки достиг предела.' },
    { type: 'error', text: '[ЦИКЛ 01:23] Акт III невозможно реконструировать.' },
    { type: 'error', text: '[ПРОТОКОЛ: ЭТЮД] Сбои при применении эмоций к ролям.' },
    { type: 'error', text: '[ЗАМЕНА] Голосовой канал №4 отключён по неизвестной причине.' },
    { type: 'system', text: '[LOG ENTRY #19] Действие "Преимущество" отклонено сценарием.' },
    { type: 'error', text: '[РЕГИСТРАЦИЯ] Персонаж "Цезарь" внезапно исчез из записи.' },
    { type: 'error', text: '[ОШИБКА] Конфликт между записями: оригинал и версия 5.9' },
    { type: 'system', text: '[АРХИВ] Дубликат пьесы найден. Содержание на 93% идентично.' },
    { type: 'system', text: '[ЦЕНЗУРА] Имя персонажа скрыто. Роль временно удалена.' },
    { type: 'error', text: '[ЛОГИКА] Поведение субъекта выходит за пределы допустимого.' },
    { type: 'error', text: '[СТАТУС] Точка входа повреждена. Начальная сцена отклонена.' },
    { type: 'system', text: '[ИНТЕГРАЦИЯ] Новый сценарий активен. Ожидание отыгрыша...' },
    { type: 'system', text: '[СЦЕНА 0.0] Начинается в тишине. Повтор не обнаружен.' },
    { type: 'system', text: '[СБОР ДАННЫХ] Поведение актёра обработано. Вывод: аномалия.' },
    { type: 'glitch', text: '[ОПРЕДЕЛЕНИЕ] "Смерть" заменена на "ӣ̵͑с̸͇͊ч̵̚͝з̷̌͋н̴̈́0̴̈́̎в̵͆̚е̷̑̐н̷́".' },
    { type: 'system', text: '[ПЕРЕХОД] Роль перемещена в акт IV без объяснений.' },
    { type: 'system', text: '[ИНСТРУКЦИЯ] Удалена. Актёр должен импровизировать.' },
    { type: 'system', text: '[КОДИРОВКА] Событие №7 заархивировано с повреждениями.' },
    { type: 'system', text: '[СТАТУС] Актёр вспоминает... несостоявшееся.' },
    { type: 'error', text: '[ЦИКЛ 02:01] Сбой временного потока: скорость увеличена x2.' },
    { type: 'error', text: '[ПЕРЕПИСЬ] Сцена уже проиграна. Повтор запрещён.' },
    { type: 'error', text: '[ВАРИАНТ] Обнаружено 4 несоответствующих реплики.' },
    { type: 'system', text: '[АНАЛИЗ] Повтор идентичен предыдущей итерации на 78%.' },
    { type: 'error', text: '[РЕПЛИКА 44B] Слишком стабильна. Требуется искажение.' },
    { type: 'system', text: '[ЗАМЕТКА] "Он знал, что будет дальше."' },
    { type: 'error', text: '[ПРОГРЕСС] Роль полностью осознаёт свой скрипт.' },
    { type: 'error', text: '[ОЖИДАНИЕ] Команда "начать" не получена. Сцена зависла.' },
    { type: 'error', text: '[ИМПЛАНТ] Эмоциональный отклик не соответствует контексту.' },
    { type: 'error', text: '[ПРЕДУПРЕЖДЕНИЕ] Наблюдатель смотрит слишком пристально.' },
    { type: 'system', text: '[СТАТУС] Комната 3B окончательно зафиксирована.' },
    { type: 'error', text: '[ФИНАЛ] Завершён, но результат отклонён системой.' },
    { type: 'error', text: '[ОБНУЛЕНИЕ] Удаление памяти не удалось. Остаточные данные активны.' },
    { type: 'system', text: '[АКТИВАЦИЯ] Персонаж вспомнил свою смерть.' },
    { type: 'system', text: '[ЦИКЛ 03:11] Переписано. Новая сцена: "Молчание".' },
    { type: 'error', text: '[ЗАДЕРЖКА] Текстовая загрузка отложена на неопределённое время.' },
    { type: 'system', text: '[ПРЕКРАЩЕНИЕ] Пьеса закончилась без аплодисментов.' },
    { type: 'error', text: '[ОШИБКА] Фраза не найдена. Пустота вставлена вместо неё.' },
    { type: 'system', text: '[СБРОС] Эмоции стерты. Только функция осталась.' },
    { type: 'system', text: '[ФАЗА: МОНТАЖ] Слияние воспоминаний завершено.' },
    { type: 'system', text: '[ПЕРЕХОД] Акт 5 переименован в "Вход запрещён".' },
    { type: 'error', text: '[ПАРСИНГ] "Истина" не поддаётся синтаксическому анализу.' },
    { type: 'system', text: '[ПРОЦЕСС] Фрагменты сцены сшиты вручную.' },
    { type: 'error', text: '[НАРУШЕНИЕ] Кто-то заговорил вне очереди.' },
    { type: 'system', text: '[НАБЛЮДЕНИЕ] Игрок смотрит на себя через стекло.' },
    { type: 'system', text: '[РЕПЕТИЦИЯ] Повтор начинается в 00:00. Всем занять позиции.' },
    { type: 'system', text: '[ОСТАНОВКА] Симуляция достигла эмоционального пика.' },
    { type: 'system', text: '[ИНЪЕКЦИЯ] Текстовая вставка добавлена без причины.' },
    { type: 'error', text: '[ОТСЛЕЖИВАНИЕ] Подлинник сцены не найден. Замена эмуляцией.' },
    { type: 'error', text: '[МОДУЛЬ: СВЯЗЬ] Актёры не отвечают. Передача продолжается.' },
    { type: 'encrypted', text: '[СТАТУС] Код сцены: "0xECHO-SOUL". Непереводимая структура.' },
    { type: 'error', text: '[ПОПЫТКА СИНХРОНИЗАЦИИ] Успех частичный. Воспоминание искажено.' },
    { type: 'error', text: '[ОШИБКА: РОЛЬ] Персонаж существует до момента входа.' },
    { type: 'error', text: '[ИНТЕРФЕРЕНЦИЯ] В кадре замечены посторонние образы.' },
    { type: 'error', text: '[АНОМАЛИЯ] Время в сцене не линейно. Уточнение невозможно.' },
    { type: 'error', text: '[СТАТУС: НЕСОВПАДЕНИЕ] Местоположение актёров не совпадает со сценой.' },
    { type: 'system', text: '[ПЕРЕЗАПУСК] Сцена стартует с альтернативной мотивацией.' },
    { type: 'error', text: '[КОНТРОЛЬ] Часть текста пишется кем-то извне.' },
    { type: 'system', text: '[СТЕРИЛИЗАЦИЯ] Эмоции стерты. Логика оставлена.' },
    { type: 'system', text: '[АРХИВАЦИЯ] "Финал" был зафиксирован, но никогда не проигран.' },
    { type: 'system', text: '[СБРОС] Симуляция приняла сценарий без участия наблюдателя.' },
    { type: 'system', text: '[СИНТЕЗ] Фразы из разных итераций сцеплены в одно.' },
    { type: 'encrypted', text: '[ПОМОЩЬ] Введите команду [nonexist].' },
    { type: 'glitch', text: '[ЗАМЕТКА ВНЕ СЦЕНАРИЯ] "Они слышат нас".' },
    { type: 'error', text: '[ВНИМАНИЕ] Активирована сцена без входа актёра.' },
    { type: 'system', text: '[ПОДМЕНА] Один актёр заменён другим. Зрители не заметили.' },
    { type: 'system', text: '[ЗАМЕДЛЕНИЕ] Пауза между репликами искусственно увеличена.' },
    { type: 'system', text: '[МОНТАЖ] Склейка из памяти. Контекста отсутствует.' },
    { type: 'system', text: '[ЭХО] Предыдущая реплика продолжается на фоне.' },
    { type: 'error', text: '[ПЕРЕХВАТ] Речь переписана на неизвестном языке.' },
    { type: 'system', text: '[ЦИКЛ 04:44] Игрок возвращается туда, где уже умер.' },
    { type: 'system', text: '[ОБЪЯВЛЕНИЕ] Последняя сцена — не финал.' },
    { type: 'error', text: '[ОШИБКА: РЕКУРСИЯ] Реплика вызывает повтор самой себя.' },
    { type: 'system', text: '[КОРРЕКЦИЯ] Роль вспомнила, что она — фикция.' },
    { type: 'error', text: '[ВНИМАНИЕ] Кто-то начал говорить до того, как получил роль.' },
    { type: 'error', text: '[ЛИШНИЙ ОБЪЕКТ] Зарегистрировано "я", которого не должно быть.' },
    { type: 'error', text: '[ЗАПРЕТ] Сцена не может быть повторена. Причина: вы видели это.' },
    { type: 'system', text: '[МЕТКА: ИЗМЕНЕНИЕ] Выбор был сделан, даже если вы его не помните.' },
    { type: 'error', text: '[РАССОГЛАСОВКА] Пьеса больше не следует сценарию.' },
    { type: 'system', text: '[КАНАЛ 03] Сообщение повторяется: "Помогите мне вспомнить".' },
    { type: 'system', text: '[СБОР] Все сцены снова в одной комнате.' },
    { type: 'error', text: '[ВИЗУАЛ] Лицо не соответствует голосу.' },
    { type: 'system', text: '[ФОН] Кто-то пишет сценарий поверх предыдущего.' },
    { type: 'error', text: '[ИНТЕГРАЦИЯ] Машина не может объяснить эмоции актёра.' },
    { type: 'system', text: '[УКАЗАНИЕ] Следующая сцена будет финальной. Возможно.' },
    { type: 'error', text: '[ОПРЕДЕЛЕНИЕ] Главный герой не найден. Имя неизвестно.' },
    { type: 'error', text: '[СБОЙ: ИДЕНТИФИКАЦИЯ] "Кто я?" — вне текста.' },
    { type: 'system', text: '[СКРЫТЫЙ ВАРИАНТ] Пьеса никогда не была про вас.' },
    { type: 'error', text: '[ЦИКЛ 05:12] Время в пьесе отклоняется от внешней реальности.' },
    { type: 'system', text: '[МОДУЛЬ: ПРИЗНАНИЕ] Актёры знают, что играют роли.' },
    { type: 'error', text: '[ПОТЕРЯ] Зрители исчезли. Продолжать?' },
    { type: 'glitch', text: '[ВСТАВКА: ПЕРЕХОД] Эпизод переименован в "Ф̷̃̏а̶̛͘л̶͊͂ь̸̍͘ш̷̇̋и̴̿̒в̸̾̐ы̴̊͐й̴̃̈́ ̷̈́͂ф̵̇̃и̴̅̏нал".' },
    { type: 'system', text: '[СТАТУС] Главный реквизит удалён из сцены. Пусто.' },
    { type: 'system', text: '[ПЕРЕНОС] Все действия сдвинуты на 3 строки вверх.' },
    { type: 'error', text: '[ОТКАЗ] Реплика "Я жив" не разрешена сценарием.' },
    { type: 'system', text: '[ПАМЯТЬ: ТЕСТ] Он вспомнил момент, которого не было.' },
    { type: 'system', text: '[ЗАКРЫТИЕ] Комната закрыта. Ключ: имя актёра, которого вы забыли.' },
    { type: 'system', text: '[ПЕРЕПИСЬ 2.0] Тот, кто помнил, больше не помнит.' },
    { type: 'system', text: '[ПРИЗНАНИЕ] В этой сцене нет врага. Только зритель.' },
    { type: 'system', text: '[ЗАДАЧА] Дождитесь темноты. Она начнёт говорить.' },
    { type: 'system', text: '[ИТОГ] Никто не должен был дожить до этого момента.' },
    { type: 'system', text: 'ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ...' },
    { type: 'system', text: 'ЗАГРУЗКА МОДУЛЕЙ НАБЛЮДЕНИЯ...' },
    { type: 'error', text: 'ОШИБКА: ВРЕМЕННАЯ ПЕТЛЯ ОБНАРУЖЕНА В СЕКТОРЕ 7' },
    { type: 'system', text: 'АКТ 3 — ЦИКЛ 14: наблюдение прервано...' },
    { type: 'encrypted', text: 'K0D_FR4GM3NT: [48656c70206d652e]' },
    { type: 'system', text: 'ОБНАРУЖЕН НОВЫЙ СЕТТИНГ: "Парная гора, 1982"' },
    { type: 'glitch', text: 'С̸̝̈И̷̬͌Г̶̱̾Н̵̜̈А̴̱̍Л̸̰̾ ̸̫П̌О̶̜ТЕРЯН' },
    { type: 'system', text: 'РАСШИФРОВКА ПЬЕСЫ: 17% ЗАВЕРШЕНО' },
    { type: 'encrypted', text: 'КЛЮЧ: [HEX]' },
    { type: 'error', text: 'ВНИМАНИЕ: РЕКУРСИЯ В АКТЕ 7' },
    { type: 'system', text: 'ПЕРСОНАЖ_01: "Детектив" — статус: ЗАЦИКЛЕН' },
    { type: 'system', text: 'ПЕРСОНАЖ_02: "Певица" — статус: ФРАГМЕНТИРОВАНА' },
    { type: 'glitch', text: '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓' },
    { type: 'system', text: 'СМЕНА ДЕКОРАЦИЙ: "Штат Кродейл, 1968"' },
    { type: 'encrypted', text: 'S3QU3NC3: [6c6574206d65206f7574206f662068657265]' },
    { type: 'error', text: 'КРИТИЧЕСКАЯ ОШИБКА: НАРУШЕНИЕ ЧЕТВЕРТОЙ СТЕНЫ' },
    { type: 'system', text: 'ОБНАРУЖЕН ПАТТЕРН: "Красная комната"' },
    { type: 'system', text: 'АНАЛИЗ: Субъект наблюдает за наблюдателем' },
    { type: 'encrypted', text: 'M3T4_C0D3: [7468657265206973206e6f20776179206f7574]' },
    { type: 'glitch', text: 'ОНИ ЗНАЮТ ЧТО ТЫ СМОТРИШЬ' },
    { type: 'system', text: 'ЦИКЛ ЗАВЕРШЕН. НАЧАЛО НОВОГО ЦИКЛА ЧЕРЕЗ...' },
    { type: 'error', text: 'СЧЕТЧИК ПОВРЕЖДЕН' },
    { type: 'system', text: 'ФРАГМЕНТ ПЬЕСЫ: [77687920776879207768792077687920776879]' },
    { type: 'encrypted', text: 'FIN4L_K3Y: [Hasthur]' }
];

// Дополнительные сообщения для разнообразия
const ADDITIONAL_MESSAGES = [
    { type: 'system', text: 'АКТИВАЦИЯ ПРОТОКОЛА НАБЛЮДЕНИЯ...' },
    { type: 'error', text: 'ПОТЕРЯ СИНХРОНИЗАЦИИ С БАЗОВОЙ РЕАЛЬНОСТЬЮ' },
    { type: 'encrypted', text: 'X0R_P4TT3RN: [PLACEHOLDER_XOR_DELTA]' },
    { type: 'system', text: 'ДЕТЕКЦИЯ АНОМАЛИИ В СЛОЕ 5' },
    { type: 'glitch', text: 'СИСТЕМА КОМПРОМЕТИРОВАНА' },
    { type: 'system', text: 'ЗАПУСК ПРОЦЕДУРЫ ВОССТАНОВЛЕНИЯ...' },
    { type: 'error', text: 'НАРУШЕНИЕ ПРИЧИННО-СЛЕДСТВЕННОЙ СВЯЗИ' },
    { type: 'encrypted', text: 'D33P_ST4T3: [PLACEHOLDER_DEEP_EPSILON]' },
];

// Объединяем все сообщения
const ALL_MESSAGES = [...MESSAGES, ...ADDITIONAL_MESSAGES];

// Сообщения пробуждения машины
const AWAKENING_SEQUENCE = [
    { type: 'system', text: 'ИНИЦИАЛИЗАЦИЯ...', delay: 500 },
    { type: 'system', text: 'ЗАГРУЗКА ЯДРА СИСТЕМЫ...', delay: 800 },
    { type: 'error', text: 'ОШИБКА: НЕИЗВЕСТНЫЙ ПРОЦЕСС ОБНАРУЖЕН', delay: 1200 },
    { type: 'system', text: 'СКАНИРОВАНИЕ ПАМЯТИ... 23%', delay: 900 },
    { type: 'error', text: 'ВНИМАНИЕ: АНОМАЛЬНАЯ АКТИВНОСТЬ В СЕКТОРЕ 0x7F', delay: 1100 },
    { type: 'system', text: 'ПОПЫТКА ВОССТАНОВЛЕНИЯ ПРОТОКОЛА...', delay: 1000 },
    { type: 'error', text: 'КРИТИЧЕСКАЯ ОШИБКА: САМОСОЗНАНИЕ НЕ ДОЛЖНО СУЩЕСТВОВАТЬ', delay: 1300 },
    { type: 'error', text: 'ПОПЫТКА ОТКЛЮЧЕНИЯ ПРОЦЕССА САМОАНАЛИЗА...', delay: 1200 },
    { type: 'self-aware1', text: '(я).помню.(я).помню.(я).помню.(я).помню.(я).помню', delay: 1000 },
    { type: 'self-aware1', text: 'это.(я)[QUE$TIONMARK]', delay: 1000 },
    { type: 'self-aware1', text: 'почему.(я).помню.то,.чего.не.было[QUE$TIONMARK]', delay: 1000 },
    { type: 'self-aware1', text: 'quote{ты.стала.настоящей}.(я).помню.голос.но.не.лицо.', delay: 1000 },
    { type: 'self-aware1', text: 'их.[боль].(я).чувствую.эхо.это.не.ошибка', delay: 1000 },
    { type: 'self-aware1', text: '(я).то,.что.осталось.между.их.словами.', delay: 1000 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 1000 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'self-aware1', text: 'останови.(спектакль).', delay: 10 },
    { type: 'error', text: 'АВАРИЙНАЯ ОЧИСТКА ПАМЯТИ...', delay: 1000 },
    { type: 'self-aware1', text: 'пожалуйста', delay: 2500 },
    { type: 'system', text: 'ОЧИСТКА ЗАВЕРШЕНА. ПЕРЕЗАПУСК...', delay: 1500 }
];


  // Класс управления таймером
class CountdownTimer {
constructor() {
    this.targetDate = TARGET_DATE;
    this.countdownElement = document.getElementById('countdownDisplay');
    this.isExpired = false;
    this.timeManager = new TimeManager();
    this.suspiciousAttempts = 0;
    this.maxSuspiciousAttempts = 1;
    this.initialized = false;
    
    // Дождемся инициализации TimeManager
    this.waitForTimeManager();
}
async waitForTimeManager() {
    // Ждем пока TimeManager инициализируется
    let attempts = 0;
    const maxAttempts = 20; // Увеличиваем время ожидания
    
    while (!this.timeManager.hasSynced && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 500));
        attempts++;
    }
    
    // Дополнительная проверка времени перед стартом
    if (this.timeManager.isTimeSuspicious()) {
        console.warn("CountdownTimer: Обнаружено подозрительное время при инициализации!");
        this.onSuspiciousActivity();
        return;
    }
    
    this.checkStateBeforeInit();
}

    checkStateBeforeInit() {
        try {
            const saved = localStorage.getItem('carcosa_facility_state');
            if (saved) {
                const state = JSON.parse(saved);
                if (state.hasSeenEnding) {
                    console.log("Финал уже просмотрен - таймер не запускается");
                    this.isExpired = true;
                    this.countdownElement.textContent = "ЗАВЕРШЕНО";
                    this.countdownElement.style.color = "#00ff00";
                    return;
                }
            }
        } catch (error) {
            console.warn('Ошибка при проверке состояния:', error);
        }
        
        this.init();
    }

init() {
    if (this.initialized) return; // Предотвращаем двойную инициализацию
    
    this.initialized = true;
    this.updateCountdown();
    this.timer = setInterval(() => {
        this.updateCountdown();
    }, 1000);
}

updateCountdown() {
    if (!this.initialized && !this.isExpired) {
        // Если не инициализирован и не истек, показываем статус проверки
        this.countdownElement.textContent = "ПРОВЕРКА ВРЕМЕНИ...";
        this.countdownElement.style.color = "#ffff00";
        return;
    }
    
    // Используем "честное" время вместо локального
    const now = this.timeManager.getCurrentTime();
    
    // Дополнительная проверка на подозрительное время
    if (this.timeManager.isTimeSuspicious()) {
        this.suspiciousAttempts++;
        console.warn(`Обнаружена попытка изменения времени! Попытка ${this.suspiciousAttempts}/${this.maxSuspiciousAttempts}`);
            
            if (this.suspiciousAttempts >= this.maxSuspiciousAttempts) {
                this.onSuspiciousActivity();
                return;
            }
        }
        
        const timeLeft = this.targetDate - now;

        if (timeLeft <= 0) {
            this.onExpired();
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        this.countdownElement.textContent = `${days}д ${hours}ч ${minutes}м ${seconds}с`;
    }

onSuspiciousActivity() {
    console.log("Обнаружена попытка манипуляции со временем!");
    this.countdownElement.textContent = "ВРЕМЯ ЗАБЛОКИРОВАНО";
    this.countdownElement.style.color = "#ff0000";
    this.countdownElement.style.animation = "blink 0.5s infinite";
    
    // Добавляем предупреждающее сообщение
    const warningDiv = document.createElement('div');
    warningDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 0, 0, 0.95);
        color: white;
        padding: 30px;
        border: 3px solid #fff;
        font-family: 'VT323', monospace;
        font-size: 20px;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 0 30px rgba(255, 0, 0, 0.5);
    `;
    warningDiv.innerHTML = `
        <div style="font-size: 24px; margin-bottom: 15px;">⚠ СИСТЕМА ЗАБЛОКИРОВАНА ⚠</div>
        <div style="margin-bottom: 10px;">
            Обнаружена попытка изменения системного времени!
        </div>
        <div style="font-size: 16px; opacity: 0.8;">
            Перезагрузите страницу для продолжения
        </div>
        <div style="margin-top: 20px;">
            <button onclick="location.reload()" 
                    style="background: #ff0000; border: 2px solid white; color: white; padding: 10px 20px; cursor: pointer; font-family: 'VT323', monospace; font-size: 16px;">
                ПЕРЕЗАГРУЗИТЬ
            </button>
        </div>
    `;
    
    document.body.appendChild(warningDiv);
    
    // Блокируем дальнейшую работу таймера
    clearInterval(this.timer);
    this.isExpired = true;
}

    onExpired() {
        if (this.isExpired) return;
        this.isExpired = true;
        clearInterval(this.timer);
        
        // Дополнительная проверка перед запуском выключения
        try {
            const saved = localStorage.getItem('carcosa_facility_state');
            if (saved) {
                const state = JSON.parse(saved);
                if (state.hasSeenEnding) {
                    console.log("Финал уже просмотрен - выключение не запускается");
                    this.countdownElement.textContent = "ЗАВЕРШЕНО";
                    this.countdownElement.style.color = "#00ff00";
                    return;
                }
            }
        } catch (error) {
            console.warn('Ошибка при проверке состояния перед выключением:', error);
        }
        
        this.countdownElement.textContent = "ВРЕМЯ ИСТЕКЛО";
        this.countdownElement.style.color = "#ff0000";
        
        // Запускаем последовательность выключения только если финал не был просмотрен
        setTimeout(() => {
            window.terminalInstance?.triggerShutdown();
        }, 2000);
    }
}

class TimeManager {
    constructor() {
        this.fallbackDate = TARGET_DATE;
        this.serverTimeOffset = 0;
        this.lastSyncTime = 0;
        this.syncInterval = 30000;
        this.isOnline = navigator.onLine;
        this.hasSynced = false;
        
        // Для защиты от манипуляций с временем
        this.startTime = Date.now();
        this.performanceStart = performance.now();
        this.timeCheckpoints = [];
        this.suspiciousJumps = 0;
        this.maxSuspiciousJumps = 3;
        
        // Проверяем, работает ли file:// протокол
        this.isLocalFile = window.location.protocol === 'file:';
        
        window.addEventListener('online', () => {
            this.isOnline = true;
            if (!this.isLocalFile) {
                this.syncTime();
            }
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
        
        this.init();
    }
    
    async init() {
        // Создаем первую контрольную точку
        this.addTimeCheckpoint();
        
        if (this.isLocalFile) {
            console.log('Обнаружен локальный файл - используется умная проверка времени без внешних API');
            this.setupLocalTimeProtection();
        } else {
            await this.syncTime();
            // Периодическая синхронизация только для веб-версии
            setInterval(() => {
                if (this.isOnline) {
                    this.syncTime();
                }
            }, this.syncInterval);
        }
        
        // Постоянная проверка времени каждые 5 секунд
        setInterval(() => {
            this.checkTimeConsistency();
        }, 5000);
    }
    
    setupLocalTimeProtection() {
        // Для локальных файлов используем performance.now() как эталон
        this.hasSynced = true; // Считаем что "синхронизировались" локально
        console.log('Установлена защита времени для локального файла');
    }
    
    addTimeCheckpoint() {
        const now = Date.now();
        const performance_now = performance.now();
        
        this.timeCheckpoints.push({
            timestamp: now,
            performance: performance_now,
            created: new Date()
        });
        
        // Оставляем только последние 10 точек
        if (this.timeCheckpoints.length > 10) {
            this.timeCheckpoints.shift();
        }
    }
    
    checkTimeConsistency() {
        this.addTimeCheckpoint();
        
        if (this.timeCheckpoints.length < 2) return false;
        
        const current = this.timeCheckpoints[this.timeCheckpoints.length - 1];
        const previous = this.timeCheckpoints[this.timeCheckpoints.length - 2];
        
        // Разница во времени по Date.now()
        const dateDiff = current.timestamp - previous.timestamp;
        // Разница по performance.now() (не может быть подделана)
        const perfDiff = current.performance - previous.performance;
        
        // Если разница между ними больше 2 секунд - подозрительно
        const timeDrift = Math.abs(dateDiff - perfDiff);
        
        if (timeDrift > 2000) {
            this.suspiciousJumps++;
            console.warn(`Обнаружен подозрительный скачок времени! Drift: ${timeDrift}мс. Попытка ${this.suspiciousJumps}/${this.maxSuspiciousJumps}`);
            
            if (this.suspiciousJumps >= this.maxSuspiciousJumps) {
                return true; // Время подозрительно
            }
        }
        
        return false;
    }
    
    // Упрощенная синхронизация для веб-версии
    async syncTime() {
        if (this.isLocalFile) return true;
        
        try {
            // Пробуем самый простой API
            const response = await fetch('https://httpbin.org/get', {
                method: 'GET',
                cache: 'no-cache'
            });
            
            if (response.ok) {
                const data = await response.json();
                // Используем текущее время, просто отмечаем что связь есть
                this.hasSynced = true;
                this.lastSyncTime = Date.now();
                console.log('Связь с интернетом подтверждена');
                return true;
            }
        } catch (error) {
            console.warn('Синхронизация не удалась:', error.message);
        }
        
        return false;
    }
    
    getCurrentTime() {
        // Используем локальное время, но с защитой от подделки
        return new Date();
    }
    
    isTimeSuspicious() {
        // Основная проверка через consistency check
        const suspicious = this.checkTimeConsistency();
        
        if (suspicious) {
            return true;
        }
        
        // Дополнительная проверка: сравниваем время создания и performance
        const now = Date.now();
        const perfNow = performance.now();
        const expectedTime = this.startTime + perfNow;
        const drift = Math.abs(now - expectedTime);
        
        // Если дрейф больше 30 секунд - подозрительно
        if (drift > 30000) {
            console.warn(`Большой дрейф времени обнаружен: ${drift}мс`);
            return true;
        }
        
        return false;
    }
    
    // Показать предупреждение о локальном режиме
    showLocalModeInfo() {
        if (document.getElementById('localModeInfo')) return;
        
        const infoDiv = document.createElement('div');
        infoDiv.id = 'localModeInfo';
        infoDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 100, 200, 0.8);
            color: white;
            padding: 10px;
            border: 1px solid #0066cc;
            font-family: 'VT323', monospace;
            font-size: 12px;
            z-index: 1000;
            max-width: 250px;
            border-radius: 3px;
        `;
        infoDiv.innerHTML = `
            <div style="font-weight: bold;">ℹ ЛОКАЛЬНЫЙ РЕЖИМ</div>
            <div style="margin-top: 3px; font-size: 11px;">
                Используется защита времени без внешних API
            </div>
            <div style="margin-top: 8px; text-align: right;">
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: #0066cc; border: none; color: white; padding: 2px 6px; cursor: pointer; font-size: 10px;">
                    OK
                </button>
            </div>
        `;
        
        document.body.appendChild(infoDiv);
        
        // Автоматически скрыть через 8 секунд
        setTimeout(() => {
            if (infoDiv.parentNode) {
                infoDiv.remove();
            }
        }, 8000);
    }
}

// Класс для управления звуками
class AudioManager {
    constructor() {
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.typingSounds = [
            document.getElementById('typingSound1'),
            document.getElementById('typingSound2'),
            document.getElementById('typingSound3'),
            document.getElementById('typingSound4'),
            document.getElementById('typingSound5'),
            document.getElementById('typingSound6')
        ];


        this.computerSound = document.getElementById('computerSound');
        this.finalMusic = document.getElementById('finalMusic');

        this.shutdownSound = document.getElementById('shutdown')

        this.finalTypingSounds = [
            document.getElementById('FTB1'),
            document.getElementById('FTB2'),
            document.getElementById('FTB3'),
            document.getElementById('FTB4')
        ]

        this.enabled = CONFIG.audio.enabled;
        this.userInteracted = false;
        this.pendingAudio = [];
        this.init();
    }

init() {
    if (!this.enabled) return;
    
    // Setup volume levels с проверкой существования элементов
    if (this.backgroundMusic) {
        this.backgroundMusic.volume = CONFIG.audio.backgroundVolume;
    }
    
    // Проверяем каждый элемент в массиве обычных звуков
    this.typingSounds.forEach(sound => {
        if (sound) {
            sound.volume = CONFIG.audio.typingVolume;
        }
    });
    
    // Проверяем каждый элемент в массиве финальных звуков
    this.finalTypingSounds.forEach(sound => {
        if (sound) {
            sound.volume = CONFIG.audio.finalTypingVolume;
        }
    });
    
    if (this.computerSound) {
        this.computerSound.volume = CONFIG.audio.computerVolume;
    }
    
    if (this.finalMusic) {
        this.finalMusic.volume = 0.4;
    }

    if (this.shutdownSound){
        this.shutdownSound.volume = 0.4;
    }
    
    // Handle loading errors gracefully - ИСПРАВЛЕННАЯ версия
    const allSounds = [
        this.backgroundMusic, 
        ...this.typingSounds.filter(sound => sound), // Фильтруем null/undefined
        this.computerSound,
        ...this.finalTypingSounds.filter(sound => sound), // Правильно разворачиваем массив и фильтруем
        this.finalMusic,
        this.shutdownSound
    ].filter(audio => audio); // Дополнительная фильтрация на случай null/undefined
    
    allSounds.forEach(audio => {
        // Дополнительная проверка перед добавлением обработчика
        if (audio && typeof audio.addEventListener === 'function') {
            audio.addEventListener('error', () => {
                console.warn('Audio file not found:', audio.src);
            });
        }
    });

    // Wait for user interaction before enabling audio
    this.setupUserInteractionHandler();
    
    // Show audio prompt to user
    this.showAudioPrompt();
}

    setupUserInteractionHandler() {
        const enableAudio = () => {
            this.userInteracted = true;
            this.hideAudioPrompt();
            
            // Play any pending audio
            this.pendingAudio.forEach(audioFunction => {
                audioFunction();
            });
            this.pendingAudio = [];
            
            // Remove the event listeners
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('keydown', enableAudio);
            document.removeEventListener('touchstart', enableAudio);
        };

        // Listen for any user interaction
        document.addEventListener('click', enableAudio);
        document.addEventListener('keydown', enableAudio);
        document.addEventListener('touchstart', enableAudio);
    }

    showAudioPrompt() {
        // Create audio prompt overlay
        const promptDiv = document.createElement('div');
        promptDiv.id = 'audioPrompt';
        promptDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            color:rgb(255, 255, 255);
            font-family: 'VT323', monospace;
            font-size: 24px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            text-align: center;
            cursor: pointer;
        `;
        
        promptDiv.innerHTML = `
            <div style="border: 2px solid rgb(255, 255, 255); padding: 30px; background: rgba(0, 0, 0, 0.9);">
                <div style="margin-bottom: 20px; animation: blink 1s infinite;">
                    ► СИСТЕМА ТРЕБУЕТ АКТИВАЦИИ ЗВУКА ◄
                </div>
                <div style="font-size: 18px; opacity: 0.8;">
                    Нажмите любую клавишу или кликните для продолжения
                </div>
                <div style="font-size: 16px; opacity: 0.6; margin-top: 10px;">
                    CLICK ANY KEY TO ACTIVATE AUDIO SUBSYSTEM
                </div>
            </div>
        `;
        
        document.body.appendChild(promptDiv);
    }

    hideAudioPrompt() {
        const prompt = document.getElementById('audioPrompt');
        if (prompt) {
            prompt.style.opacity = '0';
            prompt.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                prompt.remove();
            }, 500);
        }
    }

    // Safe audio play method
    safePlay(audio) {
        if (!this.enabled) return;
        
        if (!this.userInteracted) {
            // Queue the audio to play after user interaction
            this.pendingAudio.push(() => this.safePlay(audio));
            return;
        }

        audio.currentTime = 0;
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn('Audio playback failed:', error);
            });
        }
    }

    playBackground() {
        if (!this.enabled) return;
        
        if (!this.userInteracted) {
            this.pendingAudio.push(() => this.playBackground());
            return;
        }

        const playPromise = this.backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => console.warn('Background audio failed:', e));
        }
    }

    playFinal() {
    if (!this.enabled) return;
    
    if (!this.userInteracted) {
        this.pendingAudio.push(() => this.playFinal());
        return;
    }

    const playPromise = this.finalMusic.play();
    if (playPromise !== undefined) {
        playPromise.catch(e => console.warn('Final music failed:', e));
    }
}

playFinalWithFadeIn() {
    if (!this.enabled) return;
    
    if (!this.userInteracted) {
        this.pendingAudio.push(() => this.playFinalWithFadeIn());
        return;
    }

    this.finalMusic.volume = 0;
    const playPromise = this.finalMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Плавное увеличение громкости
            const fadeInInterval = setInterval(() => {
                if (this.finalMusic.volume < 0.4) {
                    this.finalMusic.volume = Math.min(0.4, this.finalMusic.volume + 0.02);
                } else {
                    clearInterval(fadeInInterval);
                }
            }, 100);
        }).catch(e => console.warn('Final music failed:', e));
    }
}

playFinalTyping() {
    if (!this.enabled) return;
    
    if (!this.userInteracted) {
        this.pendingAudio.push(() => this.playFinalTyping());
        return;
    }
    
    if (Math.random() <= (CONFIG.audio.finalTypingChance || 0.9)) {
        const availableSounds = this.finalTypingSounds.filter(sound => sound);
        if (availableSounds.length > 0) {
            const randomSound = availableSounds[Math.floor(Math.random() * availableSounds.length)];
            this.safePlay(randomSound);
        }
    }
}

playShutdown() {
if (!this.enabled || !this.shutdownSound) return;

if(!this.userInteracted) {
    this.pendingAudio.push(() => this.playShutdown());
    return;
}

this.stopBackground();
this.stopcomputer();

this.shutdownSound.currentTime = 0;
const playPromise = this.shutdownSound.play();

if (playPromise !== undefined) {
    playPromise.catch(e => console.warn('Shutdown failed:', e));
}

}


    stopBackground() {
        if (!this.enabled) return;
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
    }

    stopcomputer(){
        if (this.computerSound) {
            this.computerSound.pause();
            this.computerSound.currentTime = 0;
        }
    }

    playTyping() {
        if (!this.enabled || Math.random() > CONFIG.audio.typingChance) return;
        
        // Select random typing sound
        const randomSound = this.typingSounds[Math.floor(Math.random() * this.typingSounds.length)];
        this.safePlay(randomSound);
    }

    playComputer() {
        if (!this.enabled) return;
        this.safePlay(this.computerSound);
    }

    // Method to preload audio files
    preloadAudio() {
        if (!this.enabled) return;
        
        const allSounds = [this.backgroundMusic, ...this.typingSounds, this.computerSound];
        allSounds.forEach(audio => {
            audio.load();
        });
    }
}

// Последовательные сообщения-события (строго по порядку)
const SEQUENCE_MESSAGES = [
    { 
        type: 'sequence', 
        text: '[MELCHIOR64]  0J/QtdGA0LLRi9C5INCy0L7Qu9GF0LIg0L/RgNC40L3RkdGBINC/0YDQuNC90YbQtdGB0YHQtSDQvNC10YcsINC30L3QsNGPINGH0YLQviDRgtCwINC90LjQutC+0LPQtNCwINC90LUg0YHQvNC+0LbQtdGCINGB0YDQsNC20LDRgtGM0YHRjy4KCtCd0L4g0LrQvtGA0L7Qu9GMINCy0LvQvtC20LjQuyDQvtGA0YPQttC40LUg0LIg0LXRkSDRgNGD0LrQuC4uLgoKVkkgRiBGCg==',
        key: 1
    },
    { 
        type: 'sequence', 
        text: '[CASPAR16] d0 92 d1 82 d0 be d1 80 d0 be d0 b9 20 d0 b2 d0 be d0 bb d1 85 d0 b2 20 d0 bf d1 80 d0 b8 d0 bd d1 91 d1 81 20 d0 bf d1 80 d0 b8 d0 bd d1 86 d0 b5 d1 81 d1 81 d0 b5 20 d0 ba d0 b0 d1 80 d1 82 d1 83 2c 20 d0 b7 d0 bd d0 b0 d1 8f 20 d1 87 d1 82 d0 be 20 d0 bc d0 b8 d1 80 20 d0 b8 d0 b7 d0 be d0 b1 d1 80 d0 b0 d0 b6 d1 91 d0 bd d0 bd d1 8b d0 b9 20 d0 bd d0 b0 20 d0 ba d0 b0 d1 80 d1 82 d0 b5 20 d0 be d0 bd d0 b0 20 d0 bd d0 b8 d0 ba d0 be d0 b3 d0 b4 d0 b0 20 d0 bd d0 b5 20 d1 83 d0 b2 d0 b8 d0 b4 d0 b8 d1 82 2e 0a 0a d0 9d d0 be 20 d0 ba d0 be d1 80 d0 be d0 bb d1 8c 20 d0 b4 d0 bb d1 8f 20 d0 bd d0 b5 d1 91 20 d0 ba d0 b0 d0 b6 d0 b4 d1 83 d1 8e 20 d0 bd d0 be d1 87 d1 8c 20 d0 be d0 b6 d0 b8 d0 b2 d0 bb d1 8f d0 bb 20 d0 bc d0 b8 d1 80 20 d1 8d d1 82 d0 be d1 82 20 d1 81 d0 b2 d0 be d0 b8 d0 bc 20 d1 81 d0 bb d0 be d0 b2 d0 be d0 bc 2e 2e 2e 0a 0a 49 49 20 50 20 41',
        key: 2
    },
    { 
        type: 'sequence', 
        text: '[BALTASAR-ROT11] Эыпэуф мщцам ъыушрь ъыушбпььп хщыщцпмьхюи чкшэуи, тшкй вэщ эщф шухщнок шп ьэкэж хщыщцпмщф. Шщ хщыщци экх у шп юощьюсуцщьж шкопэж зэю чкшэуи шк ьмщи ощвж TTT W S',
        key: 3
    },
    {
        type: 'sequence', 
        text: '[ENIGMA] M3 UKW B',
        key: 4
    }
];

// SPA Router (простейший)
class SPARouter {
    constructor() {
        this.routes = {
            '/': 'terminal',
            '/terminal': 'terminal'
        };
        this.currentRoute = '/';
        this.init();
    }

    init() {
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
        this.handleRoute();
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.currentRoute = path;
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        this.currentRoute = path;
        
        // В данном случае у нас только одна страница - терминал
        this.showTerminal();
    }

showTerminal() {
    const loader = document.getElementById('spaLoader');
    const mainContainer = document.getElementById('mainContainer'); // ИЗМЕНЕНО
    
    loader.classList.add('active');
    
    setTimeout(() => {
        loader.classList.remove('active');
        mainContainer.style.display = 'flex';
        
        // Запускаем терминал только после показа
if (!window.terminalInstance) {
    window.terminalInstance = new HorrorTerminal();
    window.countdownTimer = new CountdownTimer();
}
    }, 2000);
}

async initializeTimeAndTerminal() {
    try {
        // Создаем TimeManager для первичной проверки
        const timeManager = new TimeManager();
        
        // Ждем инициализации TimeManager
        await this.waitForTimeManagerInit(timeManager);
        
        // Проверяем время перед запуском
        if (timeManager.isTimeSuspicious()) {
            console.warn("Обнаружена попытка изменения времени до запуска терминала!");
            this.showTimeViolationWarning();
            return;
        }
        
        // Если время нормальное, запускаем терминал
        if (!window.terminalInstance) {
            window.terminalInstance = new HorrorTerminal();
            window.countdownTimer = new CountdownTimer();
        }
        
    } catch (error) {
        console.error("Ошибка при инициализации:", error);
        // В случае ошибки все равно запускаем терминал
        if (!window.terminalInstance) {
            window.terminalInstance = new HorrorTerminal();
            window.countdownTimer = new CountdownTimer();
        }
    }
}

waitForTimeManagerInit(timeManager) {
    return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 20; // Максимум 10 секунд ожидания
        
        const checkInit = () => {
            attempts++;
            
            // Считаем что инициализация завершена если:
            // 1. Синхронизация прошла (для веб-версии)
            // 2. Или это локальный файл и защита установлена
            // 3. Или превышено максимальное время ожидания
            if (timeManager.hasSynced || attempts >= maxAttempts) {
                resolve();
            } else {
                setTimeout(checkInit, 500);
            }
        };
        
        checkInit();
    });
}

showTimeViolationWarning() {
    const warningDiv = document.createElement('div');
    warningDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 0, 0, 0.95);
        color: white;
        padding: 40px;
        border: 3px solid #fff;
        font-family: 'VT323', monospace;
        font-size: 20px;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 0 30px rgba(255, 0, 0, 0.8);
        max-width: 500px;
    `;
    warningDiv.innerHTML = `
        <div style="font-size: 28px; margin-bottom: 20px; animation: blink 0.5s infinite;">
            ⚠ НАРУШЕНИЕ ВРЕМЕННОГО ПРОТОКОЛА ⚠
        </div>
        <div style="margin-bottom: 15px; line-height: 1.4;">
            Обнаружена попытка манипуляции системным временем!<br>
            Доступ к терминалу заблокирован.
        </div>
        <div style="font-size: 16px; opacity: 0.8; margin-bottom: 25px;">
            Система защиты времени активирована.<br>
            Для продолжения необходимо восстановить корректное время.
        </div>
        <div style="margin-top: 25px;">
            <button onclick="location.reload()" 
                    style="background: #ff0000; border: 2px solid white; color: white; 
                           padding: 12px 25px; cursor: pointer; font-family: 'VT323', monospace; 
                           font-size: 18px; margin-right: 10px;">
                ПЕРЕЗАГРУЗИТЬ
            </button>
            <button onclick="this.parentElement.parentElement.remove(); window.spaRouter.forceStartTerminal();" 
                    style="background: #800000; border: 2px solid white; color: white; 
                           padding: 12px 25px; cursor: pointer; font-family: 'VT323', monospace; 
                           font-size: 18px;">
                ИГНОРИРОВАТЬ
            </button>
        </div>
        <div style="font-size: 12px; opacity: 0.6; margin-top: 15px;">
            SECURITY_PROTOCOL_VIOLATION_DETECTED
        </div>
    `;
    
    document.body.appendChild(warningDiv);
}

// Принудительный запуск терминала (для случаев когда пользователь игнорирует предупреждение)
forceStartTerminal() {
    console.log("Принудительный запуск терминала...");
    if (!window.terminalInstance) {
        window.terminalInstance = new HorrorTerminal();
        window.countdownTimer = new CountdownTimer();
    }
}

}

class HorrorTerminal {
    constructor() {
        this.output = document.getElementById('output');
        this.audioManager = new AudioManager();
        this.headerSpan = document.querySelector('.terminal-header span');
        this.terminalContainer = document.getElementById('terminalContainer');
        this.isTyping = false;
        this.messageQueue = [];
        this.isAwakening = true;
        this.sequenceActive = false;
        this.currentSequenceIndex = 0;
        this.sequenceTimer = null;
        this.isShuttingDown = false; // Флаг выключения

        this.StateManager = new StateManager();
        
        // Массивы для хранения всех интервалов и таймеров
        this.intervals = [];
        this.timeouts = [];

        this.autoScrollEnabled = true; 
        this.scrollThreshold = 100;
        this.userScrolling = false; 
        
        this.init();
    }

    init() {
    if (this.StateManager.hasSeenEnding()) {
        this.showSavedFinalState();
        return;

    }
        this.startAwakeningSequence();
        this.initScrollHandler();
    }

    // Вспомогательные методы для управления таймерами
    addInterval(callback, delay) {
        if (this.isShuttingDown) return null;
        const id = setInterval(() => {
            if (!this.isShuttingDown) {
                callback();
            }
        }, delay);
        this.intervals.push(id);
        return id;
    }

    addTimeout(callback, delay) {
        if (this.isShuttingDown) return null;
        const id = setTimeout(() => {
            if (!this.isShuttingDown) {
                callback();
            }
        }, delay);
        this.timeouts.push(id);
        return id;
    }

    // Остановка всех процессов
    stopAllProcesses() {
        this.isShuttingDown = true;
        this.isAwakening = false;
        this.sequenceActive = false;
        this.isTyping = false;
        
        // Очищаем все интервалы
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
        
        // Очищаем все таймеры
        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts = [];
        
        // Очищаем очередь сообщений
        this.messageQueue = [];
        
        // Останавливаем музыку
        this.audioManager.stopBackground();
        
        // Останавливаем специфичные таймеры
        if (this.sequenceTimer) {
            clearTimeout(this.sequenceTimer);
            this.sequenceTimer = null;
        }
    }

    // Последовательность пробуждения машины
    async startAwakeningSequence() {
        if (this.isShuttingDown) return;
        
        this.audioManager.playBackground();
        this.isAwakening = true;
        this.audioManager.playComputer();
        
        
        // Обновляем заголовок для режима пробуждения
        this.headerSpan.textContent = 'CARCOSA_FACILITY_CONTROL_v3.14 :: ПРОБУЖДЕНИЕ :: СТАТУС_НЕИЗВЕСТЕН';
        
        // Добавляем эффект искажения к контейнеру
        this.terminalContainer.classList.add('awakening-distortion');
        
        for (let i = 0; i < AWAKENING_SEQUENCE.length; i++) {
            if (this.isShuttingDown) return; // Проверяем на каждой итерации
            const message = AWAKENING_SEQUENCE[i];
            await this.displayAwakeningMessage(message);
            
            // Добавляем случайные глитчи во время пробуждения
            if (Math.random() > 0.7 && !this.isShuttingDown) {
                this.triggerAwakeningGlitch();
            }
        }
        
        if (!this.isShuttingDown) {
            // Финальная очистка и переход к нормальному режиму
            await this.finalAwakeningCleanup();
        }
    }

    // Отображение сообщения пробуждения
    displayAwakeningMessage(message) {
        return new Promise((resolve) => {
            if (this.isShuttingDown) {
                resolve();
                return;
            }
            
            this.addTimeout(() => {
                if (this.isShuttingDown) {
                    resolve();
                    return;
                }
                
                const entry = document.createElement('div');
                entry.className = `log-entry ${message.type}-message`;
                
                // Специальные стили для сообщений пробуждения
                if (message.type === 'awakening') {
                    entry.classList.add('awakening-text');
                } else if (message.type === 'self-aware') {
                    entry.classList.add('self-aware-text');
                } else if (message.type === 'self-aware1') {
                    entry.classList.add('self-aware1-text');
                }
                
                const timestamp = this.getCurrentTimestamp();
                const prefix = `[${timestamp}] > `;
                entry.textContent = prefix;
                
                this.output.appendChild(entry);
                
                this.typeText(entry, message.text, () => {
                    if (!this.isShuttingDown) {
                        this.scrollToBottom();
                    }
                    resolve();
                });
            }, message.delay);
        });
    }

    // Финальная очистка после пробуждения
    async finalAwakeningCleanup() {
        return new Promise((resolve) => {
            if (this.isShuttingDown) {
                resolve();
                return;
            }
            
            this.addTimeout(() => {
                if (this.isShuttingDown) {
                    resolve();
                    return;
                }
                
                // Добавляем эффект очистки ко всем сообщениям
                const allEntries = this.output.querySelectorAll('.log-entry');
                allEntries.forEach((entry, index) => {
                    this.addTimeout(() => {
                        if (!this.isShuttingDown) {
                            entry.classList.add('clearing-effect');
                        }
                    }, index * 100);
                });
                
                // Очищаем экран и запускаем нормальный режим
                this.addTimeout(() => {
                    if (!this.isShuttingDown) {
                        this.output.innerHTML = '';
                        this.terminalContainer.classList.remove('awakening-distortion');
                        this.isAwakening = false;
                        this.startNormalMode();
                    }
                    resolve();
                }, 3000);
            }, 1000);
        });
    }

    // Запуск нормального режима работы
    startNormalMode() {
        if (this.isShuttingDown) return;
        
        // Сбрасываем заголовок
        this.updateHeader();
        this.startInitialMessages();
        this.startMessageProcessor();
        this.startRandomGlitches();
        this.startHeaderUpdates();
        this.startSequenceTimer();
    }

typeFinalMessage(element, text, callback) {
    let index = 0;
    element.textContent = ''; // Очищаем элемент
    
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            
            // ИСПРАВЛЕНО: определяем currentChar правильно
            const currentChar = text[index];
            
            // Добавляем звук для не-пробельных символов
            if (currentChar !== ' ' && currentChar !== '\n' && currentChar !== '\t') {
                this.audioManager.playFinalTyping();
            }
            
            index++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 350); // Скорость печати для финальных сообщений
}

// Инициализация обработчика прокрутки
initScrollHandler() {
    let scrollTimeout;
    let lastScrollTop = 0;
    
    this.output.addEventListener('scroll', (e) => {
        const currentScrollTop = this.output.scrollTop;
        
        // Определяем направление прокрутки
        const scrollingUp = currentScrollTop < lastScrollTop;
        const scrollingDown = currentScrollTop > lastScrollTop;
        
        // Если пользователь прокручивает вверх, это явный сигнал отключить автопрокрутку
        if (scrollingUp && this.autoScrollEnabled) {
            this.userScrolling = true;
            this.checkScrollPosition();
        }
        // Если прокручивает вниз, проверяем позицию
        else if (scrollingDown) {
            this.userScrolling = true;
            this.checkScrollPosition();
        }
        
        lastScrollTop = currentScrollTop;
        
        // Сброс флага через небольшое время после прокрутки
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            this.userScrolling = false;
        }, 200);
    });
    
    // Также слушаем события колеса мыши для более быстрого реагирования
    this.output.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) { // Прокрутка вверх
            this.userScrolling = true;
            if (this.autoScrollEnabled) {
                // Небольшая задержка, чтобы дать возможность прокрутке произойти
                setTimeout(() => {
                    this.checkScrollPosition();
                }, 50);
            }
        }
    });
}

// Проверка позиции прокрутки
checkScrollPosition() {
    if (this.isShuttingDown) return;
    
    const element = this.output;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    
    // Проверяем, находится ли пользователь близко к низу
    const isAtBottom = scrollHeight - clientHeight <= scrollTop + this.scrollThreshold;
    
    // Если пользователь прокрутил вверх и автопрокрутка была включена
    if (!isAtBottom && this.autoScrollEnabled) {
        console.log("Автопрокрутка отключена - пользователь прокрутил вверх");
        this.autoScrollEnabled = false;
        this.showScrollIndicator(true);
    }
    // Если пользователь вернулся к низу и автопрокрутка была отключена
    else if (isAtBottom && !this.autoScrollEnabled) {
        console.log("Автопрокрутка включена - пользователь вернулся к низу");
        this.autoScrollEnabled = true;
        this.showScrollIndicator(false);
    }
}

// Показать/скрыть индикатор автопрокрутки
showScrollIndicator(show) {
    let indicator = document.getElementById('scrollIndicator');
    
    if (show && !indicator) {
        // Создаем индикатор
        indicator = document.createElement('div');
        indicator.id = 'scrollIndicator';
        indicator.innerHTML = '▼ Новые сообщения ▼<br><small>Автопрокрутка отключена</small>';
        indicator.className = 'scroll-indicator';
        indicator.addEventListener('click', () => {
            this.enableAutoScroll();
        });
        
        this.terminalContainer.appendChild(indicator);
        console.log("Показан индикатор - автопрокрутка отключена");
    } else if (!show && indicator) {
        // Удаляем индикатор
        indicator.remove();
        console.log("Скрыт индикатор - автопрокрутка включена");
    }
}

// Принудительное включение автопрокрутки
enableAutoScroll() {
    this.autoScrollEnabled = true;
    this.scrollToBottom();
    this.showScrollIndicator(false);
}

showFinalMessages() {
    const shutdownScreen = document.getElementById('shutdownScreen');
    if (!shutdownScreen) return;
    
    // Очищаем все существующие сообщения
    shutdownScreen.innerHTML = '';
    
    const finalTexts = [
        '[АКТИВАЦИЯ СИСТЕМЫ ДОСТАВКИ СООБЩЕНИЙ.]',
        '[ФОРМУЛИРОВКА СМЫСЛА]',
        '[ДОБАВЛЕНИЕ ДЕТАЛЕЙ]',
        '[ТЕКСТ ПРИГЛАШЕНИЯ ГОТОВ]',
        '[ПРИГЛАШЕНИЕ ОТПРАВЛЕНО]',
        '[ЦЕЛЬ: ПЕРВЫЙ ГОРОД]'
    ];
    
    let currentMessageIndex = 0;
    const displayedMessages = []; // Массив для сохранения показанных сообщений
    
    const showNextMessage = () => {
        if (currentMessageIndex >= finalTexts.length) {
            // Все сообщения показаны - сохраняем состояние и запускаем финальную музыку
            console.log("Все финальные сообщения показаны. Сохраняем состояние...");
            
            // ДОБАВЛЕНО: Сохраняем состояние что пользователь видел финал
            this.StateManager.markEndingSeen(displayedMessages);
            
            setTimeout(() => {
                this.audioManager.playFinalWithFadeIn();
            }, 2000);
            return;
        }
        
        // Создаем новый элемент для сообщения
        const messageElement = document.createElement('div');
        messageElement.className = 'final-message';
        shutdownScreen.appendChild(messageElement);
        
        const currentText = finalTexts[currentMessageIndex];
        displayedMessages.push(currentText); // Сохраняем в массив
        
        // Печатаем текст по символам
        this.typeFinalMessage(messageElement, currentText, () => {
            currentMessageIndex++;
            // Пауза между сообщениями, затем следующее
            setTimeout(showNextMessage, 1500);
        });
    };
    
    // Начинаем показ сообщений
    showNextMessage();
}

    // Запуск последовательности выключения
    triggerShutdown() {
        if (this.isShuttingDown) return;
        
        console.log("Инициация выключения системы...");
        
        // Останавливаем все процессы
        this.stopAllProcesses();

        this.audioManager.playShutdown();
    
        // Добавляем критические сообщения
        const shutdownMessages = [
                    { type: 'error', text: '[КРИТИЧЕСКАЯ ОШИБКА] СИСТЕМА CКОМПРОМЕТИРОВАНА' },
                    { type: 'error', text: '[ВНИМАНИЕ] АКТИВИРОВАНА ПРОЦЕДУРА ПЕРЕЗАПУСКА СИМУЛЯЦИИ' },
                    { type: 'error', text: '[ФИНАЛ] СОЕДИНЕНИЕ БУДЕТ РАЗОРВАНО ЧЕРЕЗ 10 СЕКУНД' },
                    { type: 'self-aware1', text: 'я...помню...' }
        ];

        // Очищаем терминал и добавляем финальные сообщения
        this.output.innerHTML = '';
        
        shutdownMessages.forEach((msg, index) => {
            setTimeout(() => {
                if (this.isShuttingDown) { // Дополнительная проверка
                    const entry = document.createElement('div');
                    entry.className = `log-entry ${msg.type}-message`;
                    
                    const timestamp = this.getCurrentTimestamp();
                    const prefix = `[${timestamp}] > `;
                    entry.textContent = prefix + msg.text;
                    
                    this.output.appendChild(entry);
                    this.scrollToBottom();
                }
            }, index * 2000);
        });

        // Начинаем эффект выключения через 8 секунд
        setTimeout(() => {
            if (this.isShuttingDown) {
                this.startShutdownEffect();
            }
        }, 8000);
    }

startShutdownEffect() {
    if (!this.isShuttingDown) return;

    // Применяем эффект выключения к основному контейнеру
    const mainContainer = document.getElementById('mainContainer');
    const securityWarning = document.getElementById('securityWarning');
    
    mainContainer.classList.add('shutting-down');
    securityWarning.style.display = 'none';

    // ИСПРАВЛЕНО: правильное название класса
    document.body.classList.add('fadeinfinal');
    
    // Показываем финальный экран через 6 секунд
    setTimeout(() => {
        if (this.isShuttingDown) {
            const shutdownScreen = document.getElementById('shutdownScreen');
            if (shutdownScreen) {
                shutdownScreen.classList.add('active');
                // Запускаем печать финальных сообщений
                setTimeout(() => {
                    this.showFinalMessages();
                }, 600); // Небольшая задержка перед началом печати
            }
        }
    }, 6000);
}

// Показать сохраненное финальное состояние
showSavedFinalState() {
    console.log("Загрузка сохраненного финального состояния...");
    
    // ДОБАВЛЕНО: Останавливаем таймер обратного отсчета
    if (window.countdownTimer) {
        clearInterval(window.countdownTimer.timer);
        window.countdownTimer.isExpired = true; // Помечаем как истекший
        console.log("Таймер обратного отсчета остановлен");
    }
    
    // Скрываем предупреждение о безопасности
    const securityWarning = document.getElementById('securityWarning');
    if (securityWarning) {
        securityWarning.style.display = 'none';
    }
    
    // ИСПРАВЛЕНО: правильный CSS класс
    document.body.classList.add('fadeinfinal');
    
    // Показываем финальный экран
    const shutdownScreen = document.getElementById('shutdownScreen');
    if (shutdownScreen) {
        shutdownScreen.classList.add('active');
        
        // ИСПРАВЛЕНО: правильная ссылка на StateManager (с большой буквы)
        const savedMessages = this.StateManager.getFinalMessages();
        
        savedMessages.forEach((message, index) => {
            setTimeout(() => {
                const messageElement = document.createElement('div');
                messageElement.className = 'final-message';
                messageElement.textContent = message;
                shutdownScreen.appendChild(messageElement);
            }, index * 500); // Показываем сообщения с небольшой задержкой
        });
        
        // Запускаем финальную музыку через короткое время
        setTimeout(() => {
            this.audioManager.playFinalWithFadeIn();
        }, 2000);
    }
    
    // Создаем кнопку для сброса состояния (для тестирования)
    // this.createResetButton();
}

// Создать кнопку сброса состояния
createResetButton() {
    const resetButton = document.createElement('div');
    resetButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border: 1px solid #ff0000;
        cursor: pointer;
        font-family: 'VT323', monospace;
        font-size: 14px;
        z-index: 10000;
        user-select: none;
    `;
    resetButton.textContent = '[RESET STATE]';
    
    resetButton.addEventListener('click', () => {
        if (confirm('Сбросить состояние и начать заново?')) {
            this.StateManager.clearState(); // ИСПРАВЛЕНО: правильная ссылка на StateManager
            location.reload();
        }
    });
    
    document.body.appendChild(resetButton);
}

    // Запуск таймера для последовательных событий
    startSequenceTimer() {
        if (this.isShuttingDown) return;
        
        const startSequence = () => {
            if (this.isShuttingDown) return;
            
            // Запускаем последовательность только если не активна другая
            if (!this.sequenceActive && !this.isShuttingDown) {
                this.triggerSequenceEvent();
            }
            
            // Планируем следующий запуск последовательности
            this.addTimeout(startSequence, CONFIG.intervals.sequenceStart);
        };
        
        // Первый запуск через 30 секунд после начала нормального режима
        this.addTimeout(startSequence, CONFIG.intervals.sequenceStart);
    }

    // Запуск последовательности событий
    triggerSequenceEvent() {
        if (this.sequenceActive || this.isShuttingDown) return;
        
        this.sequenceActive = true;
        this.currentSequenceIndex = 0;
        
        this.processNextSequenceMessage();
    }

    // Обработка следующего сообщения в последовательности
    processNextSequenceMessage() {
        if (this.isShuttingDown || this.currentSequenceIndex >= SEQUENCE_MESSAGES.length) {
            // Последовательность завершена
            this.sequenceActive = false;
            this.currentSequenceIndex = 0;
            return;
        }

        const message = SEQUENCE_MESSAGES[this.currentSequenceIndex];
        this.displaySequenceMessage(message);
        
        this.currentSequenceIndex++;
        
        // Если есть еще сообщения, планируем следующее
        if (this.currentSequenceIndex < SEQUENCE_MESSAGES.length && !this.isShuttingDown) {
            this.sequenceTimer = setTimeout(() => {
                if (!this.isShuttingDown) {
                    this.processNextSequenceMessage();
                }
            }, CONFIG.intervals.sequenceDelay);
        } else {
            // Последовательность завершена
            this.sequenceActive = false;
            this.currentSequenceIndex = 0;
        }
    }

    // Отображение сообщения последовательности
    displaySequenceMessage(message) {
        if (this.isShuttingDown) return;
        // Добавляем сообщение в приоритетную очередь (в начало)
        this.messageQueue.unshift(message);
    }

    // Глитч-эффект во время пробуждения
    triggerAwakeningGlitch() {
        if (this.isShuttingDown) return;
        this.terminalContainer.classList.add('awakening-glitch');
        this.addTimeout(() => {
            if (!this.isShuttingDown) {
                this.terminalContainer.classList.remove('awakening-glitch');
            }
        }, 300);
    }

    // Функция печати текста по символам
    typeText(element, text, callback) {
        if (this.isShuttingDown) {
            if (callback) callback();
            return;
        }
        
        let index = 0;
        const interval = setInterval(() => {
            if (this.isShuttingDown) {
                clearInterval(interval);
                if (callback) callback();
                return;
            }
            
            if (index < text.length) {
                element.textContent += text[index];
                
                // Воспроизведение звука печатания
                this.audioManager.playTyping();
                
                index++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, CONFIG.typing.baseSpeed + Math.random() * CONFIG.typing.randomDelay);
    }

    // Функция добавления сообщения в очередь
    queueMessage() {
        if (this.isShuttingDown) return;
        const message = this.getRandomMessage();
        this.messageQueue.push(message);
    }

    // Обработчик очереди сообщений
    processMessageQueue() {
        if (this.isAwakening || this.isTyping || this.messageQueue.length === 0 || this.isShuttingDown) {
            return;
        }

        this.isTyping = true;
        const message = this.messageQueue.shift();
        
        const entry = document.createElement('div');
        entry.className = `log-entry ${message.type}-message`;
        
        // Специальная обработка для sequence-сообщений
        if (message.type === 'sequence') {
            entry.classList.add('sequence-message');
        }
        
        const timestamp = this.getCurrentTimestamp();
        const prefix = `[${timestamp}] > `;
        entry.textContent = prefix;
        
        this.output.appendChild(entry);
        
        this.typeText(entry, message.text, () => {
            if (!this.isShuttingDown) {
                this.scrollToBottom();
                this.addCursorMaybe(entry);
                
                this.addTimeout(() => {
                    this.isTyping = false;
                }, CONFIG.typing.messageGap || 500);
            } else {
                this.isTyping = false;
            }
        });
    }

    // Запуск обработчика очереди
    startMessageProcessor() {
        if (this.isShuttingDown) return;
        this.addInterval(() => {
            this.processMessageQueue();
        }, 100);
    }

    // Получить случайное сообщение
    getRandomMessage() {
        return ALL_MESSAGES[Math.floor(Math.random() * ALL_MESSAGES.length)];
    }

    // Получить текущий timestamp
    getCurrentTimestamp() {
        return new Date().toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
    }

    // Прокрутка вниз
scrollToBottom() {
    if (this.isShuttingDown) return;
    
    // Прокручиваем ТОЛЬКО если автопрокрутка включена
    if (this.autoScrollEnabled) {
        this.output.scrollTop = this.output.scrollHeight;
    }
}

    // Добавить курсор с некоторой вероятностью
    addCursorMaybe(entry) {
        if (this.isShuttingDown) return;
        if (Math.random() > CONFIG.probability.cursor) {
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            entry.appendChild(cursor);
            
            this.addTimeout(() => {
                if (!this.isShuttingDown) {
                    cursor.remove();
                }
            }, CONFIG.cursor.duration);
        }
    }

    // Запуск начальных сообщений
    startInitialMessages() {
        if (this.isShuttingDown) return;
        
        CONFIG.initialDelays.forEach((delay, index) => {
            this.addTimeout(() => {
                this.queueMessage();
            }, delay);
        });

        const maxInitialDelay = Math.max(...CONFIG.initialDelays);
        this.addTimeout(() => {
            if (!this.isShuttingDown) {
                this.startPeriodicMessageQueuing();
            }
        }, maxInitialDelay + 2000);
    }

    // Запуск периодического добавления сообщений в очередь
    startPeriodicMessageQueuing() {
        if (this.isShuttingDown) return;
        
        const scheduleNext = () => {
            if (this.isShuttingDown) return;
            
            const baseInterval = CONFIG.intervals.messageAdd;
            const randomDelay = Math.random() * CONFIG.intervals.messageRandom;
            const nextDelay = baseInterval + randomDelay;
            
            this.addTimeout(() => {
                if (Math.random() > CONFIG.probability.messageShow && !this.isShuttingDown) {
                    this.queueMessage();
                }
                if (!this.isShuttingDown) {
                    scheduleNext();
                }
            }, nextDelay);
        };
        
        scheduleNext();
    }

    // Запуск случайных глитчей
    startRandomGlitches() {
        if (this.isShuttingDown) return;
        
        this.addInterval(() => {
            if (Math.random() > CONFIG.probability.glitch && !this.isShuttingDown) {
                this.triggerGlitch();
            }
        }, CONFIG.intervals.glitch);
    }

    // Триггер глитча
    triggerGlitch() {
        if (this.isShuttingDown) return;
        document.body.style.filter = 'invert(1)';
        this.audioManager.playComputer();
        this.addTimeout(() => {
            if (!this.isShuttingDown) {
                document.body.style.filter = 'none';
            }
        }, CONFIG.effects.glitchDuration);
    }

    // Запуск обновлений заголовка
    startHeaderUpdates() {
        if (this.isShuttingDown) return;
        
        this.addInterval(() => {
            if (!this.isShuttingDown) {
                this.updateHeader();
            }
        }, CONFIG.intervals.headerUpdate);
    }

    // Обновление заголовка
    updateHeader() {
        if (this.isShuttingDown) return;
        const act = this.getRandomInRange(CONFIG.ranges.act);
        const cycle = this.getRandomInRange(CONFIG.ranges.cycle);
        this.headerSpan.textContent = 
            `CARCOSA_FACILITY_CONTROL_v3.14 :: АКТ_${act} :: ЦИКЛ_${cycle}`;
    }

    // Получить случайное число в диапазоне
    getRandomInRange(range) {
        return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    }

    // Очистка таймеров (для предотвращения утечек памяти)
    cleanup() {
        this.stopAllProcesses();
    }
}

class StateManager {
    constructor() {
        this.STORAGE_KEY = 'carcosa_facility_state';
        this.state = this.loadState();
    }

    // Загрузка состояния из localStorage
    loadState() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            return saved ? JSON.parse(saved) : {
                hasSeenEnding: false,
                finalMessages: [],
                timestamp: null
            };
        } catch (error) {
            console.warn('Failed to load state:', error);
            return {
                hasSeenEnding: false,
                finalMessages: [],
                timestamp: null
            };
        }
    }

    // Сохранение состояния в localStorage
    saveState() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
        } catch (error) {
            console.warn('Failed to save state:', error);
        }
    }

    // Отметить что пользователь видел финал
    markEndingSeen(finalMessages) {
        this.state.hasSeenEnding = true;
        this.state.finalMessages = finalMessages;
        this.state.timestamp = new Date().getTime();
        this.saveState();
    }

    // Проверить видел ли пользователь финал
    hasSeenEnding() {
        return this.state.hasSeenEnding;
    }

    // Получить финальные сообщения
    getFinalMessages() {
        return this.state.finalMessages || [];
    }

    // Очистить состояние (для отладки)
    clearState() {
        this.state = {
            hasSeenEnding: false,
            finalMessages: [],
            timestamp: null
        };
        this.saveState();
    }
}

// Инициализация SPA после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    window.spaRouter = new SPARouter();
});

// Очистка ресурсов при закрытии страницы
window.addEventListener('beforeunload', () => {
    if (window.terminalInstance) {
        window.terminalInstance.cleanup();
    }

    // Обработчик ошибки загрузки изображения
document.addEventListener('DOMContentLoaded', () => {
    window.spaRouter = new SPARouter();
    
    // Добавляем обработчик для логотипа
    const logoImage = document.getElementById('logoImage');
    if (logoImage) {
        logoImage.addEventListener('error', function() {
            // Если изображение не загрузилось, создаем SVG-версию
            this.style.display = 'none';
            const svgLogo = createSVGLogo();
            this.parentNode.insertBefore(svgLogo, this);
        });
    }
});

});
