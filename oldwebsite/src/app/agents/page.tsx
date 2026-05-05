import { redirect } from 'next/navigation';

export default function AgentsRedirect() {
  // Redirect to the new registry location
  redirect('/registry/agents');
}