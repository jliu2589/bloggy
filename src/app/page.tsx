import Image from 'next/image';
import { client } from '../../sanity/client';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '../../RichTextComponents';

type Post = {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
  body: any;
  mainImage: string;
};

export default async function Home() {
  const posts = await client.fetch<Post[]>(`*[_type=='post']`);

  console.log(posts.length);

  return (
    <main className='flex flex-col min-h-screen'>
      <section className='py-10'>
        <h1 className='text-5xl pb-5'>Blog</h1>
        <ul>
          {posts.map((post) => (
            <li
              key={post._id}
              className='py-5 border-b-2 border-gray-200 border-opacity-20'
            >
              <a
                href={'blog/' + post?.slug.current}
                className='text-2xl hover:italic'
              >
                {post?.title}
              </a>
              <div className='w-10 h-10'>
                <PortableText
                  value={post.mainImage}
                  components={RichTextComponents}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
