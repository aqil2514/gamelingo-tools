# Data Display Directories

This directory contains component that purposes displaying data.

## Directories

- [Image](./Image/README.md): Contains component for displaying images

## Usage

```
import DisplayImage from "@/components/DataDisplay/Image";

<DisplayImage template="variant1" src={data.image} alt={data.name} />
```

## Props:

- template (required) : variant will be used. [See here for more available template](/src/@types/components.d.ts)
- src (required) {string | undefined} : source link image.
- alt (required) {string} : link name if source link nothing.
