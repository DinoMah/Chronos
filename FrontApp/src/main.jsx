import './style.css'
import { createIcons, Search } from 'lucide';
import { render } from 'inferno';
import ScheduleView from './ScheduleComponents/ScheduleView.jsx';

createIcons({
  attrs: {
    'stroke-width': 1,
    stroke: "#000000"
  },
  icons: {
    Search
  }
});

const appDiv = document.getElementById("app");

render(<ScheduleView/>, appDiv);