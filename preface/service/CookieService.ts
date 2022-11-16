import { getCookie, removeCookies, setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

class CookieService {
  static getCookies(key: string, config?: OptionsType) {
    try {
      const cookies = JSON.parse(getCookie(key, config) as string);
      return cookies;
    } catch {
      return { ok: false };
    }
  }
  static setCookie(key: string, value: string, config: OptionsType) {
    try {
      setCookie(key, value, config);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }
  static removeCookie(key: string, config: OptionsType) {
    removeCookies(key, config);
  }
}

export default CookieService;
