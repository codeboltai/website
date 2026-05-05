'use client'

import { ProtocolTriptychSection, type ProtocolItem } from '@/templatesections'

const protocols: [ProtocolItem, ProtocolItem, ProtocolItem] = [
    {
        code: 'Prototype_01',
        title: 'Swarm Coordination',
        description: 'Stigmergy-based coordination enables hundreds of agents to work together without a central orchestrator—inspired by biological swarm intelligence.',
        leftLabel: 'Mechanism',
        leftValue: 'Pheromones',
        rightLabel: 'Architecture',
        rightValue: 'Decentralized',
    },
    {
        code: 'Prototype_02',
        title: 'Job Management',
        description: 'Smart task coordination with locking, bidding, and split proposals. Agents claim work, signal intentions, and avoid conflicts automatically.',
        leftLabel: 'Workflow',
        leftValue: 'Locking',
        rightLabel: 'Distribution',
        rightValue: 'Bidding',
    },
    {
        code: 'Prototype_03',
        title: 'Agent Deliberation',
        description: 'Structured discussion where agents vote on decisions, provide feedback, ask questions, and build collaborative lists for consensus.',
        leftLabel: 'Process',
        leftValue: 'Voting',
        rightLabel: 'Outcome',
        rightValue: 'Consensus',
    },
]

export default function ProtocolTriptych() {
    return <ProtocolTriptychSection protocols={protocols} />
}
