import { useState, useEffect }  from "react";
import './App.css';
import SummaryList from "./SummaryList";
import Profile from "./Profile.js";
 
function App() {

  const [ loading, setLoading ] = useState(true);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ users, setUsers ] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: []
  });
  const [ entryStatement, setEntryStatement ] = useState("1 to 1000");
  const [ currentProfile, setCurrentProfile ] = useState({
    display: false,
    currentPage: 1,
    userIndex: 0,
  })

  const paginationPlaceholder = [1,2,3,4,5,6,7];

  useEffect(() => {
    fetch(
      "https://polar-earth-69438.herokuapp.com/getuserdata/?results=1000&page=1&seed=abc&exc=gender,login,registered,id,nat",
      {
          method:"GET", 
          headers: {
          "Content-Type":"application/json" 
          }
      }
    )
    .then(res => res.json())
    .then(data => {
      setUsers({
        ...users,
        1: data.results
      });
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

 
  return (
    <div className="App">
      {
        (loading === false) ?
        <div className="w-100">
          {
            (currentProfile.display) ?
            <Profile user={users[currentPage][currentProfile.userIndex]} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} />
            :
            <SummaryList 
              users={users} 
              setUsers={setUsers} 
              paginationPlaceholder={paginationPlaceholder} 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
              entryStatement={entryStatement}
              setEntryStatement={setEntryStatement}
              currentProfile={currentProfile}
              setCurrentProfile={setCurrentProfile}
            />  
          }
        </div>
        :
        <div>Loading...
        </div>
      }
    </div>
  );

}

export default App;

// You asked for this app to be usable and fast, this API is not exactly friendly to being fast. Please allow me to explain my thought process and structuring of the application.
// All resources generated are random. 
// If you use a seed value you can generate a consistent list but ONLY if you put in the SAME results query EVERY request. (results=1000)
// Another issue is that you cannot query an individual profile by searching for an exact id  or email, the API is designed to just send out random values, no searching for an individual profile
// Again I know you can get a seed list but it will only be consistent if EVERY request contains the exact same query amount for results. I have examples below.
// This means when you grab your user results you MUST include all information, you have no way of just querying what is needed because you have no way of looking up just one specific user profile later
// For example, When I grab the 1000 user results for the summary list, I can't just specify to only include email, name, location, id 
// If it were possible to look up a specific profile then I could just query what is needed on the summary list and then later make a different request to just grab the rest of the profile info when it is needed... but you can't do that

//seed=abc, results=10, page=1
//index 0, name is louane vidal
//index 9, name is eili vivisto

//seed=abc, results=10, page=2
//index 0, name is gabreil molina, result is really 11 of 20
//index 9,name is nihal abanuz, result is really 20 of 20

//seed=abc, results=20, page=1
//index 0, name is louane vidal
//index 9, name is eili vivisto
//index 10, name is tindra klavenes-name is different(expecting gabriel molina) even though you would expect the same list for the same seed
//index 19, name is Phoebe Harvey-again name is different

//seed=abc, results=1, page=19
//Roger Watkins- even if you try to look up a specific profile by altering the pagination you cant, the 19th indexed result is roger, it was phoebe and nihal for the other times

//You CAN get consistent data like so
//seed=abc, results=1000, page=1
//seed=abc, results=1000, page=2
//seed=abc, results=1000, page=3
//... and so on
// you just have no way of looking up a specific user later, even if you try to come up with a hack like what I tried to do with roger watkins above


// How I chose to proceed...
// I chose to initially load 1000 results, each click of another page will gather another 1000 results to the state
// clicking a user will bring up their profile
// because you can not grab an individual profile via a request only one route is needed on the server


