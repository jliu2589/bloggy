import Image from 'next/image';
import { client } from '../../sanity/client';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '../../RichTextComponents';
import Link from 'next/link';
import { urlForImage } from '../../sanity/lib/image';

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
        <div className='grid grid-cols-1 md:grid-cols-2 px-10 gap-10 gap-y-16'>
          {posts.map((post) => (
            <Link href={'blog/' + post?.slug.current} key={post._id}>
              <div className='py-5 flex flex-col cursor-pointer group'>
                <div className='relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out'>
                  <Image
                    src={urlForImage(post.mainImage).url()}
                    alt={post.title}
                    className='object-cover object-left lg:object-center'
                    fill
                  />
                  <div className='absolute bottom-0 w-full bg-opacity-20 bg-black background-blur-lg rounded drop-shadow-lg text-white p-5 flex justify-between'>
                    <div className=''>
                      <p>{post.title}</p>
                      <p>
                        {new Date(post._createdAt).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
