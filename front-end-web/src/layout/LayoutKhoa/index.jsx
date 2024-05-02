import React, { useContext } from 'react'
import Menu from '../../components/Menu'
import { Outlet } from 'react-router-dom'
import clsx from 'clsx'
import style from './layoutKhoa.module.scss'
import { MenuContext } from '../../App'

export default function LayoutKhoa() {
    const menu = useContext(MenuContext);
  return (
    <div className={clsx(style.wrap)}>
        <div className={clsx(style.menuContainer, menu.isPhone ? style.none : "" )}>
          <Menu />
        </div>
        <div className={clsx(style.screenContainer , menu.isPhone ? style.none : "" )}>
          <Outlet></Outlet>
        </div>
      </div>
  )
}
