export async function getSanityData({query}) {
  let encodedQuery = encodeURIComponent(query);

  const config = {
    dataset: 'production',
    projectId: '0j5eyb7h',
    token: import.meta.env.SANITY_TOKEN,
    useCdn: true,
    version: 'v2023-02-03'
  };

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
