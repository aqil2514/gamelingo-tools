# Character Organizing

## Deskripsi
Modul ini berisi fungsi-fungsi untuk mengorganisir data karakter dalam permainan Evertale.

## Fungsi-fungsi

### character(data, images)
Digunakan untuk mengorganisir data karakter dalam permainan Evertale.

#### Input
- `data`: Objek yang berisi data karakter.
- `images`: Array yang berisi URL gambar-gambar karakter.

#### Output
- Objek `finalData` yang berisi data karakter yang telah diorganisir.

### Penggunaan
```typescript
import { evertaleOrganizing } from './evertaleOrganizing';

// Contoh penggunaan untuk mengorganisir data karakter Evertale
const characterData = {
  "status-charName": "Evertale Character",
  "status-isConjured": "on",
  "status-charTeam": "Team A, Team B",
  "status-charRank": "Rank S",
  "status-charElement": "Fire",
  "status-charWeapon1": "Sword",
  "status-charWeapon2": "Bow",
  "status-charLeaderSkill": "Leader Skill",
  "status-charConjure": "Evertale Character",
  // dan seterusnya, sesuai dengan atribut karakter

  // dan untuk gambar-gambar karakter
  images: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    // dan seterusnya
  ],
};

const organizedCharacterData = evertaleOrganizing.character(characterData, characterData.images);
console.log(organizedCharacterData);
