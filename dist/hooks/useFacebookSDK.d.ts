import { FacebookSDKSetting } from 'types';
/**
 * useFacebookSDK - Custom hook used to load -> inject -> initilize the facebook SDK.
 */
export default function useFacebookSDK({ language, version, appId, xfbml, autoLogAppEvents, cookie, }: FacebookSDKSetting): {
    isReady: boolean;
    isError: boolean;
};
//# sourceMappingURL=useFacebookSDK.d.ts.map