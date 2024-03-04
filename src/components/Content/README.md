# Content Component

- Genshin Impact Maintaining Code Flows
1. Set up the subfield data in [Admin Data Page](/src/app/(protected)/admin/data/page.tsx)
```
const subFieldTitle: Record<string, string> = {
  ... before code
  [new key here] : [new value here]
  ... after code
};
```
2. Make sure [API Route Get Method](/src/app/api/gamelingo/genshin-impact/route.ts) is setted up
```
...
else if (category === "Weapon") {
    if (lang === "English") data = await ENWeapon.findById(_id);
    else if (lang === "Indonesian") data = await IDWeapon.findById(_id);
  }
...
```

3. Edit the code on [API/Post Method Post](/src/app/api/post/route.ts)
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
      const process = await genshin.processWeapon(formData, user, { action: "add" });
      if (process.status === 422) return NextResponse.json({ msg: process.msg }, { status: 422 });

      return NextResponse.json({ msg: "Tambah data senjata berhasil", process }, { status: 200 });
    }
...
```
It's because there was [updated code here](/src/utils/formUtils.ts#L334)

4. Don't forget to [update here as well](/src/utils/formUtils.ts#L20) and its [typescript declaration file](/src/@types/formUtils.d.ts##L330)
5. Then, make sure again about [form validation api](/src/utils/formValidator.ts#L19) and [its .d.ts file](/src/@types/api.d.ts#L103). Specially in Image Validator.
6. Edit this documentation later XD
