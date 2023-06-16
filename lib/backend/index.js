import axios from "axios";

export async function getNonce(_data) {
  const { data } = await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/get-nonce`,
    data: _data,
    withCredentials: true,
  });
  return data;
}

export async function doLogin(_data, setValue) {
  const { data } = await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
    data: _data,
    withCredentials: true,
  });
  setValue(data.accessToken);
  console.log(data, "login response");
  router.push("/account");
}

export async function getUsers(value, role) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user?user_role=${role}`,
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${value}`,
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function uploadAudio(value, fileToUpload) {
  const formdata = new FormData();
  formdata.append("name", "Audio Upload");
  formdata.append("file", fileToUpload);
  console.log("fileToUpload", fileToUpload);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload/audio`,
    formdata,
    {
      headers: {
        "content-type": "multipart/form-data; charset=UTF-8",
        authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function uploadImage(value, fileToUpload) {
  const formdata = new FormData();
  formdata.append("name", "Image Upload");
  formdata.append("file", fileToUpload);
  console.log("fileToUpload", fileToUpload);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload/image`,
    formdata,
    {
      headers: {
        "content-type": "multipart/form-data; charset=UTF-8",
        authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function postCollection(value, values, image) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/collection`,
    {
      title: values.collectionName,
      description: values.description,
      media_url: image,
      curator_commission: parseInt(values.commission),
      curator_time: values.duration
        ? new Date(values.duration).toISOString()
        : null,
      curator_id: values.curator === "Select curator" ? null : values.curator,
      live_time: new Date(values.releaseDate).toISOString(),
    },
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function getCollections(skip, limit) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/collection?skip=${skip}&limit=${limit}`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function getCollection() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/collection`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function getUserMe(value) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/me`, {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${value}`,
    },
  });
  const data = await res.json();

  return data;
}

