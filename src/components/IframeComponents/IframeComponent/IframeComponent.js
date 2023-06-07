/**
 * @file Módulo responsável pela exibição de de iframes aos usuários.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect } from 'react';
import LoadingComponent from '../../LoadingComponents/LoadingComponent/LoadingComponent.js';
import Util from '../../../classes/util/Util.js';

function IframeComponent(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { Util.handle(props.setUser, { ...props.user, screen: window.location.pathname }); }, []);

  return (
    <div className="tcc-classroom__section-container">
      <iframe src={props.src} title={props.title} width='100%' height='100%' frameborder='0' marginheight='0' marginwidth='0'>
        <LoadingComponent />
      </iframe>
    </div>
  );
}

export default IframeComponent;