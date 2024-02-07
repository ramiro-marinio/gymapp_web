import React from 'react'

function ErrorText({children}) {
  if(children === ''){
    return  <></>
  }
  else{
    return <p style={{color:'red',fontSize:12,margin:0}}>{children}</p>
  }
}

export default ErrorText