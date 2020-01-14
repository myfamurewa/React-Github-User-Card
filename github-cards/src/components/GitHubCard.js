import React from 'react'

export default function GitHubCard(props) {
    return (
        <div className="card">
            <img className="profile" src={props.user.avatar_url} alt={`${props.user.name}'s profile picture`} />
            <div className="card-info">
                <h3 className="name">{props.user.name}</h3>
                 <p className="username">{props.user.login}</p>
                 <p>Location: {props.user.location}</p>
                 <p>Github: <a href={props.user.html_url}>{props.user.login}</a></p>
                 <p>Followers:{props.user.followers}</p>
                 <p>Following:{props.user.following}</p>
                 <p>{props.bio}</p>
            </div>
            <div className="gitchart">
                <img  src={`http://ghchart.rshah.org/${props.user.login}`} alt={`${props.user.name}'s GitHub chart`}></img>
            </div>
        </div>
    )
}
