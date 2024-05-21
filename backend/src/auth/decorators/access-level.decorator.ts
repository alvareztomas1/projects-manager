import { SetMetadata } from '@nestjs/common';
import { ACCESS_LEVEL } from 'src/constants/access-levels';
import { ACCESS_LEVEL_KEY } from 'src/constants/keys.decorators';

export const AccessLevel = (accessLevel: keyof typeof ACCESS_LEVEL) =>
  SetMetadata(ACCESS_LEVEL_KEY, accessLevel);
