import CategorySlider from '@/app/_component/categorySlider/page';
import { GetAllCategories } from '@/app/api/allCategories.Api';


export default async  function Category() {
   let {data} =  await GetAllCategories();
  
  return (
    <div className="w-[90%] mx-auto">
      <CategorySlider category={data}></CategorySlider>
    </div>
  )
}
