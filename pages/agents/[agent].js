import React from 'react';

export async function getStaticPaths() {
  const res = await fetch('https://codeboltai.web.app/api/agents/list');
  const agents = await res.json();

  const paths = agents.map((agent) => ({
    params: { agent: agent.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch('https://codeboltai.web.app/api/agents/list');
  const agents = await res.json();
  const agent = agents.find((a) => a.id === params.agent);

  return {
    props: {
      agent,
    },
  };
}

const AgentPage = ({ agent }) => {
  return (
    <div>
      <h1>{agent.title}</h1>
      <p>{agent.description}</p>
      <p>{agent.longDescription}</p>
    </div>
  );
};

export default AgentPage;