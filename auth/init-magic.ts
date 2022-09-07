import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PB_KEY, {
  extensions: [new OAuthExtension()],
});

export default magic;