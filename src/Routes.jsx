import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import WelcomeStoryGallery from "pages/welcome-story-gallery";
import StoryGenerationProgress from "pages/story-generation-progress";
import InteractiveStoryReader from "pages/interactive-story-reader";
import StoryLibraryManagement from "pages/story-library-management";
import StoryCreationWizard from "pages/story-creation-wizard";
import AccountSettingsProfiles from "pages/account-settings-profiles";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Header />
        <RouterRoutes>
          <Route path="/" element={<WelcomeStoryGallery />} />
          <Route path="/welcome-story-gallery" element={<WelcomeStoryGallery />} />
          <Route path="/story-generation-progress" element={<StoryGenerationProgress />} />
          <Route path="/interactive-story-reader" element={<InteractiveStoryReader />} />
          <Route path="/story-library-management" element={<StoryLibraryManagement />} />
          <Route path="/story-creation-wizard" element={<StoryCreationWizard />} />
          <Route path="/account-settings-profiles" element={<AccountSettingsProfiles />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;