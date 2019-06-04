import React from 'react';

function Language (props) {
    return (
        <div>
            <img src={require(`../assets/images/languages/${props.title}.png`)} alt={props.title} />
        </div>
    )
}

export default Language;
