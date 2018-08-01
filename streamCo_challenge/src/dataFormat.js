import data from './sample.json';

export default function dataFormat(programType = null) {
  let movies = [];

  data.entries.forEach(s => {
    if (
      s.programType === programType &&
      s.releaseYear >= 2010 &&
      movies.length < 21
    ) {
      movies.push(s);
    }
  });
  movies.sort((a, b) => a.title.localeCompare(b.title));
  return movies;
}
