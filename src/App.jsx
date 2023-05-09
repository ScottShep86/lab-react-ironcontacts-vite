import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const [firstFive, setFirstFive] = useState(contacts.slice(5, 10));
  const imgStyle = {
    height: 100,
  };

  const randomContacts = () => {
    setFirstFive((contactsFromArray) => {
      const randomCeleb = Math.floor(Math.random() * contacts.length);
      return [contacts[randomCeleb], ...contactsFromArray];
    });
  };

  const sortByName = () => {
    const sortedArrayByName = firstFive.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (b.name < a.name) {
        return 1;
      } else {
        return 0;
      }
      /* {a.name < b.name ? -1 : 0}
          {b.name < a.name ? 1 : 0} */
      });
      
      setFirstFive([...sortedArrayByName]);
  };

  const sortByPopularity = () => {
    const sortedArrayByPopularity = firstFive.sort((a, b) => {
      if (a.popularity > b.popularity) {
        return -1;
      }
      if (b.popularity > a.popularity) {
        return 1;
      } else {
        return 0;
      }
      });
      setFirstFive([...sortedArrayByPopularity]);
  };

  const deleteContact = (currentContact) => {
    let filteredContacts = firstFive.filter((currentElement) => {
      return currentElement.id !== currentContact.id
    });
    setFirstFive(filteredContacts)
  };
  /* console.log(firstFive); */
  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={randomContacts}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {firstFive.map((element) => {
            return (
              <tr>
                <th>
                  <img
                    style={imgStyle}
                    src={element.pictureUrl}
                    alt={element.name}
                  />
                </th>
                <th>{element.name}</th>
                <th>{element.popularity.toFixed(2)}</th>
                <th>{element.wonOscar ? "🏆" : ""}</th>
                <th>{element.wonEmmy ? "🏆" : ""}</th>
                <button onClick={() => deleteContact(element)}>Delete</button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
