# TextField Components

This contains a component for creating an Input Text Element

## Usage

```
import TextField from "@/components/Input/TextField"

<TextField variant="default-variant-1" forId="charName" label="Character Name" />

```

## Props

- variant (required) : Selected variant. [See here for more choices](/src/@types/components.d.ts)
- forId (required) : tag attribute for "for" attribute and "id" attribute.
- label (required) : label text.
- Withlist (experimental) : Can't use now. This will contain related list.
- ...props : You can use any available attributes on HTMLInputElement
