
function PaginationButton(props) {
    const {
        index,
        setCurrentPage,
        users,
        setUsers,
        setEntryStatement
    } = props;

    function createNewStatement(index) {
        if(index === 1) {
            return "1 to 1000";
        }
        if(index === 2) {
            return "1001 to 2000";
        }
        if(index === 3) {
            return "2001 to 3000";
        }
        if(index === 4) {
            return "3001 to 4000";
        }
        if(index === 5) {
            return "4001 to 5000";
        }
        if(index === 6) {
            return "5001 to 6000";
        }
        if(index === 7) {
            return "6001 to 7000";
        }
    }

    function handleClick() {
        if(users[index][0] !== undefined) {
            setCurrentPage(index);
            setEntryStatement(createNewStatement(index))
        } else {
            fetch(
            `https://polar-earth-69438.herokuapp.com/getuserdata/?results=1000&page=${index}&seed=abc&exc=gender,login,registered,id,nat`,
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
                    [index]: data.results
                });
                setCurrentPage(index);
                setEntryStatement(createNewStatement(index))
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    return(
        <div className="pagination-button" onClick={() => handleClick()}>
            {index}
        </div>
    )
}

export default PaginationButton;