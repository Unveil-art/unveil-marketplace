import React, { useMemo } from 'react'
import Link from 'next/link'

const ArtistCard = ({ user, handleUnFollow }) => { 

  const userData = useMemo(() => {

    return {
      id: user?.id,
      name: `${user?.firstName} ${user?.lastName}`,
      profile: user?.profileUrl || '',
      emailName: user?.email?.split('@')[0],
      firstName: user?.firstName,
      lastName: user?.lastName,
      isNoName: Boolean(!user?.firstName && !user?.lastName)
    }
  }, [user])
  return (
    <>
      <div className='w-full flex flex-row justify-between items-center'>
        {/* contain the profile and name */}
        <div className='flex justify-center items-center gap-4 md:gap-10'>
          <Link href={`/people/${userData?.id}`}>
            {
              userData?.profile ? (
                <div className='h-[136px] w-[106px] md:h-[140px] md:w-[120px] my-2.5'>
                  <img src={userData?.profile} alt='user-profile' className='w-full h-full' />
                </div>
              ) : (
                <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-2.5"></div>
              )
            }
          </Link>

          <Link href={`/people/${userData?.id}`}><p className='s2 cursor-pointer'>{ userData?.isNoName ? userData?.emailName : userData?.name }</p></Link>
        </div>

        <button
          className='btn btn-secondary cursor-pointer border hover:border-unveilDrakGray border-bgColorHover px-3 py-2 rounded-md'
          onClick={handleUnFollow}
        >
          Unfollow
        </button>
      </div>
    </>
  )
}

export default ArtistCard