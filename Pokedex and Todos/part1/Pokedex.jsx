class Pokedex extends React.Component {
  static defaultProps = {
    pokemon: [
      {
        id: 1,
        name: 'Charmander',
        type: 'fire',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
      },
      {
        id: 2,
        name: 'Squirtle',
        type: 'water',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
      },
      {
        id: 3,
        name: 'Butterfree',
        type: 'flying',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png'
      },
      {
        id: 4,
        name: 'Rattata',
        type: 'normal',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png'
      },
      {
        id: 5,
        name: 'Metapod',
        type: 'bug',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png'
      }
    ]
  };

  render() {
    return (
      <div className="pokedex">
        <h1>Pokedex</h1>
        <ul className="cards">
          {this.props.pokemon.map(p => (
            <li key={p.id} className="list">
              <Pokecard name={p.name} image={p.image} type={p.type} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Pokedex />
  </div>,
  document.getElementById('root')
);
