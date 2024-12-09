import React, { useState } from 'react'
import classNames from 'classnames'

const DreamButton = ({
  size,
  className,
  enable,
  onClick,
  label,
  options
  // selected,
  // options
}) => {
  const [showOption, setShowOption] = useState(false)
  const buttonClasses = classNames(
    'mainBtn',
    {
      smallButton: size === 'small',
      mediumButton: size === 'medium',
      largeButton: size === 'large',
      xlargeButton: size === 'xlarge',
      removeButton: size === 'remove'
      // selected: selected,
      // deselected: !selected
    },
    className,
    { pointer: enable, not_allowed: !enable }
  )

  return (
    <div
      className={`${buttonClasses} 
      // ${enable ? 'pointer' : 'not_allowed'}`}
      onClick={enable ? onClick : undefined}
    >
      {options ? (
        <>
          <span
            onClick={e => {
              e.stopPropagation()
              setShowOption(!showOption)
            }}
            className='innerButton'
          >
            {label}
          </span>
          {showOption && (
            <div className='options'>
              {options.map((item, index) => (
                <div
                  key={index}
                  className='optionitem'
                  onClick={() => {
                    setShowOption(false)
                    console.log(`${item} selected`)
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <span className='innerButton caption'>{label}</span>
      )}
    </div>
  )
}
export default DreamButton
