import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
    const { t } = useTranslation();
    return (
        <div className="privacy-policy p-6 text-gray-800">
            <h1 className="text-center text-6xl font-bold text-white mb-6 relative">
                <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
                    {t('privacyPolicy.title')}
                </span>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
            </h1>

            <h2 className="text-2xl font-semibold mb-2">{t('privacyPolicy.termsConditions')}</h2>
            <p>
                {t('privacyPolicy.statement')} <a href="http://www.unih0me.com" className="text-blue-600">{t('privacyPolicy.siteName')}</a> {t('privacyPolicy.purpose')}
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">{t('privacyPolicy.collectionInfo')}</h2>
            <p>{t('privacyPolicy.collectDetails')}</p>
            <ul className="list-disc ml-8 mt-2">
                <li>{t('privacyPolicy.infoList.name')}</li>
                <li>{t('privacyPolicy.infoList.address')}</li>
                <li>{t('privacyPolicy.infoList.email')}</li>
                <li>{t('privacyPolicy.infoList.phone')}</li>
                <li>{t('privacyPolicy.infoList.credentials')}</li>
            </ul>

            <p className="mt-4">{t('privacyPolicy.purchaseInfo')}</p>
            <p>{t('privacyPolicy.usePersonalInfo')}</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">{t('privacyPolicy.sharingInfo')}</h2>
            <p>{t('privacyPolicy.sharingDescription')}</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">{t('privacyPolicy.autoCollectedInfo')}</h2>
            <p>{t('privacyPolicy.autoDescription')}</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">{t('privacyPolicy.cookies')}</h2>
            <p>{t('privacyPolicy.cookiesDescription')}</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">{t('privacyPolicy.links')}</h2>
            <p>{t('privacyPolicy.linksDescription')}</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">{t('privacyPolicy.securityInfo')}</h2>
            <p>{t('privacyPolicy.securityDescription')}</p>
            <ul className="list-disc ml-8 mt-2">
                <li>{t('privacyPolicy.ssl')}</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-2">{t('privacyPolicy.childrenUnder13')}</h2>
            <p>{t('privacyPolicy.childrenDescription')}</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">{t('privacyPolicy.rightToErasure')}</h2>
            <p>{t('privacyPolicy.erasureDescription')}</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">{t('privacyPolicy.deleteAccount')}</h2>
            <p>{t('privacyPolicy.deleteDescription')}</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">{t('privacyPolicy.emailCommunications')}</h2>
            <p>{t('privacyPolicy.emailDescription')}</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">{t('privacyPolicy.changesToStatement')}</h2>
            <p>{t('privacyPolicy.changesDescription')}</p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">{t('privacyPolicy.contactInfo')}</h2>
            <p>{t('privacyPolicy.contactDescription')}</p>
        </div>
    );
};

export default PrivacyPolicy;
