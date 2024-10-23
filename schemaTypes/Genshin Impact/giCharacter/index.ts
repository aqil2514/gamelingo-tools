import {defineType} from 'sanity'
import {introFields} from './_intro'
import { talentsField } from './_talents'

export default defineType({
  name: 'genshinImpactCharacter',
  title: 'Genshin Impact Character',
  type: 'document',
  groups: [
    {
      name: 'intro',
      title: 'Intro',
    },
    {
      name: 'talents',
      title: 'Talents',
    },
  ],
  fields: [
    ...introFields, 
    ...talentsField
  ],
  preview: {
    select: {
      title: 'characterName',
      media: 'image.portrait',
    },
    prepare(selection) {
      return {...selection}
    },
  },
})
