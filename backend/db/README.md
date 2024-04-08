# Few commands in psql

Mac:
Install postgres:
```
brew install postgresql@15
brew services start postgresql@14 
```

Enter into the postgresss shell:
```
psql -d postgres
```

List of databases
```
# \l
```

create the database:
```
CREATE DATABASE intellitool;
```

connect to the database
```
# \c intellitool
```

listing the tables
```
# \dt
```
