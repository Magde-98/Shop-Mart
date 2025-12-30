
export async function GetAllProducts() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    { cache: "no-store" }
  );

  const result = await response.json();
  return result;
}


export async function GetProductsByBrand(brandId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
    { cache: "no-store" }
  );

  const result = await response.json();
  return result; 
}
