import React from 'react'
import { LiaAngleLeftSolid, LiaAngleDoubleLeftSolid, LiaAngleRightSolid, LiaAngleDoubleRightSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'

function PagingButton({pageInfo,searchParams}) {
  const renderPageLinks = () => {
    const {p,...rest} = searchParams ? Object.fromEntries([...searchParams]) : ''
    searchParams = new URLSearchParams(rest).toString()
    const currentPage = parseInt(p) || 1
    const lastPage = 4 
    const pageLinks = [];
    const maxVisibleLinks = 5;
    const startPage = pageInfo.total ? Math.max(1, (pageInfo.currentPage - Math.floor(maxVisibleLinks / 2) || 1)) : 0;
    pageLinks.push( 
      <React.Fragment key='backward'>
        <Link key="fast-previous" to={`?${searchParams}${searchParams ? '&' : ''}p=1`} className={`${ pageInfo.currentPage >=4 ? 'block': '!hidden'} border `}>
          <LiaAngleDoubleLeftSolid />
        </Link>
        <Link key="previous" to={`?${searchParams}${searchParams ? '&' : ''}p=${(pageInfo.currentPage || currentPage) - 1}`} className={`${ pageInfo.currentPage >= 4  ? 'block': '!hidden'} border `}>
          <LiaAngleLeftSolid />
        </Link>
      </React.Fragment>
    );

    // Numbered page links
    function button(){
      for (let i = startPage; i < startPage + maxVisibleLinks && i <= (pageInfo.lastPage + 1 || lastPage); i++) {
        pageLinks.push(
          <Link key={i} to={`?${searchParams}${searchParams ? '&' : ''}p=${i}`} className={`border ${((pageInfo.currentPage || currentPage) === i) ? 'active' :''}`}>
            {i}
          </Link>
        )
      }
    }
    pageInfo.total > 28 && button()

    // Next page link
    pageLinks.push(
      <React.Fragment key='forward'>
        <Link key="next" to={`?${searchParams}${searchParams ? '&' : ''}p=${(pageInfo.currentPage || currentPage) + 1}`} className={`border ${(pageInfo.lastPage || lastPage) <= 4 ? '!hidden': 'block'}`}>
          <LiaAngleRightSolid />
        </Link>
        <Link key="fast-next" to={`?${searchParams}${searchParams ? '&' : ''}p=${(pageInfo.lastPage + 1 || lastPage)}`} className={`border ${(pageInfo.lastPage || lastPage) <= 4 ? '!hidden': 'block'}`}>
          <LiaAngleDoubleRightSolid />
        </Link>
      </React.Fragment>
    );

    return pageLinks;
  };
  return (
    <div key='page' className='flex box-border *:flex *:items-center *:justify-center *:p-3 justify-center items-center *:w-[50px] *:h-[50px] text-zinc-400 '>
      {renderPageLinks()}
    </div>
  )
}

export default PagingButton