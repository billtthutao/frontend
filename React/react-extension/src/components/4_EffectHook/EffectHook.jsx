import React from 'react'
import ReactDom from 'react-dom'

export default function EffectHook() {

    const [count,setCount] = React.useState(0)
    React.useEffect(()=> {
        let timer = setInterval(()=>{
            setCount(count => count+1)
        },1000)

        return () => {
            clearInterval(timer)
        }
    },[])

    let clearComponents = () => {
        ReactDom.unmountComponentAtNode(document.getElementById('root'))
    }

    return (
        <div>
            <h2>求和结果为{count}</h2>
            <input onClick={() => setCount(count=>count+1)} type='button' value='加+1'></input>
            <input onClick={clearComponents} type='button' value='卸载组件'></input>
        </div>
    )
}
