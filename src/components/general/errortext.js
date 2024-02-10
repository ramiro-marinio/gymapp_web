import React from 'react'

function ErrorText({children}) {
  if(children === ''){
    return  <></>
  }
  else{
    return <p className='text-error'>{children}</p>
  }
}

export default ErrorText