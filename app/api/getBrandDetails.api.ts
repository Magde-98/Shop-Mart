export async function getBrandDetails(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    { cache: "no-store" }
  );

  return response.json();
}








