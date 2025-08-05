import { redirect } from 'next/navigation';

export default function RegistryPage() {
  // Redirect to AI Agents by default
  redirect('/registry/agents');
}