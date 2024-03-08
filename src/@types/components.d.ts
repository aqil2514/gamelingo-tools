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
      variant: "default-variant-1";
    }

    /**
     * Text Field components
     */
    export interface InputProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
      /** Digunakan untuk menentukan for atribute pada label dan id pada inputnya */
      forId?: string;
      /** Digunakan untuk label text */
      label?: string;
      /** Variant. Default: "default-variant-1" */
      variant: "default-variant-1" | "hidden";
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
