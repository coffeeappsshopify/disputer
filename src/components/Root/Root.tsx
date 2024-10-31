'use client';

import { type PropsWithChildren, useEffect, useMemo, useState } from 'react';
import {
  SDKProvider,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars, useInitData,
  User as TgUser,
} from '@telegram-apps/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useDidMount } from '@/hooks/useDidMount';

import './styles.css';
import {on, postEvent} from "@telegram-apps/bridge";
import {usePathname, useRouter} from "next/navigation";
import {AppRoot} from "@telegram-apps/telegram-ui";

function App(props: PropsWithChildren) {
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  return (
    <AppRoot className="p-2">
      <LayoutFetch>
        {props.children}
      </LayoutFetch>
    </AppRoot>
  );
}

function RootInner({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();

  postEvent('web_app_setup_back_button', { is_visible: pathname !== '/' });

  on('back_button_pressed', _ => {
    router.back();
  })

  const debug = useLaunchParams().startParam === 'debug';
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <App>
          {children}
        </App>
      </SDKProvider>
    </TonConnectUIProvider>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
  // Rendering. That's why we are showing loader on the server side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props}/>
    </ErrorBoundary>
  ) : <div className="root__loading">Loading</div>;
}

async function createOrUpdateUser(user: TgUser) {

  const dbResponse = await fetch('/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...user,
      id: user.id.toString()
    })
  })

  return await dbResponse.json();
}

function LayoutFetch(props: PropsWithChildren) {
  const pathname = usePathname();
  const initData = useInitData();
  const [user, setUser] = useState<TgUser | null>(null);

  useEffect(() => {
    if(initData && initData.user && !user) {
      createOrUpdateUser(initData.user).then(i => setUser(i));
    }
  }, [initData, user]);

  return (
    <>
      {user && pathname === '/' &&
        <div className={'grid grid-cols-[auto_minmax(10px,1fr)] text-wrap py-5 px-4 bg-gray-50 dark:bg-gray-900 rounded-[14px] gap-x-4 items-center mb-4'}>
          { user.photoUrl ?
            <img src={user.photoUrl} alt=""/> :
            <div className="w-[60px] h-[60px] rounded-full bg-blue-500 flex justify-center items-center text-h1 text-white dark:text-gray-900">
              {user.firstName && user.firstName[0]}{user.lastName && user.lastName[0]}
            </div>
          }
          <div>
            <h1 className="text-h2 truncate mb-1 text-gray-900 dark:text-gray-200">
              {user.firstName} {user.lastName}
            </h1>
            <div className="text-gray-600 dark:text-gray-400">
              {user.username ? '@' + user.username : 'id: ' + user.id}
            </div>
          </div>
        </div>
      }

      {props.children}
    </>
  );
}