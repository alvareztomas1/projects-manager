import {
  ACCESS_LEVEL_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from 'src/constants/keys.decorators';
import { PublicAccess } from './public-access.decorator';
import { AdminAccess } from './admin-access.decorator';
import { Roles } from './roles.decorator';
import { ROLES } from 'src/constants/roles';
import { AccessLevel } from './access-level.decorator';
import { ACCESS_LEVEL } from 'src/constants/access-levels';

describe('PublicAccess', () => {
  it('should set metadata', () => {
    @PublicAccess()
    class TestClass {}

    const metadata = Reflect.getMetadata(PUBLIC_KEY, TestClass);
    expect(metadata).toBe(true);
  });
});

describe('AdminAccess', () => {
  it('should set metadata', () => {
    @AdminAccess()
    class TestClass {}

    const metadata = Reflect.getMetadata(ADMIN_KEY, TestClass);
    expect(metadata).toBe(ROLES.ADMIN);
  });
});

describe('Roles', () => {
  it('should set metadata', () => {
    @Roles('CREATOR')
    class TestClass {}

    const metadata = Reflect.getMetadata(ROLES_KEY, TestClass);
    expect(metadata).toEqual([ROLES.CREATOR]);
  });
});

describe('AccessLevel', () => {
  it('should set metadata', () => {
    @AccessLevel('OWNER')
    class TestClass {}

    const metadata = Reflect.getMetadata(ACCESS_LEVEL_KEY, TestClass);
    expect(metadata).toBe(ACCESS_LEVEL[ACCESS_LEVEL.OWNER]);
  });
});
