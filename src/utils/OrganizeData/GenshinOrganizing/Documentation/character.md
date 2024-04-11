# Genshin Impact Character Organizing

## Deskripsi
Modul ini berisi fungsi untuk mengorganisir data karakter dalam permainan Genshin Impact.

### Langkah-langkah
1. Jika action yang diberikan adalah 'edit', maka akan dilakukan pencarian data lama berdasarkan bahasa yang diberikan
2. Terdapat fungsi 'selectImage'. [Baca di sini untuk lebih lanjut](#selectimage)

## Fungsi-fungsi

### character(data, coverImageUrl, portraitImageUrl, action)
Digunakan untuk mengorganisir data karakter dalam permainan Genshin Impact.

#### Input
- `data`: Objek yang berisi data karakter.
- `coverImageUrl`: URL gambar sampul karakter.
- `portraitImageUrl`: URL gambar potret karakter.
- `action`: Tindakan yang dilakukan (contoh: "edit").

#### Output
- Objek karakter yang telah diorganisir.

### Penggunaan
```typescript
import { genshinImpactOrganizing } from './genshinImpactOrganizing';

// Contoh penggunaan untuk mengorganisir data karakter Genshin Impact
const characterData = {
  "result-lang": "English",
  name: "Character Name",
  description: "Character Description",
  ascendStatus: "Ascend Status",
  // dan seterusnya, sesuai dengan atribut karakter

  // dan untuk material-materi ascend karakter
  "ascend-1-material-1": "Material 1",
  "ascend-1-count-1": "1",
  // dan seterusnya

  // dan untuk voice actor karakter
  "character-voice-english": "English VA",
  "character-voice-japanese": "Japanese VA",
  // dan seterusnya

  rarity: "5-star",
  element: "Fire",
  weapon: "Sword",
  gender: "Female",
  region: "Region Name",
  // dan seterusnya

  // dan untuk URL gambar sampul dan potret karakter
  coverImageUrl: "https://example.com/cover.jpg",
  portraitImageUrl: "https://example.com/portrait.jpg",
};

const organizedCharacterData = await genshinImpactOrganizing.character(characterData, characterData.coverImageUrl, characterData.portraitImageUrl, "edit");
console.log(organizedCharacterData);
```

# selectImage

Fungsi ini digunakan untuk seleksi image

## Langkah-langkah
1. 