import { Locale } from "@/types/languages";

type HomePageProps = {
  params: { lang: Locale };
};
const HomePage = ({ params }: HomePageProps) => {
  return <div className="m-auto flex flex-col justify-center pt-52"></div>;
};

export default HomePage;
