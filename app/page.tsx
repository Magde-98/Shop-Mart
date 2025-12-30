import Category from "./(component)/categories/page";
import Products from "./(component)/product/page";
import MainSlider from "./_component/mainSlider/page";

export default function Home() {
  return (
    <>
      <MainSlider />
      <div>
        <Category />
        <Products title="Popular Products" />
      </div>
    </>
  );
}
