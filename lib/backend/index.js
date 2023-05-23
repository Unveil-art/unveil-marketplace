import axios from "axios";

export async function getUsers(value) {
  const res = await fetch(
    "https://marketplace-backend-dev.unveil.art/api/v1/user",
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

export async function uploadImage(value, fileToUpload) {
  const formdata = new FormData();
  formdata.append("name", "Image Upload");
  formdata.append("file", fileToUpload);
  console.log("fileToUpload", fileToUpload);

  const res = await axios.post(
    "https://marketplace-backend-dev.unveil.art/api/v1/upload/image",
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
    "https://marketplace-backend-dev.unveil.art/api/v1/collection",
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

export async function getCollection(value) {
  const res = await fetch(
    "https://marketplace-backend-dev.unveil.art/api/v1/collection",
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

export async function postArtworks(
  value,
  values,
  main_image,
  detailShotImage1,
  detailShotImage2,
  audio
) {
  const detailsShots = [];

  if (values.detailShotImage1 && values.detailShotImage1.length > 0) {
    const detailShot1 = {
      audio_url: null,
      caption: values.detailShotCaption1,
      image_url: detailShotImage1,
    };

    // Add audio URL to the first detail shot if it exists
    if (values.detailShotSound1 && values.detailShotSound1.length > 0) {
      detailShot1.audio_url = URL.createObjectURL(values.detailShotSound1[0]);
    }

    detailsShots.push(detailShot1);
  }

  // Second detail shot
  if (values.detailShotImage2 && values.detailShotImage2.length > 0) {
    const detailShot2 = {
      audio_url: null,
      caption: values.detailShotCaption2,
      image_url: detailShotImage2,
    };
    detailsShots.push(detailShot2);
  }

  const royalties = values.from.map((from, i) => ({
    from: from,
    percentage: parseInt(values.percentage[i]),
  }));

  const res = await axios.post(
    "https://marketplace-backend-dev.unveil.art/api/v1/artwork",
    {
      name: values.name,
      year: values.year,
      media_url: main_image,
      edition_type: values.edition_type,
      editions: values.editions,
      size: values.sizes,
      paper: values.papers,
      frame: values.frame[0],
      technique: values.techniques,
      collection_id: values.collection_id,
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
