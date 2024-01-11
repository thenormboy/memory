import { useEffect } from "react";
import { useState } from "react";

export default function Game({weaponTypes}) {

    shuffleArray(weaponTypes)

    const [elements, setElements] = useState(weaponTypes)
    const [count, setCount] = useState(0)

    function handleClick() {
        let changedArray = shuffleArray(elements)
        //console.log(changedArray)
        setCount(count + 1)
        setElements([...changedArray])
    }

    console.log(count)

    return (
        <>
        <div className="memory-container">
        {elements.map((info, index) => {
            return (
                <button className="component" onClick={() => handleClick()}>
                    <MemoryComponent key={Date.now()} imgData={info}/>
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


function MemoryComponent({imgData}) {

    const [data, setData] = useState(null);

    //console.log(imgData)

    useEffect(() => {
        fetch('https://mhw-db.com/weapons/' + imgData)
        .then(response => response.json())
        .then(json => setData(json.assets.icon))
        .catch(error => console.error(error))
    }, []);

    return (
        <img key={Date.now()} src={data} />
    )
}