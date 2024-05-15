import { InlineSnippet } from "@/components/form/domain-configuration";
import TopMenu from "@/components/layout/top-menu/top-menu";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10">
      <TopMenu />
      <h1 className="text-3xl font-bold">Home Page</h1>
    </div>
  );
}
