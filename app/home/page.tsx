import { TopMenu } from "@/components/layout/top-menu/top-menu";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10">
      <TopMenu />
      <h1 className="text-3xl font-bold">Home Page</h1>
    </div>
  );
}
