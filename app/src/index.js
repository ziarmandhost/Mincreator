import React from 'react';
import { render } from 'react-dom';

import DragAndDropArea from './components/DragAndDropArea';
import SupportedLanguages from './components/SupportedLanguages';

import './assets/css/index.css';

render((
    <div id="wrapper">
        <DragAndDropArea/>
        <SupportedLanguages/>
    </div>
), document.getElementById('root'));