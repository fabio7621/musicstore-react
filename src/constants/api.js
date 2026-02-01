/**
 * API 與環境常數
 * 集中管理避免 magic string/number，符合 Code Complete 可維護性原則
 */

export const API_BASE_URL = import.meta.env.VITE_BASE_URL || "";
export const API_PATH = import.meta.env.VITE_API_PATH || "";

/** 登入狀態 Cookie 名稱 */
export const AUTH_COOKIE_NAME = "fabio20";

/** API 路徑前綴 */
export const API_V2_PREFIX = "/v2/api";

/** Toast 自動關閉時間（毫秒） */
export const TOAST_DURATION_MS = 2000;

/** 首頁 Swiper 自動播放間隔（毫秒） */
export const SWIPER_AUTOPLAY_DELAY_MS = 3000;

/** 結帳完成頁面跳轉延遲（毫秒） */
export const CHECKOUT_REDIRECT_DELAY_MS = 3000;

/** 404 頁面跳轉延遲（毫秒） */
export const NOT_FOUND_REDIRECT_DELAY_MS = 1500;

/** 商品數量選擇器最大選項 */
export const PRODUCT_QUANTITY_MAX = 10;

/** 圖表 Top 排行數量 */
export const CHART_TOP_SALES_COUNT = 10;
