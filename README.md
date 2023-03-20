# express-todo

## Setup

### Database

Run the contents of `todo_tsorak_setup.sql` in a MySQL database.

It creates a new database named `todo_tsorak` along with the needed tables and procedures.

**NOTE**: The script will remove the `todo_tsorak` database if it already exists.

### .env

```sh
ACCESS_TOKEN_SECRET="SECRET"
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""
# DB_PORT IS '3306' BY DEFAULT
```

## Available Scripts

```sh
npm run start
```

## [Frontend (site-todo)](https://github.com/tsorak/site-todo)

The site was built in a seperate repository and can be found [here](https://github.com/tsorak/site-todo)

## TODO

- [x] Implement todo controllers, services
- [x] Use MySQL
- [x] Implement validation (joi)
- [x] Return names on friends endpoints
- [ ] Generate salt
- [ ] Refresh tokens
- [ ] Use interfaces to describe what properties are expected from request.body
