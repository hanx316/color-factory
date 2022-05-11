import React from 'react'
import { CSSTransition } from "react-transition-group";

function debounce(func, wait) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

function Tip(props, ref) {
  const [show, setShow] = React.useState(false)
  // react-hooks/exhaustive-deps warns that useCallback must receive an inline function
  const debouncedHide = React.useCallback(debounce(() => setShow(false), 1000), []) // eslint-disable-line
  React.useImperativeHandle(ref, () => ({
    show: () => {
      setShow(true)
      debouncedHide()
    }
  }))

  // To resolve "findDOMNode is deprecated in StrictMode." warning
  const nodeRef = React.useRef(null)

  return (
    <CSSTransition
      classNames="fade"
      nodeRef={nodeRef}
      in={show}
      unmountOnExit
      timeout={200}
      addEndListener={(done) => nodeRef.current.addEventListener('transitionend', done, false)}
    >
      <div className="tip" ref={nodeRef}>
        <div>Color <span className="em">{props.color}</span> copied to your clipboard</div>
      </div>
    </CSSTransition>
  )
}

export default React.forwardRef(Tip);
