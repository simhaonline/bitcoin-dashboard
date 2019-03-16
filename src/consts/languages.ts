export interface LanguageDeclaration {
    langKey: string;
    nameEng: string;
    nameNative?: string;
    flagKey: string;
};

export const Languages = [
    { langKey: 'en-GB', nameEng: 'English', flagKey: 'gb' },
    { langKey: 'ru-RU', nameEng: 'Russian', nameNative: 'Русский', flagKey: 'ru' },
    { langKey: 'zh-CN', nameEng: 'Chinese', nameNative: '简体中文', flagKey: 'cn' },
    { langKey: 'ko-KR', nameEng: 'Korean', nameNative: '한국어', flagKey: 'kr' },
    { langKey: 'ja', nameEng: 'Japanese', nameNative: '日本語', flagKey: 'jp' }
];
