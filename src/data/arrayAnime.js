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
  {
    seasonAnime:"Winter",
    code:"WINTER"
  },
  {
    seasonAnime:"Spring",
    code:"SPRING"
  },
  {
    seasonAnime:"Summer",
    code:"SUMMER"
  },
   {
    seasonAnime:"Fall",
    code:"FALL"
  },
]

const country = [
  {
    region: "Japan",
    code: "JP"
  },
  {
    region: "China",
    code: "CN"
  },
  {
    region: "South Korea",
    code: "KR"
  },
   {
    region: "Taiwan",
    code: "TW"
  },
]

const format = [
  {
    type: "TV SHOW",
    code: "TV"
  },
  {
    type: "TV SHORT",
    code: "TV_SHORT"
  },
  {
    type: "Movie",
    code: "MOVIE"
  },
  {
    type: "OVA",
    code: "OVA"
  },
  {
    type: "ONA",
    code: "ONA"
  },
  {
    type: "Special",
    code: "SPECIAL"
  },
  {
    type: "Music",
    code: "MUSIC"
  },
]

const status = [
  {
    statusAnime: "Airing",
    code: "RELEASING"
  },
  {
    statusAnime: "Finished",
    code: "FINISHED"
  },
  {
    statusAnime: "Not Yet Aired",
    code: "NOT_YET_RELEASED"
  },
  {
    statusAnime: "Cancelled",
    code: "CANCELLED"
  },
]

const sort = [
  {
    sortAnime: "Title",
    code: "TITLE_ROMAJI"
  },
  {
    sortAnime: "Date Added", 
    code: "ID_DESC",
  },
  {
    sortAnime: "Popularity",
    code: "POPULARITY_DESC"
  },
  {
    sortAnime: "Average Score",
    code: "SCORE_DESC",
  },
  {
    sortAnime: "Trending",
    code: "TRENDING_DESC",
  },
  {
    sortAnime: "Most Episodes",
    code: "EPISODES_DESC",
  },
  {
    sortAnime: "Favorites",
    code: "FAVOURITES_DESC"
  },
  {
    sortAnime: "Release Date",
    code: "START_DATE_DESC"
  }
]

export {genres,years,season,country,format,status,sort}