import { redirect } from 'next/navigation';

export default function MCPToolsRedirect() {
  // Redirect to the new registry location
  redirect('/registry/mcp-tools');
}