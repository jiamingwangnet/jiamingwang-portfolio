"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { TitleFont } from "@/app/fonts";

interface pitem {
    name:string;
    uri:string;
}

export default function SpotifyPlaying()
{
    const [playlists, setPlaylists] = useState<pitem[]>([]);

    const fetchData = async () => {
        const params = new URLSearchParams();
        params.append("grant_type", 'client_credentials');

        const tokenFetch = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${(Buffer.from(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_KEY).toString('base64'))}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        });

        const tokenJson = await tokenFetch.json();
        
        const res = await fetch("https://api.spotify.com/v1/users/gnwmdlqfzzlq2c9nd18xng9aj/playlists", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${tokenJson.access_token}`
            }
        });
        
        const data = await res.json();
        const lists = [];
        for(const item of data.items)
        {
            lists.push({
                name: item.name, 
                uri: item.uri
            });
        }

        setPlaylists(lists);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="m-5">
            <h2 className={`text-lg ${TitleFont.className}`}>My Playlists</h2>
            {
                playlists.map(item => <a href={item.uri} className="m-3 text-xs font-thin">{item.name}</a>)
            }
        </div>
    );
}