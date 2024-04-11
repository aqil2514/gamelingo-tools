# User Organizing

## Deskripsi
Modul ini berisi fungsi-fungsi untuk mengorganisir data administratif pada aplikasi.

## Fungsi-fungsi

### user(data)
Digunakan untuk mengorganisir data pengguna (user).

#### Input
- `data`: Objek yang berisi data pengguna.

#### Output
- Objek `finalData` yang berisi data pengguna yang telah diorganisir.

### Penggunaan
```typescript
import { adminOrganizing } from './adminOrganizing';

// Contoh penggunaan untuk mengorganisir data pengguna
const userData = {
  "user-id": 123,
  username: "john_doe",
  email: "john.doe@example.com",
  name: "John Doe",
  image: "profile.jpg",
  role: "admin",
  "account-verified": "on",
  "password-exist": "on"
};

const organizedUserData = adminOrganizing.user(userData);
console.log(organizedUserData);
