import { useSelector } from 'react-redux'

import './Sidebar.css'

export function Sidebar() {
  const left = useSelector((state) => state.modal.left)
  return (
    <div className="sidebar">
      <div className="content">
        <div className='poke-title'>  
            <p>Comparing pokemon </p>
        </div>
        <div className='poke-name'>
            <p>{String(left.name).toUpperCase()}</p>
        </div>
      </div>
    </div>
  )
}