export async function getCollectionsMe(value, extended) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/collection/collections/me`,
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${value}`,
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function postRecognition(value, data) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recognition`,
    data,
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function getRecognitions(value) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recognition/me`,
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function deleteRecognition(value, id) {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recognition/${id}`,
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function putUserMe(value, data) {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/me`,
    data,
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function getCollectionsSearch(search) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/collection?search=${search}`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();

  return data;
}
export async function getArtworks(skip, limit) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artwork?skip=${skip}&limit=${limit}`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function getArtworksSearch(search) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artwork?search=${search}`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function getArtworksMe(value, listed = false) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artwork/artworks/me?listed=${listed}&editions=true`,
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${value}`,
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function getArtworkById(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artwork/${id}?collection=true&editions=true&owner=true`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function getCollectionById(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artwork/${id}?artworks=true&owner=true`,
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await res.json();

  return data;
}

export async function putArtwork(value, values, artwork) {
  const detailsShots = [];
  console.log("VALUES", values);
  console.log("VALUES", values);
  console.log("VALUES", values);
  console.log("VALUES", values);

  //Main image
  let main_image = artwork.media_url;
  if (values.mainImage && values.mainImage.length > 0) {
    main_image = await uploadImage(value, values.mainImage[0]);
    console.log(main_image);
    main_image = main_image.data;
  }

  //Detail shot image
  let detailShotImageURL1 = artwork.detail_shots[0]?.image_url;
  if (values.detailShotImage1 && values.detailShotImage1.length > 0) {
    console.log("file", values.detailShotImage1[0]);
    const file = values.detailShotImage1[0];
    console.log("file in var", file);
    detailShotImageURL1 = await uploadImage(value, file);
    detailShotImageURL1 = detailShotImageURL1.data;
  }

  //Detail shot image 2
  let detailShotImageURL2 = artwork.detail_shots[1]?.image_url;
  if (values.detailShotImage2 && values.detailShotImage2.length > 0) {
    detailShotImageURL2 = await uploadImage(value, values.detailShotImage2[0]);
    detailShotImageURL2 = detailShotImageURL2.data;
  }

  //Detail shot audio
  let audio = artwork.detail_shots[0]?.audio_url;
  if (values.detailShotSound1 && values.detailShotSound1.length > 0) {
    audio = await uploadAudio(value, values.detailShotSound1[0]);
    audio = audio.data;
  }

  const detailShot1 = {
    audio_url: audio,
    caption: values.detailShotCaption1,
    image_url: detailShotImageURL1,
  };

  detailsShots.push(detailShot1);

  // Second detail shot
  const detailShot2 = {
    audio_url: null,
    caption: values.detailShotCaption2,
    image_url: detailShotImageURL2,
  };

  detailsShots.push(detailShot2);

  const royalties = values.from.map((from, i) => ({
    from: from,
    to: from,
    percentage: parseInt(values.percentage[i]),
  }));

  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artwork/${artwork.id}`,
    {
      id: artwork.id,
      name: values.name,
      year: values.year,
      media_url: main_image,
      edition_type: values.editionType,
      editions: values.editions,
      size: values.edition_type !== "NFT_Only" ? values.sizes : [""],
      paper: values.edition_type !== "NFT_Only" ? values.papers : [""],
      frame: values.edition_type !== "NFT_Only" ? values.frame : [""],
      technique: values.edition_type !== "NFT_Only" ? values.techniques : [""],
      collection_id: values.collectionId,
      royalties: royalties,
      detail_shots: detailsShots,
    },
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function postArtwork(value, values, main_image) {
  const detailsShots = [];

  let detailShotImageURL1 = null;
  if (values.detailShotImage1[0]) {
    detailShotImageURL1 = await uploadImage(value, values.detailShotImage1[0]);
  }
  let detailShotImageURL2 = null;
  if (values.detailShotImage2[0]) {
    detailShotImageURL2 = await uploadImage(value, values.detailShotImage2[0]);
  }

  let audio = null;
  if (values.detailShotSound1[0]) {
    audio = await uploadAudio(value, values.detailShotSound1[0]);
    audio = audio.data;
  }

  if (values.detailShotImage1 && values.detailShotImage1.length > 0) {
    const detailShot1 = {
      audio_url: null,
      caption: values.detailShotCaption1,
      image_url: detailShotImageURL1.data,
    };

    // Add audio URL to the first detail shot if it exists
    if (values.detailShotSound1[0]) {
      detailShot1.audio_url = audio;
    }

    detailsShots.push(detailShot1);
  }

  // Second detail shot
  if (values.detailShotImage2 && values.detailShotImage2.length > 0) {
    const detailShot2 = {
      audio_url: null,
      caption: values.detailShotCaption2,
      image_url: detailShotImageURL2.data,
    };
    detailsShots.push(detailShot2);
  }

  const royalties = values.from.map((from, i) => ({
    from: from,
    to: from,
    percentage: parseInt(values.percentage[i]),
  }));

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artwork`,
    {
      name: values.name,
      year: values.year,
      media_url: main_image.data,
      edition_type: values.edition_type,
      editions: values.editions,
      size: values.edition_type !== "NFT_Only" ? values.sizes : [""],
      paper: values.edition_type !== "NFT_Only" ? values.papers : [""],
      frame: values.edition_type !== "NFT_Only" ? values.frame[0] : [""],
      technique: values.edition_type !== "NFT_Only" ? values.techniques : [""],
      collection_id: values.collectionId,
      royalties: royalties,
      detail_shots: detailsShots,
    },
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function deleteArtwork(value, id) {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artwork/edition/${id}`,
    {
      headers: {
        "content-type": "multipart/form-data; charset=UTF-8",
        authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function uploadJSON(value, json) {
  const file = new File([JSON.stringify(json)], "file.json", {
    type: "application/json",
  });

  const formdata = new FormData();
  formdata.append("file", file);

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload/json`,
    formdata,
    {
      headers: {
        "content-type": "multipart/form-data; charset=UTF-8",
        Authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function createNFT(value, _data, id) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artwork/create/${id}`,
    _data,
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function listArtwork(value, id, list) {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artwork/artwork-listing/${id}?list=${list}`,
    {},
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}
export async function listEdition(value, id, list, signature) {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artwork/edition-listing/${id}?list=${list}`,
    { signature: signature },
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function postTransaction(value, _data) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/transaction`,
    _data,
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}
export async function mintEdition(value, _data, edition_id) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artwork/edition/mint/${edition_id}`,
    _data,
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${value}`,
      },
    }
  );
  return res;
}

export async function getCurrentExchangeRateETHUSD() {
  try {
    const { data } = await axios({
      method: "GET",
      url: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getCurrentExchangeRateUSDETH() {
  try {
    const { data } = await axios({
      method: "GET",
      url: "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=ETH",
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}
