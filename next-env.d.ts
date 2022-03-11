/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare let process: {
    env: {
      NEXT_PUBLIC_PADDLE_PRODUCT_ID: string;
      NEXT_PUBLIC_PADDLE_VENDOR_ID: string;
      NEXT_PUBLIC_PADDLE_ENV: string;
    }
}
  
declare let window: {
  Paddle: {
    Setup: (options: { vendor: string; debug: boolean }) => void;
    Checkout: {
      open: (options: {
        product: string;
        email: string;
        successCallback: (data: any, err: Error) => void;
      }) => void;
    };
    Environment: {
      set: (env: string) => void;
    }
  };
};
  