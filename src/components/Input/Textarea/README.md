# TextField Components

This contains a component for creating a Input Text Element

## Usage

```
import Textarea from "@/components/Input/Textarea"

<Textarea variant="default-variant-1" forId="charName" label="Character Name" />

```

## Props

- variant (required) : Selected variant. [See here for more choices](/src/@types/components.d.ts)
- forId (required) : tag attribute for "for" attribute and "id" attribute.
- label (required) : label text.
- ...props : You can use any available attributes on HTMLInputElement
