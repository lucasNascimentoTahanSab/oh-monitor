/**
 * @file Módulo responsável pela exibição do item de navegação recebido para acesso à
 * seção em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ButtonArrow from '../../ButtonComponents/ButtonArrow/ButtonArrow.js';
import NavigationItemsContext from '../../Context/NavigationItemsContext/NavigationItemsContext.js';
import Util from '../../../classes/util/Util.js';

function ClassroomNavigationItem(props) {
  const [navigationItems, setNavigationItems] = useContext(NavigationItemsContext);
  const [navigationItem, setNavigationItem] = useState(null);

  useEffect(() => setNavigationItem(props.navigationItem), [props.navigationItem]);

  /**
   * Método responsável pela exibição do item de navegação atual.
   * 
   * @returns {ReactElement}
   */
  function getNavigationItem() {
    return navigationItem?.uuidParent ? getUnitaryNavigationItem() : getDropdownNavigationItem();
  }

  /**
   * Método repsonsável pela exibição do item de navegação atual quando possuir itens 
   * de navegação vinculados.
   * 
   * @returns {ReactElement}
   */
  function getDropdownNavigationItem() {
    return (
      <div className='menu__item'>
        <ButtonArrow
          width='.875rem'
          height='.875rem'
          fill={`${navigationItem?.current ? '#3498DB' : '#84C7E6'}`}
          open={navigationItem?.open}
          onClick={() => Util.toggleOpen(navigationItems, setNavigationItems)(navigationItem.uuid)} />
        <span className={getItemClass()}>{navigationItem?.title}</span>
      </div>
    );
  }

  /**
   * Método repsonsável pela exibição do item de navegação atual quando não possuir
   * itens de navegação vinculados.
   * 
   * @returns {ReactElement}
   */
  function getUnitaryNavigationItem() {
    return (
      <div className='menu__item'>
        <input
          id={navigationItem?.uuid}
          className='menu__item-radio'
          type='radio'
          name={props.group}
          checked={getChecked()}
          onChange={() => Util.handle(props.onChange, navigationItem)} />
        <label className={getItemClass()} htmlFor={navigationItem?.uuid}>{navigationItem?.title}</label>
      </div>
    );
  }

  function getItemClass() {
    return `sidebar-item__name navigation-item no-select overflow-ellipsis ${navigationItem?.current ? 'sidebar-item--selected' : ''}`;
  }

  function getChecked() {
    return navigationItem?.current ?? false;
  }

  /**
   * Método responsável pela exibição dos itens de navegação relacionados ao item de
   * navegação pai, quando houverem.
   * 
   * @returns {ReactElement}
   */
  function getNavigation() {
    if (!navigationItem?.navigationItems?.length) { return null; }

    return (<nav className={getChildItemsClass()}>{getNavigationItems()}</nav>);
  }

  function getNavigationItems() {
    return navigationItem.navigationItems.map(item =>
      <ClassroomNavigationItem key={item?.uuid} navigationItem={item} group={props.group} onChange={props.onChange} />
    );
  }

  function getChildItemsClass() {
    return `classroom-stage__navigation navigation-item__navigation-items ${!navigationItem?.open ? 'erase' : ''}`;
  }

  return (
    <div>
      {getNavigationItem()}
      {getNavigation()}
    </div>
  );
}

export default ClassroomNavigationItem;