import React from 'react';

//! ORIGIN
const Header = () => {
  // State für die Auswahl der Dropdown-Menüs
  const [menu1Selection, setMenu1Selection] = React.useState('');
  const [menu2Selection, setMenu2Selection] = React.useState('');
  const [menu3Selection, setMenu3Selection] = React.useState('');

  // Optionen für jedes Dropdown-Menü mit individuellen Namen
  const menuOptions1 = [
    { id: 'opt1-1', name: 'Option 1.1' },
    { id: 'opt1-2', name: 'Option 1.2' },
    { id: 'opt1-3', name: 'Option 1.3' },
  ];

  const menuOptions2 = [
    { id: 'opt2-1', name: 'Option 2.1' },
    { id: 'opt2-2', name: 'Option 2.2' },
    { id: 'opt2-3', name: 'Option 2.3' },
  ];

  const menuOptions3 = [
    { id: 'opt3-1', name: 'Option 3.1' },
    { id: 'opt3-2', name: 'Option 3.2' },
    { id: 'opt3-3', name: 'Option 3.3' },
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
    <header className="header">
      <div className="title">My GameDB</div>
      <div className="dropdowns">
        {/* Dropdown-Menü 1 */}
        <select className='ddm' value={menu1Selection} onChange={handleMenu1Change}>
          <option value="">Dropdown 1</option>
          {menuOptions1.map(option => (
            <option key={option.id} value={option.name}>{option.name}</option>
          ))}
        </select>
        
        {/* Dropdown-Menü 2 */}
        <select className='ddm' value={menu2Selection} onChange={handleMenu2Change}>
          <option value="">Dropdown 2</option>
          {menuOptions2.map(option => (
            <option key={option.id} value={option.name}>{option.name}</option>
          ))}
        </select>
        
        {/* Dropdown-Menü 3 */}
        <select className='ddm' value={menu3Selection} onChange={handleMenu3Change}>
          <option value="">Dropdown 3</option>
          {menuOptions3.map(option => (
            <option key={option.id} value={option.name}>{option.name}</option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;