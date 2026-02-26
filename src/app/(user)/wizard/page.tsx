"use client";

import Footer from "@/components/sections/Footer";
import RedesignedDashboard2 from "./Wizardpage";
import Logo from "@/components/svg/logo";
import UiDashBoard from "@/components/DashBoard-ui";
import DiagonalPattern from "@/components/hero/pattern";
import WizardPage from "./Wizardpage";

const MOCK_USER = { id: "preview" } as any;

export default function WizardPa() {
  return (
    <div>
            <WizardPage user={MOCK_USER} widget={null} onSuccess={() => {}} />
      </div>
  );
}
