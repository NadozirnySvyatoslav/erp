## Створення нової сутності "Групи користувачів"

1. Створити таблицю в базі даних "group" з полями id, name
2. скопіювати файл /data/server_erp/backend/app/app/models/user.py -> group.py
3. Відредагувати файл у відповідність до полів в базі даних

```
/data/server_erp/backend/app/app/models/group.py
from sqlalchemy import Integer, String, Column, Boolean
from sqlalchemy.orm import relationship
from app.db.base_class import Base
class Group(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=True)
```

4. Скопіювати файл /data/server_erp/backend/app/app/schemas/user.py -> group.py
5. Відредагувати відповідну схему

6. Скопіювати файл /data/server_erp/backend/app/app/crud/crud_user.py -> crud_group.py
7. Відредагувати на відповідність функцій
8. Добавити у файл /data/server_erp/backend/app/app/crud/__init__.py підключення функцій CRUD


9. Скопіювати endpoint /data/server_erp/backend/app/app/api/api_v1/endpoints/users.py -> groups.py
10. Відредагувати/додати/видалити функції
11. Перевірити доступи до функцій
    * - доступ незареєстрованим користувачам
    current_user: User = Depends(deps.get_current_user) - доступ лише зареєстрованим користувачам
    current_user: User = Depends(deps.get_groups("admin").check) - доступ лише для групи admin


12. Включити використання endpoint-ів в файлі /data/server_erp/backend/app/app/api/api_v1/api.py