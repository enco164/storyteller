# Storyteller - Aplikacija za praćenje dečijih narativa

Projekat iz predmeta Programiranje za Veb

Tehnologije: Laravel i AngularJS

##Instalacija
1. Potrebni alati su Composer i Node.js
2. (Samo za Linux) Posle instalacije Node.js pogledati:
>Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)
kako bi se zaobišli mogući problemi oko privilegija na sistemu kada se neki paket instalira globalno
3. Pokrenuti sledeće komande (pretpostavka da su username i password za mysql root-root):
```shell
$ composer install
$ php artisan migrate
$ cd client_hottowel
$ npm install -g bower
$ npm install 
$ bower install
```

## Pokretanje aplikacije
Instalirati gulp globalno:
```shell
$ npm install -g gulp
```

### Dev mod
Pokretanje dev moda pokreće BrowserSync plugin za automatsko osvežavanje stranice nakon izmene fajla.
```shell
$ cd client_hottowel
$ gulp serve-dev
```

###Build
Aplikaciju je moguće bildovati komandom
```shell
$ cd client_hottowel
$ gulp build
```
Bildovanje aplikacije generiše u /public folder klijentski deo tako da je tada moguće samo gađati server sa kog se aplikacija opslužuje.

## License

Storyteller is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
