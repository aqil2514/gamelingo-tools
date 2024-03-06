# Content Component

## Genshin Impact

- Genshin Impact Maintaining Code Flows

### Step 1 (Preparation)

1. Set up the subfield title data in [Admin Data Page](</src/app/(protected)/admin/data/page.tsx>)

2. Add GenshinImpactData in [Admin Data](/src/components/Admin/Data/Genshin-Impact/index.tsx) and add related folder (e.g : CharacterData/index.tsx). [See this folder for reference](/src/components/Admin/Data/Genshin-Impact/WeaponData)

3. Add interface or type in [related d.ts file](/src/@types/genshin.d.ts). Please sort the data alphabetical!

4. Create a file that contains table. [See this file for reference](/src/components/Admin/Data/Genshin-Impact/MaterialData/MaterialData.tsx)

5. Edit [Context Menu](/src/components/Admin/ContextMenu/index.tsx)

6. Don't forget to send [data from server](/src/app/api/admin/route.ts)

7. Make sure [API Route Get Method](/src/app/api/gamelingo/genshin-impact/route.ts) is setted up.

8. Don't forget to set up API Delete Route in the same file.

9. Then, go to [Edit Menu Context](/src/components/Admin/ContextMenu/EditMenu.tsx) and add some code this line

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

4. Don't forget to handle Api Route in fetcher.

5. Don't forget too to [set up an endpoint here].(/src/app/api/gamelingo/genshin-impact/route.ts)

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

5. Fix the process code on [API/Post Method Post](/src/app/api/post/route.ts). It's because there was [updated code here](/src/utils/formUtils.ts#L334)

6. Don't forget to [update here as well](/src/utils/formUtils.ts#L20) and its [typescript declaration file](/src/@types/formUtils.d.ts##L330)

7. Then, make sure again about [form validation api](/src/utils/formValidator.ts#L19) and [its .d.ts file](/src/@types/api.d.ts#L103). Specially in Image Validator.

8. Edit this documentation later XD

```

```

## Step 3 : Detail Menu
1. Start from [this file](/src/components/Admin/ContextMenu/DetailMenu.tsx)