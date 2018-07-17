class Pokecard extends React.Component {
  render() {
    const { name, image, type } = this.props;

    return (
      <div className="card">
        <h1>{name}</h1>
        <img src={image} alt="card" width="150" />
        <h3>Type: {type}</h3>
      </div>
    );
  }
}
