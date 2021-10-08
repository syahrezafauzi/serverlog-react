import dynamic from 'next/dynamic';

export default ()=> {
    return (
        <div>
            <header/>
            <DynamicComponent/>
            <p>Home Page is Here!</p>
        </div>
    )
};

// const Content2 = dynamic(()=> "test").then((mod) => mod.Hello());

const DynamicComponent = dynamic(() => import('../log/content'))


// export async function getStaticProps() {
//     // Call an external API endpoint to get posts.
//     // You can use any data fetching library
//     const res = await fetch('/api/log')
//     const posts = await res.json()

//     console.log(res)
//     console.log(posts)
  
//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//       props: {
//         posts,
//       },
//     }
//   }