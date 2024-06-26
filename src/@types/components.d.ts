/** Types for Components */
namespace Components {
  /**
   * Types for Displaying Data.
   *
   * @see /src/components/DataDisplay/README.md
   */
  namespace DisplayData {
    /**
     * Types for Image Component
     *
     * @see /src/components/DataDisplay/Image/README.md
     */
    namespace Image {
      /**
       * Default Image Types
       * @interface
       *
       * @see /src/components/DataDisplay/Image/README.md
       */
      export interface Default {
        /**
         * Url untuk imagenya
         * @type {string}
         */
        src?: string;
        /**
         * Alt name untuk imagenya jika url tidak valid
         * @type {string}
         */
        alt: string;
      }
      /**
       * Image Element
       * @interface
       *
       * @see /src/components/DataDisplay/Image/README.md
       */
      export interface ImageElement extends Default {
        /**
         * Template untuk image
         */
        template: TemplateImage;
      }

      /**
       * Template untuk image
       */
      type TemplateImage = "variant1";
    }
  }
  /**
   * Types for Input Data.
   *
   * @see /src/components/Input/README.md
   */
  namespace Input {
    /**
     * Button Props interface
     */
    export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      children?: React.ReactNode;
      /**
       * Apakah menggunakan template? default: false
       */
      withTemplate?: boolean;
      /**
       * Template
       *
       * @see /src/components/Input/Button/README.md
       */
      template?: "detail-menu" | "write-form";
    }

    /**
     * Checkbox components
     */
    export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
      /** Digunakan untuk menentukan for atribute pada label dan id pada inputnya */
      forId: string;
      /** Digunakan untuk label text */
      label: string;
      /** Variant. Default: "default-variant-1" */
      variant: "default-variant-1" | "skeleton-variant-1";
    }

    /**
     * 
     * General Input Component
     * 
     */

    export interface GeneralInputComponent{
      /** Digunakan untuk menentukan for atribute pada label dan id pada inputnya */
      forId?: string;
      /** Digunakan untuk label text */
      label?: string;
    }

    /**
     * Text Field components
     */
    export interface InputProps<T> extends React.InputHTMLAttributes<HTMLInputElement>, GeneralInputComponent {
      /** Variant. Default: "default-variant-1" */
      variant: "default-variant-1" | "outline-variant-1" | "skeleton-variant-1" | "hidden";
      /** withList. Menyertakan list. Belum dikembangkan Default: "none" */
      withList?: "none" | string;
    }
    
    /**
     * Select Component
    */
    export interface SelectProps<T> extends React.SelectHTMLAttributes<HTMLSelectElement>, GeneralInputComponent{
        /** Variant. Default: "default-variant-1" */
        template?: "default-variant-1",
        /** Data yang akan menjadi pilihan default */
        defaultChoice: string,
        /** Data yang akan menjadi value */
        data: {
          label: string,
          value:T,
        }[]
      }

    /**
     * TextareaProps interface
     */
    export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
      /** Digunakan untuk menentukan for atribute pada label dan id pada inputnya */
      forId: string;
      /** Digunakan untuk label text */
      label: string;
    }
  }
}
