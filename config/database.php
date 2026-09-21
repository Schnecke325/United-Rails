<?php

use Illuminate\Support\Str;
use Pdo\Mysql;

/**
 * Datenbankverbindungen.
 *
 * Die Datenbank läuft extern, nicht auf dem Webspace. Jede Abfrage geht damit
 * über das Netz. Deshalb: keine Sitzungen und kein Cache in der Datenbank
 * (siehe config/session.php und config/cache.php), und möglichst wenige
 * Abfragen pro Seitenaufruf.
 *
 * Es steht kein Anbieter im Code. Host, Port, Name, Zugangsdaten und das
 * TLS-Zertifikat kommen ausschließlich aus der Umgebung.
 */
return [

    'default' => env('DB_CONNECTION', 'mysql'),

    'connections' => [

        'mysql' => [
            'driver' => 'mysql',
            'url' => env('DB_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'united_rails'),
            'username' => env('DB_USERNAME', ''),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => env('DB_CHARSET', 'utf8mb4'),
            'collation' => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,

            /**
             * TLS zur externen Datenbank. DB_SSL_CA zeigt auf die
             * Zertifikatsdatei des Anbieters. Die Prüfung des Serverzertifikats
             * bleibt an, solange sie nicht ausdrücklich abgeschaltet wird.
             */
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                Mysql::ATTR_SSL_CA => env('DB_SSL_CA'),
                Mysql::ATTR_SSL_VERIFY_SERVER_CERT => filter_var(
                    env('DB_SSL_VERIFY', true),
                    FILTER_VALIDATE_BOOLEAN,
                ),
            ], static fn ($value) => $value !== null) : [],
        ],

        'mariadb' => [
            'driver' => 'mariadb',
            'url' => env('DB_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'united_rails'),
            'username' => env('DB_USERNAME', ''),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => env('DB_CHARSET', 'utf8mb4'),
            'collation' => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                Mysql::ATTR_SSL_CA => env('DB_SSL_CA'),
                Mysql::ATTR_SSL_VERIFY_SERVER_CERT => filter_var(
                    env('DB_SSL_VERIFY', true),
                    FILTER_VALIDATE_BOOLEAN,
                ),
            ], static fn ($value) => $value !== null) : [],
        ],

        /** Nur für Tests auf dem Entwicklungsrechner, nicht für den Betrieb. */
        'sqlite' => [
            'driver' => 'sqlite',
            'url' => env('DB_URL'),
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
            'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
            'busy_timeout' => null,
            'journal_mode' => null,
            'synchronous' => null,
            'transaction_mode' => 'DEFERRED',
        ],

    ],

    'migrations' => [
        'table' => 'migrations',
        'update_date_on_publish' => true,
    ],

    /**
     * Redis ist auf dem Webspace nicht vorausgesetzt. Die Einträge bleiben für
     * den Fall stehen, dass später ein externer Dienst dazukommt.
     */
    'redis' => [

        'client' => env('REDIS_CLIENT', 'phpredis'),

        'options' => [
            'cluster' => env('REDIS_CLUSTER', 'redis'),
            'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'united-rails'), '_').'_database_'),
            'persistent' => env('REDIS_PERSISTENT', false),
        ],

        'default' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_DB', '0'),
        ],

        'cache' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_CACHE_DB', '1'),
        ],

    ],

];
