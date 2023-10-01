import { groq } from 'next-sanity';
import { client } from '../../../../sanity/client';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '../../../../RichTextComponents';

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: Props) {
  const query = groq`
  *[_type == 'post' && slug.current == '${slug}']{
    mainImage,
    slug,
    author,
    _createdAt,
    body,
    title,
  }`;

  const post = await client.fetch(query);

  console.log(post);

  return (
    <div>
      <h1>{post[0].title}</h1>
      {post[0].body.map((post) => (
        <PortableText
          value={post}
          components={RichTextComponents}
          key={post.body}
        />
      ))}
    </div>
  );
}
