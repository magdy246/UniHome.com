import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
    const { t } = useTranslation();
    return (
        <div className="privacy-policy p-6 text-gray-800">
            <h1 className="text-center text-6xl font-bold text-white my-6 relative">
                <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
                    {t('privacyPolicy.title')}
                </span>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
            </h1>

                <section className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-12">

                    {/* Policy Content */}
                    <div>
                        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">{t('policy.title')}</h1>
                        <p className="mb-6 text-gray-800 text-lg leading-relaxed">{t('policy.introduction')}</p>
                        <p className="mb-10 text-gray-800 text-lg leading-relaxed">{t('policy.commitment')}</p>
                    </div>

                    {/* Rights Section */}
                    <div className="bg-blue-50 rounded-lg p-6 shadow-inner">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">{t('policy.rights.title')}</h2>
                        <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg pl-4">
                            <li>{t('policy.rights.description1')}</li>
                            <li>{t('policy.rights.description2')}</li>
                            <li>{t('policy.rights.description3')}</li>
                            <li>{t('policy.rights.description4')}</li>
                            <li>{t('policy.rights.description5')}</li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-blue-50 rounded-lg p-6 shadow-inner">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">{t('policy.contact.title')}</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">{t('policy.contact.description')}</p>
                    </div>

                    {/* Updates Section */}
                    <div className="bg-blue-50 rounded-lg p-6 shadow-inner">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">{t('policy.updates.title')}</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">{t('policy.updates.description')}</p>
                    </div>

                    {/* Escalation Section */}
                    <div className="bg-blue-50 rounded-lg p-6 shadow-inner">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">{t('policy.escalation.title')}</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">{t('policy.escalation.description')}</p>
                    </div>

                    {/* Retention Section */}
                    <div className="bg-blue-50 rounded-lg p-6 shadow-inner">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b-2 border-blue-200 pb-2">{t('policy.retention.title')}</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">{t('policy.retention.description')}</p>
                    </div>
                </section>
        </div>
    );
};

export default PrivacyPolicy;
