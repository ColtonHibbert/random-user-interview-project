import PaginationButton from "./PaginationButton.js";
import SummaryEntry from "./SummaryEntry.js";

function SummaryList(props) {

    const {
        users,
        setUsers,
        paginationPlaceholder,
        currentPage,
        setCurrentPage, 
        entryStatement,
        setEntryStatement,
        setCurrentProfile
    } = props;

    return (
        <div className="summary">
            <h2>Users Summary List</h2>
            <div>Entries {entryStatement}</div>
            
            <div className="entries-container">
                {
                    users[currentPage].map((user,i) => {
                        return (
                            
                            <SummaryEntry user={user} key={user.email} userIndex={i} currentPage={currentPage} setCurrentProfile={setCurrentProfile}/>
                        )
                    })
                }
            </div>
            <div className="flex-row">
                {
                    paginationPlaceholder.map(index => {
                        return(
                            <PaginationButton key={index} index={index} setCurrentPage={setCurrentPage} users={users} setUsers={setUsers} setEntryStatement={setEntryStatement}/>
                        )
                    })
                }
            </div>
           
        </div>
    );
}

export default SummaryList;