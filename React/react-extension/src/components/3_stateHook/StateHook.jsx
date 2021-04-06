import React from 'react'

export default function StateHook() {

    const [state,setState] = React.useState(0)

    return (
        <div>
            <h2>当前结果为:{state}</h2>
            <input onClick={() => setState(state => state+1)} type='button' value="加+1"></input>
        </div>
    )
}
