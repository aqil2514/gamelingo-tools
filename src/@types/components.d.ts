/** Types for Components */
namespace Components {
  namespace DisplayData {
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
}
