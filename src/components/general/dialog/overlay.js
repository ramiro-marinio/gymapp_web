import React from 'react'
function Overlay({children}) {
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default Overlay