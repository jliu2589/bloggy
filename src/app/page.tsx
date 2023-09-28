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
    <main className='max-w-5xl mx-auto'>
      <nav className='flex flex-row justify-between'>
        <h1>This is my blog.</h1>
        <div className='flex flex-col'>
          <div>Social media stuff</div>
          <div className='flex flex-row gap-5'>
            <div>About me</div>
            <div>Give me money</div>
          </div>
        </div>
      </nav>
      <section>
        <h1>Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <a href={post?.slug.current}>{post?.title}</a>
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
      <footer className=''>
        <div>Useless stuff you put in your footer</div>
      </footer>
    </main>
  );
}
