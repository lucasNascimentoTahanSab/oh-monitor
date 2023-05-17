/**
 * @file Módulo responsável pela exibição dos itens de navegação pelas seções do conteúdo
 * apresentado em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ClassroomNavigationItem from '../ClassroomNavigationItem/ClassroomNavigationItem.js';
import TabContext from '../../Context/TabContext/TabContext.js';
import NavigationItemsContext from '../../Context/NavigationItemsContext/NavigationItemsContext.js';
import Util from '../../../classes/util/Util.js';

function ClassroomNavigation() {
  const [currentTab, setCurrentTab] = useContext(TabContext);
  const [navigationItems, setNavigationItems] = useState([]);

  useEffect(() => setNavigationItems(currentTab?.navigation?.navigationItems), [currentTab]);

  /**
   * Método responsável pela exibição dos itens de navegação.
   * 
   * @returns {array}
   */
  function getNavigationItems() {
    if (!navigationItems?.length) { return null; }

    return navigationItems.map(navigationItem =>
      <ClassroomNavigationItem
        key={navigationItem?.uid}
        navigationItem={navigationItem}
        group='classroom-navigation-radio-group'
        onChange={handleNavigationItemSelection}
      />
    );
  }

  /**
   * Método responsável por configurar novo item de navegação dado item selecionado.
   * 
   * @param {object} navigationItem 
   */
  function handleNavigationItemSelection(navigationItem) {
    scrollIntoSection(navigationItem.uidParent);
    setCurrentNavigationItem(navigationItem);
  }

  /**
   * Método responsável por selecionar novo item de navegação.
   * 
   * @param {object} navigationItem 
   */
  function setCurrentNavigationItem(navigationItem) {
    unselectNavigationItem();
    selectNavigationItem(navigationItem);

    setNavigationItems([...navigationItems]);
  }

  /**
   * Método repsonsável pela marcação de um novo item de navegação, assim como item superior,
   * quando existente.
   */
  function selectNavigationItem(navigationItem) {
    const newNavigationItem = Util.getItemByUid(navigationItems, navigationItem.uidParentNavigationItem);
    const newItem = Util.getItemByUid(newNavigationItem?.navigationItems ?? navigationItems, navigationItem.uid);

    if (newNavigationItem) { newNavigationItem.current = true; }
    if (newItem) { newItem.current = true; }
  }

  /**
   * Método repsonsável por desmarcar os demais itens de navegação para marcação de um novo
   * item.
   */
  function unselectNavigationItem() {
    const currentNavigationItem = Util.getCurrentItem(navigationItems);
    const currentItem = Util.getCurrentItem(currentNavigationItem?.navigationItems);

    if (currentNavigationItem) { currentNavigationItem.current = false; }
    if (currentItem) { currentItem.current = false; }
  }

  /**
   * Método responsável por direcionar o usuário para a seção desejada.
   * 
   * @param {string} sectionId 
   */
  function scrollIntoSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView();
  }

  /**
   * Método responsável pela atualização dos itens de navegação.
   * 
   * @param {array} navigationItems 
   */
  function updateNavigationItems(navigationItems) {
    setNavigationItems(navigationItems);
    setCurrentTab({ ...currentTab, navigation: { ...currentTab.navigation, navigationItems } });
  }

  return (
    <NavigationItemsContext.Provider value={[navigationItems, updateNavigationItems]}>
      <nav className='section classroom-stage__navigation'>
        {getNavigationItems()}
      </nav>
    </NavigationItemsContext.Provider>
  );
}

export default ClassroomNavigation;