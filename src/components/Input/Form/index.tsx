// Todo: Create this component too
import { notif } from "@/utils/fe";
import axios from "axios";
import { Route } from "next";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;

  /** Set isLoading. Digunakan untuk UX Loading ketika mengirim data */
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  /** Method yang akan digunakan? */
  method: "postForm" | "putForm";

  /** Endpoint API */
  endPoint: Route;

  /** HTML Element Id yang menadi reference */
  refElement: string;

  /** Ganti halaman setelah input data berhasil */
  callbackUrl?: Route;

  /** Ganti halaman setelah input data berhasil */
  moveLocation?: boolean;

  /** Data game yang dikirim */
  game: General.Game["game"];
  /** Topik atau kategorinya */

  category:
    | General.GameGenshinImpact["category"]
    | General.GameEvertale["category"];
}

export default function Form({ children, ...props }: FormProps) {
  const {
    setIsLoading,
    method,
    endPoint,
    refElement,
    callbackUrl,
    moveLocation,
    ...rest
  } = props;
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLFormElement;
    e.preventDefault();

    const formData = new FormData(target);

    try {
      setIsLoading(true);
      const res = await axios[method](endPoint, formData, {
        params: {},
      });

      notif(res.data.msg, { color: "green", refElement, location: "before" });

      // <<<<< digunakan untuk pindah ke halaman yang ditentukan >>>>>
      if (callbackUrl && moveLocation) location.href = callbackUrl;

      setTimeout(() => {
        location.reload()
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          if (error.response) {
            const res: FormUtils.Result = error.response.data;

            if (res.ref) {
              const ref = document.querySelector(
                `[name='${res.ref}']`
              ) as HTMLInputElement;

              // <<<<< Image Error Handling >>>>>
              if (ref.type === "file") {
                const parent = ref.parentElement
                  ?.parentElement as HTMLDivElement;
                window.scrollTo({
                  top: parent.offsetTop - 100,
                  behavior: "smooth",
                });
              }

              // <<<<< TagName Specification >>>>>
              if (ref.tagName === "INPUT") {
                ref.focus();
              } else if (ref.tagName === "TEXTAREA") {
                ref.focus();
                ref.nextElementSibling?.classList.add("hidden");
              }

              notif(res.msg as string, {
                color: "red",
                refElement: ref,
                location: "after",
              });

              setTimeout(() => {
                ref.nextElementSibling?.classList.remove("hidden");
              }, 3000);
            } else {
              notif(res.msg as string, {
                color: "red",
                refElement,
                location: "before",
              });
            }
          }
        } else if (error.response?.status === 401) {
          notif(error.response?.data.msg, {
            color: "red",
            refElement,
            location: "before",
          });
          setTimeout(() => {
            location.href = "/login" as Route;
          }, 3000);
        }
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={submitHandler} {...rest}>
      {children}
    </form>
  );
}
