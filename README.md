This example demonstrates how to use [Express](http://expressjs.com/) 4.x and
[Passport](http://passportjs.org/) to authenticate users via the HTTP Bearer
and Basic scheme. 

```bash
 #use window.btoa("safi:ACDFGBHN") to generate basic64 string  "c2FmaTpBQ0RGR0JITg=="
 curl -v -H "Authorization: Basic c2FmaTpBQ0RGR0JITg==" http://127.0.0.1:3000/basic
 #or
 curl -v http://127.0.0.1:3000/basic/?username=safi&password:ACDFGBHN
```