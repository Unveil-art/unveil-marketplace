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

export async function getEditorials() {
  const res = await fetch(
    "https://cumbersome-furtive-fowl.strapiapp.com/api/editorials?populate=deep&sort[0]=createdAt%3Adesc",
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

export async function getEditorialDetails(slug) {
  const res = await fetch(
    `https://cumbersome-furtive-fowl.strapiapp.com/api/editorials?populate=deep&filters[slug][$eq]=${slug}`,
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
export async function getTwoEditorials(slug) {
  const res = await fetch(
    `https://cumbersome-furtive-fowl.strapiapp.com/api/editorials?populate=deep&pagination[page]=1&pagination[pageSize]=2&sort[0]=createdAt%3Adesc`,
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
