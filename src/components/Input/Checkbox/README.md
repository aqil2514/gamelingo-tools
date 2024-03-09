# Checkbox Components

This contains a component for creating an Input checkbox type

## Usage

```
import Checkbox from "@/components/Input/Checkbox";

<Checkbox variant="default-variant-1" forId="is-conjured-char" label="Conjured" />
```

## Props

- variant (required) : Selected variant. [See here for more choices](/src/@types/components.d.ts)
- forId (required) : tag attribute for "for" attribute and "id" attribute.
- label (required) : label text.
- ...props : You can use any available attributes on HTMLInputElement
