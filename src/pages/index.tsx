// SPA - atualiza após o carregamento da padina e sempre que acessada  ===> ex.: useEffect
// SSR - atualiza no servidor e sempre que acessada ===> ex.: getServerSideProps e "component(props)"
// SSG - atualiza apenas a quantidade de vezes definida ===> ex.: getStaticProps e "component(props)"

/*
  import { useEffect } from "react";

  export default function Home() {
    useEffect(() => {
      fetch("http://localhost:3333/episodes")
        .then((Response) => Response.json())
        .then((data) => console.log(data));
    }, []);

    return <h1>Index</h1>;
  }
*/

/*
  export default function Home(props) {
    console.log(props.episodes);
    return <h1>Index</h1>;
  }

  export async function getServerSideProps() {
    const response = await fetch("http://localhost:3333/episodes");
    const data = await response.json();

    return {
      props: {
        episodes: data,
      },
    };
  }
*/

export default function Home(props) {
  console.log(props.episodes);
  return <h1>Index</h1>;
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
}
