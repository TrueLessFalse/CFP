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
    },
};

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
        this.enabled = CONFIG.audio.enabled;
        this.userInteracted = false;
        this.pendingAudio = [];
        this.init();
    }

    init() {
        if (!this.enabled) return;
        
        // Setup volume levels
        this.backgroundMusic.volume = CONFIG.audio.backgroundVolume;
        this.typingSounds.forEach(sound => {
            sound.volume = CONFIG.audio.typingVolume;
        });
        this.computerSound.volume = CONFIG.audio.computerVolume;
        
        // Handle loading errors gracefully
        const allSounds = [this.backgroundMusic, ...this.typingSounds, this.computerSound];
        allSounds.forEach(audio => {
            audio.addEventListener('error', () => {
                console.warn('Audio file not found:', audio.src);
            });
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

    stopBackground() {
        if (!this.enabled) return;
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
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
        mainContainer.style.display = 'flex'; // ИЗМЕНЕНО
        
        // Запускаем терминал только после показа
        if (!window.terminalInstance) {
            window.terminalInstance = new HorrorTerminal();
        }
    }, 2000);
}
}

// Основной класс терминала
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
        this.init();
    }

    init() {
        this.startAwakeningSequence();
    }

    // Последовательность пробуждения машины
    async startAwakeningSequence() {
        this.isAwakening = true;
        this.audioManager.playComputer();
        this.audioManager.playBackground();
        
        // Обновляем заголовок для режима пробуждения
        this.headerSpan.textContent = 'CARCOSA_FACILITY_CONTROL_v3.14 :: ПРОБУЖДЕНИЕ :: СТАТУС_НЕИЗВЕСТЕН';
        
        // Добавляем эффект искажения к контейнеру
        this.terminalContainer.classList.add('awakening-distortion');
        
        for (let i = 0; i < AWAKENING_SEQUENCE.length; i++) {
            const message = AWAKENING_SEQUENCE[i];
            await this.displayAwakeningMessage(message);
            
            // Добавляем случайные глитчи во время пробуждения
            if (Math.random() > 0.7) {
                this.triggerAwakeningGlitch();
            }
        }
        
        // Финальная очистка и переход к нормальному режиму
        await this.finalAwakeningCleanup();
    }

    // Отображение сообщения пробуждения
    displayAwakeningMessage(message) {
        return new Promise((resolve) => {
            setTimeout(() => {
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
                    this.scrollToBottom();
                    resolve();
                });
            }, message.delay);
        });
    }

    // Финальная очистка после пробуждения
    async finalAwakeningCleanup() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Добавляем эффект очистки ко всем сообщениям
                const allEntries = this.output.querySelectorAll('.log-entry');
                allEntries.forEach((entry, index) => {
                    setTimeout(() => {
                        entry.classList.add('clearing-effect');
                    }, index * 100);
                });
                
                // Очищаем экран и запускаем нормальный режим
                setTimeout(() => {
                    this.output.innerHTML = '';
                    this.terminalContainer.classList.remove('awakening-distortion');
                    this.isAwakening = false;
                    this.startNormalMode();
                    resolve();
                }, 3000);
            }, 1000);
        });
    }

    // Запуск нормального режима работы
    startNormalMode() {
        // Сбрасываем заголовок
        this.updateHeader();
        this.startInitialMessages();
        this.startMessageProcessor();
        this.startRandomGlitches();
        this.startHeaderUpdates();
        this.startSequenceTimer();
    }

    // Запуск таймера для последовательных событий
    startSequenceTimer() {
        const startSequence = () => {
            // Запускаем последовательность только если не активна другая
            if (!this.sequenceActive) {
                this.triggerSequenceEvent();
            }
            
            // Планируем следующий запуск последовательности
            setTimeout(startSequence, CONFIG.intervals.sequenceStart);
        };
        
        // Первый запуск через 30 секунд после начала нормального режима
        setTimeout(startSequence, CONFIG.intervals.sequenceStart);
    }

    // Запуск последовательности событий
    triggerSequenceEvent() {
        if (this.sequenceActive) return;
        
        this.sequenceActive = true;
        this.currentSequenceIndex = 0;
        
        this.processNextSequenceMessage();
    }

    // Обработка следующего сообщения в последовательности
    processNextSequenceMessage() {
        if (this.currentSequenceIndex >= SEQUENCE_MESSAGES.length) {
            // Последовательность завершена
            this.sequenceActive = false;
            this.currentSequenceIndex = 0;
            return;
        }

        const message = SEQUENCE_MESSAGES[this.currentSequenceIndex];
        this.displaySequenceMessage(message);
        
        this.currentSequenceIndex++;
        
        // Если есть еще сообщения, планируем следующее
        if (this.currentSequenceIndex < SEQUENCE_MESSAGES.length) {
            this.sequenceTimer = setTimeout(() => {
                this.processNextSequenceMessage();
            }, CONFIG.intervals.sequenceDelay);
        } else {
            // Последовательность завершена
            this.sequenceActive = false;
            this.currentSequenceIndex = 0;
        }
    }

    // Отображение сообщения последовательности
    displaySequenceMessage(message) {
        // Добавляем сообщение в приоритетную очередь (в начало)
        this.messageQueue.unshift(message);
    }

    // Глитч-эффект во время пробуждения
    triggerAwakeningGlitch() {
        this.terminalContainer.classList.add('awakening-glitch');
        setTimeout(() => {
            this.terminalContainer.classList.remove('awakening-glitch');
        }, 300);
    }

    // Функция печати текста по символам
   typeText(element, text, callback) {
    let index = 0;
    const interval = setInterval(() => {
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
        const message = this.getRandomMessage();
        this.messageQueue.push(message);
    }

    // Обработчик очереди сообщений
    processMessageQueue() {
        if (this.isAwakening || this.isTyping || this.messageQueue.length === 0) {
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
            this.scrollToBottom();
            this.addCursorMaybe(entry);
            
            setTimeout(() => {
                this.isTyping = false;
            }, CONFIG.typing.messageGap || 500);
        });
    }

    // Запуск обработчика очереди
    startMessageProcessor() {
        setInterval(() => {
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
        this.output.scrollTop = this.output.scrollHeight;
    }

    // Добавить курсор с некоторой вероятностью
    addCursorMaybe(entry) {
        if (Math.random() > CONFIG.probability.cursor) {
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            entry.appendChild(cursor);
            
            setTimeout(() => cursor.remove(), CONFIG.cursor.duration);
        }
    }

    // Запуск начальных сообщений
    startInitialMessages() {
        CONFIG.initialDelays.forEach((delay, index) => {
            setTimeout(() => {
                this.queueMessage();
            }, delay);
        });

        const maxInitialDelay = Math.max(...CONFIG.initialDelays);
        setTimeout(() => {
            this.startPeriodicMessageQueuing();
        }, maxInitialDelay + 2000);
    }

    // Запуск периодического добавления сообщений в очередь
    startPeriodicMessageQueuing() {
        const scheduleNext = () => {
            const baseInterval = CONFIG.intervals.messageAdd;
            const randomDelay = Math.random() * CONFIG.intervals.messageRandom;
            const nextDelay = baseInterval + randomDelay;
            
            setTimeout(() => {
                if (Math.random() > CONFIG.probability.messageShow) {
                    this.queueMessage();
                }
                scheduleNext();
            }, nextDelay);
        };
        
        scheduleNext();
    }

    // Запуск случайных глитчей
    startRandomGlitches() {
        setInterval(() => {
            if (!this.isAwakening && Math.random() > CONFIG.probability.glitch) {
                this.triggerGlitch();
            }
        }, CONFIG.intervals.glitch);
    }

    // Триггер глитча
    triggerGlitch() {
        document.body.style.filter = 'invert(1)';
        this.audioManager.playComputer();
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, CONFIG.effects.glitchDuration);
    }

    // Запуск обновлений заголовка
    startHeaderUpdates() {
        setInterval(() => {
            this.updateHeader();
        }, CONFIG.intervals.headerUpdate);
    }

    // Обновление заголовка
    updateHeader() {
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
        if (this.sequenceTimer) {
            clearTimeout(this.sequenceTimer);
            this.sequenceTimer = null;
        }
        this.sequenceActive = false;
        this.currentSequenceIndex = 0;
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

// Функция создания SVG-логотипа как fallback
function createSVGLogo() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '250');
    svg.setAttribute('height', '250');
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.style.filter = 'drop-shadow(0 0 20px rgba(0,0,0,0.5))';
    svg.className = 'logo-image';
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '200,50 350,150 350,250 200,350 50,250 50,150');
    polygon.setAttribute('fill', 'none');
    polygon.setAttribute('stroke', '#262626');
    polygon.setAttribute('stroke-width', '8');
    
    const innerShape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    innerShape.setAttribute('points', '200,100 250,150 250,200 200,250 150,200 150,150');
    innerShape.setAttribute('fill', '#262626');
    
    svg.appendChild(polygon);
    svg.appendChild(innerShape);
    
    return svg;
}
});
