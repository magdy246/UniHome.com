import React, { useState } from "react";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import { Helmet } from 'react-helmet';
import Account from "./Account";
import EditPassword from "./EditPassword";
import { useTranslation } from "react-i18next";
// import ProfileSettings from "./ProfileSettings";

export default function RoutingSting() {

  const [colorsActive, setColorsActive] = useState({
    tab1: "tab1",
    tab2: "tab1",
    tab3: "tab1",
    tab4: "tab1",
    tab5: "tab1",
    tab6: "tab1",
    tab7: "tab1",
    tab8: "tab1",
  });

  const handleColorsClick = (value) => {
    if (value === colorsActive) {
      return;
    }
    setColorsActive({ ...colorsActive, ...value });
  };

  const tabButtonStyles = "tabsOfRoute";
  const { t } = useTranslation();

  return (<>
    <Helmet>
            <title>Settings - UniHome</title>
            <meta name="description" content="Manage your account setting, preferences, and notifications on UniHome. Customize your learning experience today." />
            <meta name="keywords" content="UniHome, setting, account management, preferences, notifications, user profile, customize learning" />
            <meta name="author" content="UniHome" />
            <meta property="og:title" content="Settings - UniHome" />
            <meta property="og:description" content="Adjust your account setting and preferences on UniHome. Tailor your learning experience to fit your needs." />
            <meta property="og:image" content="/src/components/Assets/images/UniHome.png" />
            <meta property="og:url" content="https://unih0me.com/setting" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="ar_EG" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Settings - UniHome" />
            <meta name="twitter:description" content="Customize your account setting and preferences on UniHome." />
            <meta name="twitter:image" content="/src/components/Assets/images/UniHome.png" />
            <link rel="canonical" href="https://unih0me.com/setting" />
        </Helmet>
    <section className="py-6">
      <div className="mb-3">
      <h1 className="text-center text-6xl font-bold text-white my-6 relative">
        <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">{t("Settings")}</span>
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
      </h1>
        {/* Centered Tabs */}
        <div className="flex justify-center">
          <TETabs>
            <TETabsItem
              onClick={() => handleColorsClick({ ...colorsActive, tab8: "tab1" })}
              active={colorsActive.tab8 === "tab1"}
              className={`${tabButtonStyles} ${colorsActive.tab8 === "tab1" ? "ActivetabsOfRoute" : ""
                }`}
            >
              {t("Account")}
            </TETabsItem>
            <TETabsItem
              onClick={() => handleColorsClick({ ...colorsActive, tab8: "tab2" })}
              active={colorsActive.tab8 === "tab2"}
              className={`${tabButtonStyles} ${colorsActive.tab8 === "tab2" ? "ActivetabsOfRoute" : ""
                }`}
            >
              {t("password")}
            </TETabsItem>
          </TETabs>
        </div>

        {/* Tab Content */}
        <div className="mt-5">
          <TETabsContent>
            <TETabsPane show={colorsActive.tab8 === "tab1"}>
              <Account />
            </TETabsPane>
            <TETabsPane show={colorsActive.tab8 === "tab2"}>
              <EditPassword />
            </TETabsPane>
          </TETabsContent>
        </div>
      </div>
    </section>
  </>
  );
}
