import React from 'react'
import HeaderSearch from './main/HeaderSearch'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'

const HeaderNew = ({ selected }) => {

  const [cookies] = useCookies()

  cookies.username = 'as'

  return (

	<header className='header_New'>
		<div className='internal_header'>
			<div className='headerNew_left'>
				<Link to='/'>
					<h1 className='header_logo'>AniType</h1>
				</Link>
			</div>
			<div className='headerNew_center'>
				<HeaderSearch />
			</div>
			<div className='headerNew_right'>
				{
					cookies.username ? (
						<>
							<Link to='/favourite'>
								<img className='favorite' alt='favorite' src='https://bit.ly/3MR0ebf'></img>
							</Link>

							<Link to='/account'>
								<img className='user_avatar' alt='avatar' src='https://bit.ly/45oczLr'></img>
							</Link>
						</>
					) : (
						<Link to='/auth/signup'>
							<img className='user_avatar' alt='avatar' src='https://bit.ly/45oczLr'></img>
						</Link>
					)
				}
			</div>
		</div>
	</header>

  )
}

export default HeaderNew