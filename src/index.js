import _ from 'lodash';

function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Bringing all that matters closer to you from shopping to event planning and handling finances...', 'webpack']);
    return element;
}

document.body.appendChild(component());