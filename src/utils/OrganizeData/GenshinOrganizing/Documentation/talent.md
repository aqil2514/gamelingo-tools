# Genshin Impact Talent Organizing

## Deskripsi

Modul ini berisi fungsi untuk mengorganisir data talent karakter dalam permainan Genshin Impact.

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

```typescript
character: (
  data: FormUtils.Genshin.FormDataCharacter,
  coverImageUrl: string,
  portraitImageUrl: string,
  action: "edit" | "add"
) => Promise<GenshinImpact.Character>;
```

#### Output

- Objek karakter yang telah diorganisir. [Interface Genshin Character]()

### Penggunaan

```typescript
import { genshinValidator } from "./formValidator";
const organizedData = await genshinOrganizing.character(
  validation.data,
  coverImageUrl,
  portraitImageUrl,
  action
);
```

# selectImage

Fungsi ini digunakan untuk seleksi image

## Langkah-langkah

1. Terdapat penentuan mengenai image yang akan diperiksa, apakah itu `cover` atau `portrait`

```typescript
const coverMap = {
  cover: coverImageUrl,
  portrait: portraitImageUrl,
};
```

2. Pembuatan variabel untuk data lama dan data baru

```typescript
const oldDataImage = oldData.image[field]
  .toLowerCase()
  .includes(data.name.toLowerCase());
const newDataImage = coverMap[field];
```

3. Pengkondisian

```typescript
// Jika data lama ada, namun tidak ada data baru, gunakan data lama.
if (oldDataImage && !newDataImage) {
  return oldData.image[field];
}
// Jika ada data lama dan ada juga data baru, gunakan data baru
else if (oldDataImage && newDataImage) {
  return newDataImage;
}

// Apakah data lama ada? Jika ada gunakan data lama,
// jika tidak gunakan data baru.
return oldDataImage ? oldData.image[field] : coverMap[field];
```

# Interface Genshin Impact Character

```typescript
export interface Character extends General.MongoDBDocument {
  lang: "Indonesian" | "English";
  name: string;
  description: string;
  ascendStatus: string;
  ascendMaterial?: UpgradeMaterial;
  rarity: string;
  element: "Cryo" | "Pyro" | "Dendro" | "Geo" | "Hydro" | "Anemo" | "Electro";
  weapon: "Sword" | "Polearm" | "Claymore" | "Bow" | "Catalyst";
  gender: "Female" | "Male" | "Perempuan" | "Pria";
  region:
    | "Mondstadt"
    | "Liyue"
    | "Inazuma"
    | "Sumeru"
    | "Fontain"
    | "Snezhnaya"
    | "Another World";
  cv: {
    english: string;
    chinese: string;
    japanese: string;
    korean: string;
  };
  image: {
    cover: string;
    portrait: string;
  };
  build?: BuildCharacter;
  talent?: Talent[];
  constellation?: Constellation[];
}
```
