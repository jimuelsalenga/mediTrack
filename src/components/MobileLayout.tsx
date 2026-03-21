import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import BottomNav from "./BottomNav";

const MobileLayout = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto max-w-[430px] min-h-screen bg-background flex flex-col shadow-xl">
    <AppHeader />
    <main className="flex-1 overflow-y-auto">{children}</main>
    <BottomNav />
  </div>
);

export default MobileLayout;
