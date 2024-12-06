import { Leaf, HelpCircle, BadgeCheck } from 'lucide-react';

export const cardsData = [
    {
        icon: <Leaf color="#22c55e" size={40} />,
        title: 'Gardening Knowledge',
        subtitle: 'Expert Tips & Guides',
        description:
            'Discover expert gardening tips, plant care advice, and seasonal guides to help your plants thrive.',
        link: { href: '/', text: 'Explore Knowledge' },
    },
    {
        icon: <HelpCircle color="#22c55e" size={40} />,
        title: 'Community Support',
        subtitle: 'Join Our Community',
        description:
            'Connect with fellow gardeners! Share advice, upvote content, comment, and follow others to create a vibrant gardening community.',
        link: { href: '/', text: 'Join Community' },
    },
    {
        icon: <BadgeCheck color="#22c55e" size={40} />,
        title: 'Premium Access',
        subtitle: 'Unlock Exclusive Content',
        description:
            'Unlock premium content for in-depth gardening guides, exclusive tips, and special features that provide detailed insights into gardening techniques.',
        link: { href: '/', text: 'Access Premium Content' },
    },
];
