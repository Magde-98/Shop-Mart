import ProductSlider from '@/app/_component/productSlider/productSlider';
import { GetProductDetails } from '../../../api/productDetails.Api';
import AddBtn from '@/app/_component/addBtn/page';


export default async function ProductDetails({ params }: { params: { id: string } }) {
    let { id } = await params;
    const { data } = await GetProductDetails(id);

    return (
        <div className="container w-[90%] mx-auto py-10">
            <div className="flex flex-col md:flex-row gap-8">

                <div className="md:w-1/3 w-full">
                    <ProductSlider images={[data.imageCover, ...data.images]} altContent={data.title} />
                </div>


                <div className="md:w-2/3 w-full flex flex-col justify-between">
                    <div className="px-2 md:px-5">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{data.title}</h1>
                        <p className="text-gray-600 text-lg leading-relaxed">{data.description}</p>
                    </div>

                    <div className="px-2 md:px-5 mt-6">
                        <h3 className="text-green-700 text-xl font-semibold mb-4">{data.category.name}</h3>

                        <div className="flex justify-between items-center mb-6">
                            <span className="text-2xl font-bold text-green-700">{data.price} EGP</span>

                            <div className="flex items-center gap-2 text-yellow-400 text-lg">
                                <i className="fa-solid fa-star"></i>
                                <span className="text-gray-700 text-lg">{data.ratingsAverage}</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full">
                                <i className="fa-solid fa-box text-green-700 text-sm"></i>
                                Available:
                                <span className="font-bold text-gray-900">
                                    {data.quantity}
                                </span>
                            </span>
                        </div>


                        <AddBtn
                            id={data._id}
                            className="py-4 rounded-lg bg-green-700 text-white text-lg font-semibold shadow-md hover:bg-green-800"
                        />

                    </div>
                </div>

            </div>
        </div>
    );
}
