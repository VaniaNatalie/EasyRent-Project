import React from "react";
import {
  WelcomeSection,
  IntroSection,
  ExploreSection,
  AboutSection,
  JoinUsSection,
  ContactHomeSection,
  RenterRecommendation,
  LandlordPost,
} from "../../components";
import {
  homeObjOne,
  homeObjTwo,
  homeObjThree,
  homeObjTenant,
  homeObjLandlord,
  homeObjAdmin,
  homeObjTenantIntro,
  homeObjLandlordIntro,
} from "./Data";
import { authenticationService } from "../../services/authentication.service";

const Home = () => {
  const currentUser = authenticationService.getCurrentUser();
  return (
    <>
      {currentUser && (
        <>
          {currentUser.user.role === "tenant" && (
            <>
              <WelcomeSection {...homeObjTenant} />
              <IntroSection {...homeObjTenantIntro} />
              <RenterRecommendation />
              <ContactHomeSection />
            </>
          )}
          {currentUser.user.role === "landlord" && (
            <>
              <WelcomeSection {...homeObjLandlord} />
              <IntroSection {...homeObjLandlordIntro} />
              <LandlordPost />
              <ContactHomeSection />
            </>
          )}
          {currentUser.user.role === "admin" && (
            <>
              <WelcomeSection {...homeObjAdmin} />
            </>
          )}
        </>
      )}
      {!currentUser && (
        <>
          <WelcomeSection {...homeObjOne} />
          <IntroSection {...homeObjTwo} />
          <ExploreSection />
          <AboutSection />
          <JoinUsSection {...homeObjThree} />
          <ContactHomeSection />
        </>
      )}
    </>
  );
};

export default Home;
