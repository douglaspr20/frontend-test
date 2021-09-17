/**
 * Get cute dog pictures from reddit!
 * @param {number} length
 * @returns {Promise<Array<{ title: string, url:string }>}
 */
export const getDogs = (length = 3) => {
  const limit = 2 * length; // get double the requested posts because some don't have images
  return fetch(`https://www.reddit.com/r/dogswithjobs/.json?limit=${limit}`)
    .then((response) => response.json())
    .then((response) => {
      const dogs = [];
      response.data.children.forEach((c) => {
        const title = c.data.title;
        const url = c.data.preview?.images[0]?.resolutions[2]?.url;
        if (url) {
          dogs.push({ title: title, url: url.replaceAll("&amp;", "&") });
        }
      });
      return dogs.slice(0, length); // remove the extra dogs
    });
};
