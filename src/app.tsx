import { useState } from 'preact/hooks'
import './app.css'

interface NavItem {
  title: string;
  url: string|null;
  children: NavItem[]
}

const nav: NavItem[]  = [
  {
    title: 'Button',
    url: '/button.html',
    children: [],
  },
  {
    title: 'Card',
    url: '/card.html',
    children: [],
  },
]

export function App() {

const doClick = (item:NavItem) => {
  console.log(item.url)
}

  return (
    <>
      <nav>
        <ul>
          {nav.map((item) => <li><button onClick={() => doClick(item)}>{item.title}</button></li>)}
        </ul>
      </nav>

      <iframe>

      </iframe>

    </>
  )
}
