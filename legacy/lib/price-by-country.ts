import { RegionCode } from "@/types/region";

export const priceByCountry = (
  price?: number | string,
  country?: RegionCode,
) => {
  if (!country) {
    country = RegionCode.Canada;
  }
  if (!price) {
    return "";
  }
  if (country === "CA") {
    return `${(+price).toFixed(2)}$`;
  } else if (country === "US") {
    return `$${(+price).toFixed(2)}`;
  }
  return `${(+price).toFixed(2)}`;
};
