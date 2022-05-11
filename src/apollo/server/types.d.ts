declare namespace AppTypes {
  type BloggerArgs = { name: string; tiktok_id: string };

  type Blogger = BloggerArgs & {
    id: string;
  };
}
