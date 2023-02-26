export async function getSanityData({query}) {
  let encodedQuery = encodeURIComponent(query);

  const config = {
    dataset: 'production',
    projectId: '0j5eyb7h',
    token: import.meta.env.SANITY_TOKEN,
    useCdn: true,
    version: 'v2023-02-03'
  };

  /**
   * TODO: Add interface for parameters
   */

  // complete url consisting of <project_id>.api.sanity.io/<api version as YYYY-MM-DD>
  let url = `https://${config.projectId}.api.sanity.io/${config.version}/data/query/${config.dataset}?query=${encodedQuery}`;

  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${import.meta.env.SANITY_TOKEN}`
    }
  };

  const res = await fetch(url, fetchOptions);
  const data = await res.json();
  return data.result;
};

export const portableTextConfig = {}

export const getWidthAndHeight = ({aspect, originalWidth, originalHeight, outputWidth}) => {
  // aspect is specified as '16:9'
  const [aspectX, aspectY] = aspect.split(':').map(Number);
  // e.g. 0.5625 = 9 / 16
  const aspectNum = aspectY / aspectX;
  // calculate height based on width
  const outputHeight = outputWidth * aspectNum;
  // case 1: calculated width and height are both smaller than actual w & h
  // all good, return as is
  if (outputWidth <= originalWidth && outputHeight <= originalHeight) {
    return {
      height: Math.round(outputHeight),
      width: Math.round(outputWidth),
    }
  }
  // case 2: calculated height is larger than original height
  // use original height to calculate new width
  if (outputHeight > originalHeight) {
    const newOutputWidth = originalHeight * aspectX / aspectY;
    return {
      height: Math.round(originalHeight),
      width: Math.round(newOutputWidth),
    }
  }
  // case 3: calculated width is larger than original width
  // use original width to calculate new height
  if (outputWidth > originalWidth) {
    const newOutputHeight = originalWidth * aspectNum;
    return {
      height: Math.round(newOutputHeight),
      width: Math.round(originalWidth),
    }
  }
}

export const getUrl = ({focalPointX, focalPointY, width, height, baseUrl}) => {

  const url = new URL(baseUrl);

  url.searchParams.set('w', width);
  url.searchParams.set('h', height);

  if (focalPointX !== undefined) {
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('fp-x', focalPointX);
    url.searchParams.set('fp-y', focalPointY);
  }

  return url.href;
}
