# Button Component

Create a Button Component with few templates

## Usage

- With Template

```
import Button from "@/components/Input/Button";

<Button template="detail-menu" withTemplate />
```

- Without Template

```
import Button from "@/components/Input/Button";

<Button type="button" className={VariantClass.danger} onClick={() => some cb}>
```

## Props

You can see [this file for see the types](/src/@types/components.d.ts)

- children (Optional) {React.ReactNode}
- withTemplate (Optional) {boolean}: If use this, template props shall be passed. Default: false;
- template (Optional) {string}: Will throw an error if withTemplate props true and this is empty. [See here for available template](/src/@types/components.d.ts)
- ...props (optional): You can add few props that available on Button Component
