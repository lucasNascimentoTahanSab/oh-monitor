/**
 * @file Módulo responsável pela exibição de formulário Google para avaliação dos usuários.
 * @copyright Lucas N. T. Sab 2023
 */
import React from 'react';
import LoadingComponent from '../../LoadingComponents/LoadingComponent/LoadingComponent';

function FormComponent(props) {
  return (
    <div className="tcc-classroom__section-container">
      <iframe src={props.src} title={props.title} width='100%' height='100%' frameborder='0' marginheight='0' marginwidth='0'>
        <LoadingComponent />
      </iframe>
    </div>
  );
}

export default FormComponent;