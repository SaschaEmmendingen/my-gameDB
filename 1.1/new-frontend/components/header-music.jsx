import { Link } from 'react-router-dom';

//! ORIGIN
const Header = () => {
  // State für die Auswahl der Dropdown-Menüs
  const [menu1Selection, setMenu1Selection] = React.useState('');
  const [menu2Selection, setMenu2Selection] = React.useState('');
  const [menu3Selection, setMenu3Selection] = React.useState('');

  // Optionen für jedes Dropdown-Menü mit individuellen Namen
  const menuOptions1 = [
    { id: 'opt1-1', name: '| Title' },
    { id: 'opt1-2', name: '| Release' },
    { id: 'opt1-3', name: '| Genre' },
    { id: 'opt1-4', name: '| Rating' },
  ];

  const menuOptions2 = [
    { id: 'opt2-1', name: '| Option 2.1' },
    { id: 'opt2-2', name: '| Option 2.2' },
    { id: 'opt2-3', name: '| Option 2.3' },
  ];

  const menuOptions3 = [
    { id: 'opt3-1', name: '| Option 3.1' },
    { id: 'opt3-2', name: '| Option 3.2' },
    { id: 'opt3-3', name: '| Option 3.3' },
  ];

  // Event Handler für Auswahländerungen
  const handleMenu1Change = (event) => {
    setMenu1Selection(event.target.value);
  };

  const handleMenu2Change = (event) => {
    setMenu2Selection(event.target.value);
  };

  const handleMenu3Change = (event) => {
    setMenu3Selection(event.target.value);
  };

  return (
    // <header className="header">
    //   <div className="title">My DB</div>
    //   <div className="dropdowns">
    //     <select className='ddm' value={menu1Selection} onChange={handleMenu1Change}>
    //       <option value="">Games</option>
    //       {menuOptions1.map(option => (
    //         <option key={option.id} value={option.name}>{option.name}</option>
    //       ))}
    //     </select>
    //     <select className='ddm' value={menu2Selection} onChange={handleMenu2Change}>
    //       <option value="">Dropdown 2</option>
    //       {menuOptions2.map(option => (
    //         <option key={option.id} value={option.name}>{option.name}</option>
    //       ))}
    //     </select>
    //     <select className='ddm' value={menu3Selection} onChange={handleMenu3Change}>
    //       <option value="">Dropdown 3</option>
    //       {menuOptions3.map(option => (
    //         <option key={option.id} value={option.name}>{option.name}</option>
    //       ))}
    //     </select>
    //   </div>
    // </header>
    <header className="header-music">
      <p className="title">My DB</p>
      <div className='header-btn-div'></div>
      <br />
      <Link to="/games" className='header-btn-games'>Games</Link>
      <Link to="/music" className='header-btn-music'>Music</Link>
      <Link to="/login" className='header-btn-login'>Private</Link>
    </header>
  );
};

export default Header;