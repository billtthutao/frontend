import React from 'react'

export default function RefHook() {

    let inputRef = React.useRef()

    return (
        <div>
            <input type='text' placeholder='Input' ref={inputRef}></input>
            <input onClick={()=>alert(inputRef.current.value)} type='button' value='提示输入数据'></input>
        </div>
    )
}
