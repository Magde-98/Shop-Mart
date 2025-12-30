

export async function GetProductsByCategory(categoryId: string) {
    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
        { cache: "no-store" }
    );

    const result = await response.json();
    return result;
}
