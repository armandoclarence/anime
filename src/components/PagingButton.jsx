import {Fragment} from 'react'
import { LiaAngleLeftSolid, LiaAngleDoubleLeftSolid, LiaAngleRightSolid, LiaAngleDoubleRightSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'

function PagingButton({pageInfo,searchParams}) {
  const renderPageLinks = () => {
    const currentPage = searchParams.get('p') || 1
    const {p,...rest} = Object.fromEntries([...searchParams])
    const updatedParams = new URLSearchParams(rest).toString()
    const lastPage = 4 
    const pageLinks = [];
    const maxVisibleLinks = 5;
    const startPage = Math.max(1, (parseInt(currentPage) - Math.floor(maxVisibleLinks / 2) || 1));
    pageLinks.push( 
      <Fragment key='backward'>
        <Link key="fast-previous" aria-label='fast-previous' to={`?${updatedParams}${updatedParams? '&':''}p=1`} className={`${ parseInt(currentPage) >=4 ? 'block': '!hidden'} border `}>
          <LiaAngleDoubleLeftSolid />
        </Link>
        <Link key="previous" aria-label='previous' to={`?${updatedParams}${updatedParams ? '&' : ''}p=${ Math.max(1,parseInt(currentPage) - 1)}`} className={`${ parseInt(currentPage) >= 4  ? 'block': '!hidden'} border `}>
          <LiaAngleLeftSolid />
        </Link>
      </Fragment>
    );
    // Numbered page links
    function button(){
      for (let i = startPage; i < startPage + maxVisibleLinks && i <= (pageInfo?.lastPage + 1 || pageInfo?.last_visible_page || lastPage); i++) {
        pageLinks.push(
          <Link key={i} to={`?${updatedParams}${updatedParams ? '&' : ''}p=${i}`} className={`border ${(parseInt(currentPage) === i) ? 'active' :''}`}>
            {i}
          </Link>
        )
      }
    }
    button()

    // Next page link
    pageLinks.push(
      <Fragment key='forward'>
        <Link key="next" aria-label='next' to={`?${updatedParams}${updatedParams ? '&' : ''}p=${parseInt(currentPage) + 1}`} className={`border ${(pageInfo.lastPage || lastPage) <= 4 ? '!hidden': 'block'}`}>
          <LiaAngleRightSolid />
        </Link>
        <Link key="fast-next" aria-label='fast-next' to={`?${updatedParams}${updatedParams ? '&' : ''}p=${(pageInfo.lastPage + 1 || lastPage)}`} className={`border ${(pageInfo.lastPage || lastPage) <= 4 ? '!hidden': 'block'}`}>
          <LiaAngleDoubleRightSolid />
        </Link>
      </Fragment>
    );

    return pageLinks;
  };
  return (
    <div key='page' className='flex box-border pt-4 *:flex *:items-center *:justify-center *:p-3 justify-center items-center *:w-[50px] *:h-[50px] text-zinc-400 '>
      {renderPageLinks()}
    </div>
  )
}

export default PagingButton