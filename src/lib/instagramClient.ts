export async function fetchInstagramPosts(token: string) {
  const allPosts: { id: string; media_url: string; permalink: string; caption: string; media_type: string; thumbnail_url?: string }[] = [];
  let nextUrl = `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption,media_type,thumbnail_url&access_token=${token}`;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      allPosts.push(...data.data);

      // Update nextUrl to the next page, or null if no more pages
      nextUrl = data.paging?.next || null;
    }
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
  }

  return allPosts;
}