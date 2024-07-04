import React from 'react';
import Link from 'next/link';

export async function getServerSideProps() {
  const res = await fetch('https://codeboltai.web.app/api/agents/list');
  const agents = await res.json();

  return {
    props: {
      agents,
    },
  };
}

const AgentsPage = ({ agents }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agents List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <div key={agent.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{agent.title}</h2>
            <p className="text-gray-700 mb-4">{agent.description}</p>
            <Link href={`/agents/${agent.id}`} legacyBehavior>
              <a className="text-blue-500 hover:underline">View Details</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentsPage;

