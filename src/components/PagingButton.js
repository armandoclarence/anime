import React from 'react'
import { LiaAngleLeftSolid, LiaAngleDoubleLeftSolid, LiaAngleRightSolid, LiaAngleDoubleRightSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'

function PagingButton({pageInfo}) {
  console.log(pageInfo)
  const renderPageLinks = () => {
    const pageLinks = [];

    // Assuming pageInfo.lastPage is the total number of pages

    // Previous page link
    const maxVisibleLinks = 5;
    const startPage = Math.max(1, pageInfo.currentPage - Math.floor(maxVisibleLinks / 2));
    console.log(startPage === 1)
    pageLinks.push(
      <>
        <Link key="fast-previous" to={`?p=${1}`} className={`${pageInfo.currentPage < 4 ? 'hidden': 'block'} border `}>
          <LiaAngleDoubleLeftSolid />
        </Link>
        <Link key="previous" to={`?p=${pageInfo.currentPage - 1}`} className={`${pageInfo.currentPage < 4 ? 'hidden': 'block'} border `}>
          <LiaAngleLeftSolid />
        </Link>
      </>
    );

    // Numbered page links
    for (let i = startPage; i < startPage + maxVisibleLinks && i <= pageInfo.lastPage + 1; i++) {
      pageLinks.push(
        <Link key={i} to={`?p=${i}`} className={`border ${pageInfo.currentPage === i ? 'active' :''}`}>
          {i}
        </Link>
      );
    }

    // Next page link
    pageLinks.push(
      <>
        <Link key="next" to={`?p=${pageInfo.currentPage + 1}`} className='border '>
          <LiaAngleRightSolid />
        </Link>
        <Link key="fast-next" to={`?p=${pageInfo.lastPage + 1}`} className='border '>
          <LiaAngleDoubleRightSolid />
        </Link>
      </>
    );

    return pageLinks;
  };
  return (
    <div className='flex box-border *:flex *:items-center *:justify-center *:p-3 justify-center items-center *:w-[50px] *:h-[50px] text-zinc-400 '>
      {renderPageLinks()}
    </div>
  )
}

export default PagingButton