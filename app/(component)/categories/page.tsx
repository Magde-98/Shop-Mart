import CategorySlider from "@/app/_component/categorySlider/page";
import { GetAllCategories } from "@/app/api/allCategories.Api";

export default async function Category() {
  const { data } = await GetAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 my-10">
      <CategorySlider category={data} />
    </div>
  );
}


