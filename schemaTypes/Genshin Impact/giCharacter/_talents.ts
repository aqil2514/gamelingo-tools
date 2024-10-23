import {defineField} from 'sanity'

export const talentsField = [
  defineField({
    name: 'talentsField',
    title: 'Talents Field',
    type: 'array',
    group: 'talents',
    of: [
      {
        type: 'object',
        name: 'talents',
        title: 'Talents',
        fields: [
          {
            name: 'talentName',
            title: 'Nama Talent',
            type: 'string',
          },
          {
            name: "description",
            title: "Deskripsi Talent",
            type: "blockContent"
          },
          {
            name: "image",
            title:"Gambar Talent",
            type: "image"
          }
        ],
      },
    ],
  }),
]
