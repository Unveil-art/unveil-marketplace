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

export async function getFooter() {
  const res = await fetch(
    `https://cumbersome-furtive-fowl.strapiapp.com/api/footers?populate=deep`,
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwODU5NjEzLCJleHAiOjE2ODM0NTE2MTN9.-TeERDZ_EYoCFVGgIhrdRV1E3YA7kAshm_NXfQq8FFU`,
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function getCollections() {
  const res = await fetch(
    `https://marketplace-backend-dev.unveil.art/api/v1/collection`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function getArtworks() {
  const res = await fetch(
    `https://marketplace-backend-dev.unveil.art/api/v1/collection`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();

  return data;
}
