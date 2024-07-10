"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";
import Game from "./gameRenderer";
import LoadScrn from "../Loading/LoadScrn";

export default function Snake()
{
    const container = useRef<HTMLDivElement>(null);
    const game = useRef<Game>(new Game(15, 15, "/snake/", "SAVE04"));
    const [loading, setLoading] = useState(true);

    const renderGame = useCallback(() => {
        game.current.Update();
        game.current.Render();
        requestAnimationFrame(renderGame);
    },[]);

    useEffect(() => {
        // TODO: use getStaticProps for fetching
        game.current.InitSystems(container).then(() => {
            if(!game.current.data.fetched) return;

            game.current.Init();

            renderGame();

            setLoading(false);
        });    
    }, [renderGame])

    return (
        <>
            <div ref={container}>
            </div>
            <LoadScrn loading={loading}/>
        </>
    )
}