// global.d.ts
declare global {
    namespace JSX {
      interface IntrinsicElements {
        'mux-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          // Define any known attributes here if you want more type safety
          'playback-id'?: string;
          'stream-type'?: string;
          'poster'?: string;
          controls?: boolean;
          'primary-color'?: string;
          title?: string;
        };
      }
    }
}

export {};
