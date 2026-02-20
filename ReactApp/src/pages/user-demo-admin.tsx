import { CONFIG } from 'src/config-global';

import { UserDemoView } from 'src/sections/user/user-demo/view/user-demo-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Users Demo - ${CONFIG.appName}`}</title>

      <UserDemoView isAdmin />
    </>
  );
}
