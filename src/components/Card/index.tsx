import { useState } from 'react'
import { dataType } from "../../utils/dataGroup";
import { useTimer } from '../../hooks'
import "./style.less";

const Card = ({ id, title, duration, create_time }: dataType) => {
    const [active, setActive] = useState(false)
    const [timer] = useTimer(create_time, duration)
    const clickHandle = () => {
        setActive(() => !active)
    }
    return <div className={active ? 'card card-isactive' : 'card'} onClick={clickHandle} key={id}>
        <h4 className="card-title">{title}</h4>
        <span className="card-timer">{timer}</span>
    </div>
}

export default Card