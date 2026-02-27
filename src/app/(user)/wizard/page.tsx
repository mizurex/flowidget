"use client";

import Footer from "@/components/sections/Footer";
import UiDashBoard from "@/components/DashBoard-ui";

const MOCK_USER = { id: "preview" } as any;

export default function WizardPa() {
  return (
    <div>
            <UiDashBoard initialUser={MOCK_USER} />
      </div>
  );
}
