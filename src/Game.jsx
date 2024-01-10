import { useEffect } from "react";
import { useState } from "react";

export default function Game() {

    shuffleArray(weaponTypes)

    return (
        <>
        <div className="memory-container">
        {weaponTypes.map((info) => {
            return (
                <MemoryComponent imgData={info}/>
            )
        })}
        </div>
        </>
    )
}

let weaponTypes = ['1', '90', '170', '262', '345', '430', '515', '600', '698', '756', '832', '912', "997", '1076']

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}


function MemoryComponent({imgData}) {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://mhw-db.com/weapons/' + imgData)
        .then(response => response.json())
        .then(json => setData(json.assets.icon))
        .catch(error => console.error(error))
    }, []);

    return (
        <div className="component">
            <img src={data} />
        </div>
    )
}