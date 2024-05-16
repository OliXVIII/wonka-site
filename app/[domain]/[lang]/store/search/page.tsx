
import { SearchComponent } from "@/components/layout/search-page";


type SearchParams = {
  params: {
    domain: string;
  };
};


const SearchPage = async ({ params }: SearchParams) => {

  return (
    <SearchComponent />
  );
}


export default SearchPage;