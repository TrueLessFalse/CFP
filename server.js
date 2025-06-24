const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 25565;
const HOST = process.env.HOST || '192.168.1.96';

// MIME типы для различных файлов
const mimeTypes = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'text/javascript; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.ogg': 'audio/ogg',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf',
    '.wasm': 'application/wasm',
    '.txt': 'text/plain; charset=UTF-8',
    '.xml': 'application/xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip'
};

// Функция для логирования с цветами
const log = {
    info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
    success: (msg) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`),
    warning: (msg) => console.log(`\x1b[33m[WARNING]\x1b[0m ${msg}`),
    error: (msg) => console.log(`\x1b[31m[ERROR]\x1b[0m ${msg}`),
    request: (method, url, status) => {
        const color = status >= 400 ? '\x1b[31m' : status >= 300 ? '\x1b[33m' : '\x1b[32m';
        console.log(`${color}[${method}]\x1b[0m ${url} - ${status}`);
    }
};

// Создаем HTTP сервер
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = `.${parsedUrl.pathname}`;
    
    // Если запрос к корню, отдаем index.html
    if (pathname === './') {
        pathname = './index.html';
    }
    
    // Проверяем, существует ли файл
    fs.access(pathname, fs.constants.F_OK, (err) => {
        if (err) {
            // Файл не найден
            res.writeHead(404, {
                'Content-Type': 'text/html; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            });
            
            const notFoundPage = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - ФАЙЛ НЕ НАЙДЕН</title>
                    <style>
                        body { 
                            background: #000; 
                            color: #ff0000; 
                            font-family: 'Courier New', monospace; 
                            text-align: center; 
                            padding: 50px; 
                        }
                        .error { 
                            font-size: 24px; 
                            text-shadow: 0 0 10px #ff0000; 
                            animation: blink 1s infinite; 
                        }
                        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0.3; } }
                    </style>
                </head>
                <body>
                    <div class="error">
                        [ОШИБКА 404]<br>
                        ФАЙЛ НЕ НАЙДЕН В СИСТЕМЕ<br>
                        ${pathname}
                    </div>
                </body>
                </html>
            `;
            
            res.end(notFoundPage);
            log.request(req.method, req.url, 404);
            return;
        }
        
        // Файл существует, читаем его
        fs.readFile(pathname, (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end('[СИСТЕМНАЯ ОШИБКА] Не удалось прочитать файл');
                log.request(req.method, req.url, 500);
                return;
            }
            
            // Определяем MIME тип файла
            const ext = path.parse(pathname).ext.toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            
            // Отдаем файл
            res.writeHead(200, {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            
            res.end(data);
            log.request(req.method, req.url, 200);
        });
    });
});

// Обработка ошибок сервера
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        log.error(`Порт ${PORT} уже используется!`);
        log.warning('Попробуйте другой порт: PORT=8081 node server.js');
    } else {
        log.error(`Ошибка сервера: ${err.message}`);
    }
    process.exit(1);
});

// Обработка сигналов завершения
process.on('SIGINT', () => {
    log.info('\n🛑 Получен сигнал завершения (Ctrl+C)');
    log.info('🎭 СИСТЕМА_НАБЛЮДЕНИЯ_v3.14 завершает работу...');
    server.close(() => {
        log.success('✅ Сервер успешно остановлен');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    log.info('🛑 Получен сигнал SIGTERM');
    server.close(() => {
        log.success('✅ Сервер успешно остановлен');
        process.exit(0);
    });
});

// Запускаем сервер
server.listen(PORT, HOST, () => {
    console.log('\n🎭 ========================================');
    console.log('   СИСТЕМА_НАБЛЮДЕНИЯ_v3.14');
    console.log('========================================');
    log.success(`🚀 Сервер запущен на http://${HOST}:${PORT}`);
    log.info(`📁 Корневая директория: ${process.cwd()}`);
    log.info(`🛑 Для остановки нажмите Ctrl+C`);
    console.log('========================================\n');
    
    // Открываем браузер (только на локальной машине)
    if (HOST === 'localhost' || HOST === '127.0.0.1') {
        const open = (url) => {
            const { exec } = require('child_process');
            const start = process.platform === 'darwin' ? 'open' :
                         process.platform === 'win32' ? 'start' : 'xdg-open';
            exec(`${start} ${url}`);
        };
        
        setTimeout(() => {
            log.info(`🌐 Открываем браузер...`);
            open(`http://${HOST}:${PORT}`);
        }, 1000);
    }
});