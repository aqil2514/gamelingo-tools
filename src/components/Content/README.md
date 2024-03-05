# Content Component

## Genshin Impact

- Genshin Impact Maintaining Code Flows

### First Step (Set Admin Data and context menu)

1. Set up the subfield title data in [Admin Data Page](</src/app/(protected)/admin/data/page.tsx>)

```
const subFieldTitle: Record<string, string> = {
  ... before code
  [new key here] : [new value here]
  ... after code
};
```

2. Add GenshinImpactData in [Admin Data](/src/components/Admin/Data/Genshin-Impact/index.tsx) and add related folder (e.g : CharacterData/index.tsx). [See this folder for reference](/src/components/Admin/Data/Genshin-Impact/WeaponData)

3. Add interface or type in [related d.ts file](/src/@types/genshin.d.ts). Please sort the data alphabetical!

4. Edit [Context Menu](/src/components/Admin/ContextMenu/index.tsx)

```
... Code before
if (subfield === "Material") return <GIMaterialContextMenu data={passData} />;
    else if (subfield === "Artifact") return <GIArtifactContextMenu data={passData} />;
    else if (subfield === "Weapon") return <GIWeaponContextMenu data={passData} />;
    else if (subfield === "Character") return <GIWeaponContextMenu data={passData} />;
... Code after
```

5. Make sure [API Route Get Method](/src/app/api/gamelingo/genshin-impact/route.ts) is setted up.

```
...
else if (category === "Weapon") {
    if (lang === "English") data = await ENWeapon.findById(_id);
    else if (lang === "Indonesian") data = await IDWeapon.findById(_id);
  }
...
```

Don't forget to set up API Delete Route in the same file

```
export async function DELETE(req: NextRequest) {
... Code Before
if (lang === "English") {
      await ENWeapon.findByIdAndDelete(id);
      await Post.findOneAndDelete({ content: new ObjectId(id) });
    }
    ...Code after
return NextResponse.json({ msg: "Hapus data berhasil" }, { status: 200 });
}
```

6. Then, go to [Edit Menu Context](/src/components/Admin/ContextMenu/EditMenu.tsx) and add some code this line

```
export default function EditMenu({ field, subfield }: ContextSelectFieldProps) {
...Code Before
if (field === "genshin-impact") {
    if (subfield === "Material") return <GIMaterialContentForm template="Edit" />;
...CodeAfter
}
}
```

If there is an error, just ignore it. We`ll go to the related folder to fix this error.
You can see [the reference folder](/src/components/Content/Write/Genshin/Weapon) for this case.
You can see, there is a "Form.tsx" file. We'll do this.

### Step 2 (Set up the Edit Menu code)

1. Go to [Provider folder](/src/components/Providers) and create a related file.

2. Go to related folder and add/edit "index.tsx". Cut all off the code and alter it untill like this

```
import WeaponProvider from "@/components/Providers/Game/GenshinImpact/WeaponProvider";
import GIWeaponContentForm from "./Form";

export default function WeaponForm() {
  return (
    <WeaponProvider>
      <GIWeaponContentForm template="Write" />
    </WeaponProvider>
  );
}
```

3. create a "Form.tsx" and set up a code like this [reference file.](/src/components/Content/Write/Genshin/Material/Form.tsx)

4. (Skip this if done) Go to [Declaration File of utils](/src/@types/formUtils.d.ts) and change from:

```
    export interface Genshin {
      ...
            proccessCharacter: (formData: FormData, user: Account.User) => Promise<Result>;
      ...
    }
```

to

```

    export interface Genshin {
      ...
            proccessCharacter: (formData: FormData, user: Account.User, config?: ProcessGenshinConfig) => Promise<Result>;
      ...
    }

```

5. Edit the code on [API/Post Method Post](/src/app/api/post/route.ts)
   from:

```

...
else if (category === "Weapon") {
const process = await genshin.processWeapon(formData, user);
if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

      return NextResponse.json({ msg: "Tambah data senjata berhasil", process }, { status: 200 });
    }

...

```

to:

```

...
else if (category === "Weapon") {
const process = await genshin.processWeapon(formData, user, { action: "add" }); // add config
if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

      return NextResponse.json({ msg: "Tambah data senjata berhasil", process }, { status: 200 });
    }

...

```

It's because there was [updated code here](/src/utils/formUtils.ts#L334)

4. Don't forget to [update here as well](/src/utils/formUtils.ts#L20) and its [typescript declaration file](/src/@types/formUtils.d.ts##L330)
5. Then, make sure again about [form validation api](/src/utils/formValidator.ts#L19) and [its .d.ts file](/src/@types/api.d.ts#L103). Specially in Image Validator.
6. Edit this documentation later XD

```

```
