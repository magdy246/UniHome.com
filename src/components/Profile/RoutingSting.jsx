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
      <title>Settings</title>
      <meta name="description" content="قم بإدارة إعدادات بروفايلك كطالب بسهولة. تحديث معلوماتك الشخصية، تغيير كلمة المرور، وضبط إشعارات الحساب لتناسب احتياجاتك." />

    </Helmet>
    <section className="py-6">
      <div className="mb-3">
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
            {/* <TETabsItem
            onClick={() => handleColorsClick({ ...colorsActive, tab8: "tab3" })}
            active={colorsActive.tab8 === "tab3"}
            className={`${tabButtonStyles} ${
              colorsActive.tab8 === "tab3" ? "ActivetabsOfRoute" : ""
            }`}
          >
            Profile
          </TETabsItem> */}
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
            {/* <TETabsPane show={colorsActive.tab8 === "tab3"}>
            <ProfileSettings />
            </TETabsPane> */}
          </TETabsContent>
        </div>
      </div>
    </section>
  </>
  );
}
