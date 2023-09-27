// ./src/app/page.tsx
// ./src/utils/sanity/client.ts
import { createClient } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '../../../RichTextComponents';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID; // "pv8y60vp"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET; // "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
});

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

  console.log(posts);

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
