const HEAD = (
  <div className="head" />
)

const BODY = (
  <div className="body" />
)

const R_ARM = (
  <div className="r_arm" />
)

const L_ARM = (
  <div className="l_arm" />
)

const R_LEG = (
  <div className="r_leg" />
)

const L_LEG = (
  <div className="l_leg" />
)

const BODY_PARTS = [HEAD, BODY, R_ARM, L_ARM, R_LEG, L_LEG]

type HangmanDrawingProps = {
  numberOfGuesses : number
}

export function HangmanDrawing({numberOfGuesses} : HangmanDrawingProps) {
  return (
    <div className='hd__root--div'>
        {BODY_PARTS.slice(0, numberOfGuesses)}
        <div className='hd__hl--top'/>
        <div className="hd__rope"/>
        <div className='hd__vl'/>
        <div className='hd__hl--bottom'/>
    </div>
  )
}
