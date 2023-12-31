const genres = [
  "Action",
  "Adventure",
  "Cars",
  "Comedy",
  "Crime",
  "Dementia",
  "Demons",
  "Drama",
  "Dub",
  "Ecchi",
  "Family",
  "Fantasy",
  "Game",
  "Gourmet",
  "Harem",
  "Hentai",
  "Historical",
  "Horror",
  "Josei",
  "Kids",
  "Magic",
  "Martial-arts",
  "Mecha",
  "Military",
  "Music",
  "Mystery",
  "Parody",
  "Police",
  "Psychological",
  "Romance",
  "Samurai",
  "School",
  "Sci-fi",
  "Seinen",
  "Shoujo",
  "Shoujo-ai",
  "Shounen",
  "Shounen-ai",
  "Slice-of-Life",
  "Space",
  "Sports",
  "Super-power",
  "Supernatural",
  "Suspense",
  "Thriller",
  "Vampire",
  "Yaoi",
  "Yuri",
  "Isekai"
]

let currentYear = new Date().getFullYear()
const years = [],endYear = 1940
while(currentYear >= endYear){
  years.push(currentYear--)
}

const season = [
  "SPRING",
  "SUMMER",
  "FALL",
  "WINTER"
]

const country = [
  "JP",
  "CN"
]

const format = [
  "TV",
  "TV_SHORT",
  "MOVIE",
  "OVA",
  "ONA",
  "SPECIAL",
  "MUSIC"
]

const status = [
  "FINISHED",
  "RELEASING",
  "NOT_YET_RELEASED"
]

const sort = [
  "TITLE_ROMAJI",
  "END_DATE_DESC",
  "SCORE_DESC",
  "TRENDING_DESC",
  "EPISODES_DESC",
  "UPDATED_AT_DESC",
  "FAVOURITES_DESC"
]

export {genres,years,season,country,format,status,sort}