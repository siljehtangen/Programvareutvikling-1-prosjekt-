import { ReactNode } from "react";

export default function Dashboard({ children }: { children: ReactNode }) {
  return <div className="lg:px-[250px] p-6">{children}</div>;
}
