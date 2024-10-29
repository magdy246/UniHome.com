import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isSent, setIsSent] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            logo_image: 'https://i.imgur.com/RlUqObZ.png', // Your UniHome logo URL
            current_date: formattedDate // Pass the formatted date
        };

        emailjs
            .send(
                'service_ohj35tf', // Your EmailJS Service ID
                'template_61y5s6o', // Your EmailJS Template ID
                templateParams,
                'dHOB-4zHk6UKPI0Tq' // Your EmailJS Public Key
            )
            .then(
                (response) => {
                    toast.success('success', response.status, response.text);
                    setIsSent(true);
                    setFormData({
                        name: '',
                        email: '',
                        message: '',
                    });
                },
                (err) => {
                    toast.error('FAILED...', err);
                }
            );
    };
    const { t } = useTranslation();

    return (<>
        <Helmet>
            <title>Support - UniHome</title>
            <meta name="description" content="Get assistance and support for all your UniHome learning needs. Contact us for help with courses, schedules, and more." />
            <meta name="keywords" content="UniHome, support, help, assistance, customer service, courses, learning, English courses" />
            <meta name="author" content="UniHome" />
        </Helmet>
        <div className="support-page p-8 max-w-4xl mx-auto">
            {/* Page Title */}
            <h1 className="text-center text-6xl font-bold text-white my-6 relative">
                <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">{t('support')}</span>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
            </h1>
            {/* Contact Form */}
            <section className="contact-form bg-gray-100 p-6 rounded-3xl shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('getInTouch')}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">{t('name')}</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder={t('name')}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">{t('email')}</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder={t('email')}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">{t('message')}</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder={t('message')}
                            rows="5"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="submitSupport font-bold bg-blue-500 text-white px-6 py-3 rounded-3xl"
                    >
                        {t('submit')}
                    </button>
                </form>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <h2 className="text-2xl font-semibold mb-4">{t('faq')}</h2>
                <div className="faq-item mb-6">
                    <h3 className="text-lg font-medium mb-2">{t('resetPassword')}</h3>
                    <p>{t('resetPasswordAnswer')}</p>
                </div>
                <div className="faq-item mb-6">
                    <h3 className="text-lg font-medium mb-2">{t('trackBook')}</h3>
                    <p>{t('trackBookAnswer')}</p>
                </div>
                <div className="faq-item mb-6">
                    <h3 className="text-lg font-medium mb-2">{t('contactSupport')}</h3>
                    <p>
                        {t('contactSupportAnswer')}
                        <a className='text-orange-500 hover:underline' href="mailto:support@unih0me.com">{" "}support@unih0me.com</a>.
                    </p>
                </div>
            </section>

            {/* Social Media Icons */}
            <section className="social-media-links text-center mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t('connectWithUs')}</h2>
                <div className="flex justify-center gap-6">
                    {/* Facebook */}
                    <a
                        href="https://www.facebook.com/unih0me?mibextid=LQQJ4d"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-500"
                    >
                        <FaFacebookF size={24} />
                    </a>
                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/unih0me1?igsh=ZmI4YXplYjYwaWNt&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:scale-105 text-white p-4 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-500"
                    >
                        <FaInstagram size={24} />
                    </a>
                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/201222515066"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-500 hover:scale-105 transition-all duration-500"
                    >
                        <FaWhatsapp size={24} />
                    </a>
                </div>
            </section>
        </div>
    </>
    );
};

export default Support;
