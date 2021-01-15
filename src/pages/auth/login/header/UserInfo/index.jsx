import React from 'react'
import {UserInfoStyles} from './styles'

const UserInfo = ({title, description}) => {
    return (
        <UserInfoStyles key={title}>
            <p className="title">{title}</p>
            <p className="description">{description}</p>
        </UserInfoStyles>
    )
}

export default UserInfo