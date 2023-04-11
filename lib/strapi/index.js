export async function getHomePage() {
  const res = await fetch(
    "https://cumbersome-furtive-fowl.strapiapp.com/api/homepages?populate=deep,8",
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function getFAQ() {
  const res = await fetch(
    "https://cumbersome-furtive-fowl.strapiapp.com/api/faqs?populate=deep",
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );
  const data = await res.json();

  return data;
}
