import Head from "next/head";
import React from "react";

interface Props {
  title: string;
}

export function TabTitle(props: Props) {
  return (
    <Head>
      <title>{props.title}</title>
    </Head>
  );
}
