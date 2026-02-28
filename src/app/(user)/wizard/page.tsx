"use client";

import Footer from "@/components/sections/Footer";
import UiDashBoard from "@/components/DashBoard-ui";
import UserWidget from "@/components/widget/UserWidgetPopup";

const MOCK_USER = { id: "preview" } as any;

export default function WizardPa() {
  return (
    <div>
            <UserWidget userId="preview" onClose={() => {}} />
      </div>
  );
}
