# ems-server
The backend service provider for the expense management system

# commands
```
normal build: npm run build
normal start: npm run start
development start: npm run start:dev
```

# type orm find usage
## abstract function
```
const transactions = await ds.getRepository(Transaction).find({
    select: {
    account: { account_id: true, account_name: true },
    category: { category_id: true, category_name: true },
    },
    relations: {
    account: true,
    category: true,
    },
    where: {
    created_at: Between(startOfDay, endOfDay),
    },
    order: { created_at: "DESC" },
});
```
## query builder
```
const transactions = await ds
    .getRepository(Transaction)
    .createQueryBuilder("t")
    .select([
    "t.transaction_id",
    "t.title",
    "t.amount",
    "t.description",
    "t.transaction_offset",
    "t.created_at",
    ])
    .leftJoin("t.account", "a")
    .addSelect(["a.account_id", "a.account_name"])
    .leftJoin("t.category", "c")
    .addSelect(["c.category_id", "c.category_name"])
    .where("extract(month from t.created_at) = :month", { month })
    .andWhere("extract(year from t.created_at) = :year", { year })
    .andWhere("extract(day from t.created_at) = :day", { day })
    .orderBy("t.created_at", "DESC")
    .getMany();
```

# generate public private RSA keys
private key: ```openssl genrsa -out yourdomain.key [size]```
public key: ```openssl rsa -in yourdomain.key -pubout -out yourdomain_public.key```