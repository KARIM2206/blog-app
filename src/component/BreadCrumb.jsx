import React from 'react'

const BreadCrumb = ({categoryName,categorySlug}) => {
  return (
    <div className='flex items-center gap-2'>
      
        <div>{categoryName}</div> <div> / </div> <div>{categorySlug}</div> 
      
    </div>
  )
}

export default BreadCrumb
