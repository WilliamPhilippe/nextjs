import Head from "next/head";
import Layout from "../../components/layout";

import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticPaths() {
  console.info("getStaticPaths");
  return {
    paths: getAllPostIds(),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  console.info("getstaticprops", params);
  const postData = !params?.id?.includes("x")
    ? await getPostData(params.id)
    : { title: "this is " };
  return {
    props: {
      postData,
    },
  };
}

import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData?.title ?? "NO TITLE"}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>
          {postData?.title ?? "NO TITLE"}
        </h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData?.date} />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: postData?.contentHtml ?? "<p>no html</p>",
          }}
        />
      </article>
    </Layout>
  );
}
