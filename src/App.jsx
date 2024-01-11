import './App.css'
import Header from './Header'
import Game from './Game'

let weaponInfo = ['1', '90', '170', '262', '345', '430', '515', '600', '698', '756', '832', '912', "997", '1076']

function App() {

  return (
    <>
      <Header />
      <Game weaponTypes={weaponInfo}/>
    </>
  )
}

export default App
