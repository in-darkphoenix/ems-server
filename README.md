# ems-server
The backend service provider for the expense management system

# commands
```
normal build: npm run build
normal start: npm run start
development start: npm run start:dev
```

# type orm find usage
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
