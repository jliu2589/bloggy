import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '../../../RichTextComponents';
import { client } from '../../../sanity/client';

type Post = {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
  body: any;
};

export default async function PostIndex() {
  const posts = await client.fetch<Post[]>(`*[_type == "post"]`);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <a href={post?.slug.current}>{post?.title}</a>
          <PortableText value={post.body} components={RichTextComponents} />
        </li>
      ))}
    </ul>
  );
}
