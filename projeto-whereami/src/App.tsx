/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MainLayout } from "./components/layout/MainLayout";
import { HeroSection } from "./components/sections/HeroSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { PlatformCoverageSection } from "./components/sections/PlatformCoverageSection";
import { StatsSection } from "./components/sections/StatsSection";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <MainLayout>
        <HeroSection />
        <FeaturesSection />
        <PlatformCoverageSection />
        <StatsSection />
      </MainLayout>
    </AppProvider>
  );
}
