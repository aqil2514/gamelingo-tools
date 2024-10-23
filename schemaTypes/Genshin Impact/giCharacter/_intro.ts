import {defineField} from 'sanity';

export const introFields = [
  defineField({
    name: 'characterName',
    title: 'Nama Karakter',
    type: 'string',
    group: "intro"
  }),
  defineField({
    name: "slug",
    title: "slug",
    type: "slug",
    options: {
      source: 'characterName',
    },
    group: "intro"
  }),
  defineField({
    name: 'image',
    title: 'Image',
    type: 'object',
    fields: [
      defineField({
        name: 'cover',
        title: 'Cover Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),
      defineField({
        name: 'portrait',
        title: 'Portrait Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),
    ],
    group: "intro"
  }),
  defineField({
    name: 'gender',
    title: 'Jenis Kelamin',
    type: 'string',
    options: {
      list: [
        {value: 'Perempuan', title: 'Perempuan'},
        {value: 'Laki-laki', title: 'Laki-laki'},
      ],
    },
    initialValue: 'Laki-laki',
    group: "intro"
  }),
  defineField({
    name: 'region',
    title: 'Region',
    type: 'string',
    options: {
      list: [
        {title: 'Mondstadt', value: 'Mondstadt'},
        {title: 'Liyue', value: 'Liyue'},
        {title: 'Inazuma', value: 'Inazuma'},
        {title: 'Sumeru', value: 'Sumeru'},
        {title: 'Fontaine', value: 'Fontaine'},
        {title: 'Natlan', value: 'Natlan'},
        {title: 'Snezhnaya', value: 'Snezhnaya'},
        {title: 'Another World', value: 'Another World'},
      ],
    },
    initialValue: 'Mondstadt',
    group: "intro"
  }),
  defineField({
    name: 'element',
    title: 'Element',
    type: 'string',
    options: {
      list: [
        {title: 'Cryo', value: 'Cryo'},
        {title: 'Pyro', value: 'Pyro'},
        {title: 'Dendro', value: 'Dendro'},
        {title: 'Geo', value: 'Geo'},
        {title: 'Hydro', value: 'Hydro'},
        {title: 'Anemo', value: 'Anemo'},
        {title: 'Electro', value: 'Electro'},
      ],
    },
    initialValue: 'Cryo',
    group: "intro"
  }),
  defineField({
    name: 'rarity',
    title: 'Rarity',
    type: 'string',
    options: {
      list: [
        {title: '4 Star', value: '4'},
        {title: '5 Star', value: '5'},
      ],
    },
    initialValue: '4',
    group: "intro"
  }),
  defineField({
    name: 'weapon',
    title: 'Weapon',
    type: 'string',
    options: {
      list: [
        {title: 'Sword', value: 'Sword'},
        {title: 'Polearm', value: 'Polearm'},
        {title: 'Claymore', value: 'Claymore'},
        {title: 'Bow', value: 'Bow'},
        {title: 'Catalyst', value: 'Catalyst'},
      ],
    },
    initialValue: 'Sword',
    group: "intro"
  }),
  defineField({
    name: 'ascendStatus',
    title: 'Ascend Status',
    type: 'string',
    group: "intro"
  }),
  defineField({
    name: 'description',
    title: 'Description',
    type: 'text',
    group: "intro"
  }),
  defineField({
    name: 'cv',
    title: 'Voice Actor',
    type: 'object',
    group: "intro",
    fields: [
      defineField({
        name: 'english',
        title: 'English',
        type: 'string',
      }),
      defineField({
        name: 'chinese',
        title: 'Chinese',
        type: 'string',
      }),
      defineField({
        name: 'japanese',
        title: 'Japanese',
        type: 'string',
      }),
      defineField({
        name: 'korean',
        title: 'Korean',
        type: 'string',
      }),
    ],
  }),
  defineField({
    name: 'createdAt',
    title: 'Created At',
    type: 'datetime',
    group: "intro",
    options: {
      dateFormat: 'YYYY-MM-DD',
      timeFormat: 'HH:mm',
    },
    readOnly: true,
    initialValue: () => new Date().toISOString()
  }),
  defineField({
    name: 'updatedAt',
    title: 'Updated At',
    type: 'datetime',
    group: "intro",
    options: {
      dateFormat: 'YYYY-MM-DD',
      timeFormat: 'HH:mm',
    },
    readOnly: true
  }),
];
