import { groq } from 'next-sanity';
import { client } from '../../../../sanity/client';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '../../../../RichTextComponents';
import Image from 'next/image';
import { urlForImage } from '../../../../sanity/lib/image';

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

  return (
    <div className='py-10'>
      <div className='relative w-full h-80'>
        <Image
          src={urlForImage(post[0].mainImage.asset._ref).url()}
          alt={post[0].title}
          fill
          className='object-contain w-full h-full'
        />
      </div>
      <h1 className='text-4xl font-bold py-2'>{post[0].title}</h1>
      <p className='py-3'>
        {new Date(post[0]._createdAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
      {post[0].body.map((post) => (
        <div key={post._key} className='py-1'>
          <PortableText value={post} components={RichTextComponents} />
        </div>
      ))}
    </div>
  );
}
