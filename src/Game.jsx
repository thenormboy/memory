import { useEffect } from "react";
import { useState } from "react";

let clickedWeapons = []

export default function Game({weaponTypes}) {

    shuffleArray(weaponTypes)

    const [elements, setElements] = useState(weaponTypes)
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)

    function handleClick(event) {
        let changedArray = shuffleArray(elements)

        if (clickedWeapons.length == 14) {
            clickedWeapons = []
        }

        if (!clickedWeapons.includes(event.target.className)) {
            clickedWeapons.push(event.target.className)
            setScore(score + 1)

            if (score >= bestScore) {
                setBestScore(score + 1)
            }

        } else {
            setScore(0)
            clickedWeapons = []
        }

        setElements([...changedArray])
    }

    return (
        <>
        <div className="score-section">
            <div>Score: {score}</div>
            <div>Best Score: {bestScore}</div>
        </div>
        <div className="memory-container">
        {elements.map((info, index) => {
            return (
                <button className="component" onClick={(event) => handleClick(event)}>
                    <MemoryComponent key={info} imgKey={info} imgData={info}/>
                </button>
            )
        })}
        </div>
        </>
    )
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return (array)
}


function MemoryComponent({imgData, imgKey}) {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://mhw-db.com/weapons/' + imgData)
        .then(response => response.json())
        .then(json => setData(json.assets.icon))
        .catch(error => console.error(error))
    }, []);

    return (
        <img className={imgKey} src={data} />
    )
}