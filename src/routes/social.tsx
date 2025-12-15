import { Background } from '@/components/background'
import { Carder } from '@/components/ui/carder'
import { createFileRoute } from '@tanstack/react-router'
import { FaDiscord, FaInstagram, FaGithub, FaReddit, FaYoutube } from 'react-icons/fa'
import { SiImgur, SiTiktok } from 'react-icons/si'

export const Route = createFileRoute('/social')({
    component: RouteComponent,
})

function RouteComponent() {
    const social = [
        {
            icon: <FaDiscord />,
            title: 'Discord',
            url: 'https://discord.com/users/910877275203989505',
            description: 'Join me on Discord',
        },
        {
            icon: <FaInstagram />,
            title: 'Instagram',
            url: 'https://instagram.com/devularia',
            description: 'Follow me on Instagram',
        },
        {
            icon: <FaGithub />,
            title: 'GitHub',
            url: 'https://github.com/devularia',
            description: 'Check out my GitHub projects',
        },
        {
            icon: <FaReddit />,
            title: 'Reddit',
            url: 'https://reddit.com/user/devularia',
            description: 'Follow me on Reddit',
        },
        {
            icon: <FaYoutube />,
            title: 'YouTube',
            url: 'https://www.youtube.com/@devularia',
            description: 'Subscribe to my channel on YouTube',
        },
        {
            icon: <SiImgur />,
            title: 'Imgur',
            url: 'https://imgur.com/user/devularia',
            description: 'Follow me on Imgur',
        },
        {
            icon: <SiTiktok />,
            title: 'TikTok',
            url: 'https://www.tiktok.com/@devularia',
            description: 'Follow me on TikTok',
        },
    ]

    return <div className="relative flex flex-col items-center">
        <Background imageUrl="/backgrounds/nature/2.png" />
        <Carder cards={social} />
    </div>
}
